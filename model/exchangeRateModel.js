var ExchangeRate = function(){

    var fs = require('fs');
    var request = require('request');

    var oexApiKey = 'c83f371ec0444e41a5ef5998a9408eba';
    var oexApiEndpoint = 'http://openexchangerates.org/api/';
    var oexLatestRatesURL = oexApiEndpoint+'latest.json?app_id='+oexApiKey;
    var exchangeRateStatus = false;
    var self = this;

    this.defaultCurrencyCode = "USD";
    this.defaultCurrencySymbol = "$";

    var payPal = require('./paypalModel').PayPal;

    this.isExistExchangeRate = function(callback){
        fs.stat(this.getExchangeRateFilePath(), function(error, stat) {
            if(error == null) {
                exchangeRateStatus = true;
                console.log('File exists ... ');
            } else {
                exchangeRateStatus = false;
                console.log('Some other error: ', error.code);
            }
            callback(exchangeRateStatus);
        });
    };

    this.getExchangeRateFileName = function(){
        return self.getDate();
    };

    this.getDate = function(){
        return new Date().toISOString().split("T")[0];
    };

    this.getExchangeRateFilePath = function(){
        return __dirname+'/../resources/exchange-rates/'+this.getExchangeRateFileName();
    };

    this.getExchangeRates = function(callback){

        var filePath = this.getExchangeRateFilePath();

        //can implement caching if necessary. For storing the rates.
        this.isExistExchangeRate(function(exchangeRateStatus){
            if(exchangeRateStatus){
                console.log("Exchange rate exist >>> ");
                self.readExchangeRates(function(error, rates){
                    callback(error, rates);
                });
            }else{
                self.readOpenExchangeLatestRates(self.defaultCurrencyCode, function (error, exchangeRates){
                    if(error){
                        console.log("Exchange rate error");
                        callback(error, null);
                    }else{
                        self.saveOpenExchangeRates(filePath, exchangeRates, function(error){
                            //callback(null, exchangeRates);
                            if(!error) {
                                self.readExchangeRates(function (error, rates) {
                                    callback(error, rates);
                                });
                            }
                        });
                    }
                });
            }
        });

    };

    this.readExchangeRates = function(callback){
        fs.readFile(self.getExchangeRateFilePath(), "utf8", function (error, data) {
            if(error){
                callback(error, null);
            }else{
                var rates = {};
                //console.log(data);
                var lines = data.split(/\r\n/);

                for(var i=0; i<lines.length; i++){
                    if(lines[i] && lines[i].length > 0){
                        var parts = lines[i].split("=");
                        //console.log(parts);

                        //var symbol = (parts[1] && parts[1].split(" ")[0])?parts[1].split(" ")[0]:"";
                        var symbol = parts[1].substr(0, parts[1].lastIndexOf(" "));
                        var rate = parseFloat(parts[1].substr(parts[1].lastIndexOf(" ")+1, parts[1].length));
                        //var rate = parseFloat(parts[1].split(" ")[1]);
                        rates[parts[0]] = {
                            symbol: symbol,
                            rate: rate
                        };
                    }
                }
                callback(null, rates);
            }

        });
    };

    this.readOpenExchangeData = function(url, callback){

        request.get(url, function(error, response, body) {
            if (error){
                console.log("Error ::: ",error);
                callback(error, null);
            }else{
                console.log("Open exchange file read successfully : ", response.statusCode);
                var data = JSON.parse(body);
                if(data.error){
                    callback(data, null);
                }else{
                    callback(error, data);
                }
            }
        });

    };

    this.readOpenExchangeLatestRates = function(baseCurrencyCode, callback) {

        if(!baseCurrencyCode) baseCurrencyCode = self.defaultCurrencyCode;
        oexLatestRatesURL += '&base='+baseCurrencyCode;

        self.readOpenExchangeData(oexLatestRatesURL, function(error, data){
            if(error){
                console.log("error returning openexchange rates .... ");
                callback(error, data);
            }else{
                console.log("before returning rates .... ");
                callback(error, data.rates);
            }
        });
    };

    this.saveOpenExchangeRates = function(filePath, exchangeRates, callback){

        //var data = JSON.stringify(exchangeRates, null, 4);

        self.formatOpenExchangeRates(exchangeRates, function(error, data){
            if(error){
                console.log("Formatted data not found");
            }else{
                fs.writeFile(filePath, data, 'utf8', function(error) {
                    if(error) {
                        callback(error);
                        console.log("Error saving file. =========== ");
                    }else{
                        callback(null);
                        console.log("The file was saved! =========== ");
                    }
                });
            }
        });

    };

    this.formatOpenExchangeRates = function(exchangeRates, callback){
        var docString = "";

        self.getCurrencySymbolList(function(error, currencySymbols){
            if(error){
                console.log("Error on getting currency symbols");
                callback(error, null);
            }else{
                console.log("formatted currency sysmbols ");
                var symbol = "";
                for(var code in exchangeRates){
                    symbol = (currencySymbols && currencySymbols[code]) ? currencySymbols[code]: "" ;
                    docString += code + "="+symbol+" "+parseFloat(exchangeRates[code]).toFixed(2)+"\r\n";
                }
                callback(error, docString);
            }

        });
    };

    this.getCurrencySymbolFilePath = function(){
        return __dirname+'/../resources/currencySymbols.json';
    };

    this.getCurrencySymbolList = function(callback){

        fs.readFile(self.getCurrencySymbolFilePath(), "utf8", function (error, data) {
            if(error){
                console.error("Problem reading currency symbol ..... ");
                callback(error, {});
            }else{
                callback(error, JSON.parse(data));
            }
        });
    };

    this.getExchangeRatesAndSupportedCurrencies = function(callback){
        self.getExchangeRates(function(error, rates){
            if(!error){
                payPal.getSupportedCurrencies(function(currencyCodes) {
                    callback(rates, currencyCodes);
                });
            }else{
                callback([], []);
            }
        });
    };

};

exports.ExchangeRate = new ExchangeRate();