var PayPal = function(){

    var fs = require('fs');


    var self = this;
    this.activity = function(callback){
        fs.readFile(self.getResourceFilePath("activities.json"), "utf8", function (error, data) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, JSON.parse(data));
            }
        });
    };

    this.getSupportedCurrencies = function(callback){
        fs.readFile(self.getResourceFilePath("supportedCurrencies.json"), "utf8", function (error, data) {
            if (error) {
                console.log("Error getting supported currencies!!! ");
                callback([]);
            } else {
                console.log("Supported currencies file fetch successfully... ");
                callback(JSON.parse(data));
            }
        });
    };

    this.getResourceFilePath = function(fileName){
        return __dirname+"/../resources/"+fileName;
    };

    this.currencyConversion = function(fromCurrencyRate, toCurrencyRate, amount){
        if(fromCurrencyRate == 0 || toCurrencyRate == 0 ){
            throw new Error("Conversion rates can not be 0.");
        }
        return parseFloat(toCurrencyRate*amount/fromCurrencyRate).toFixed(2);
    };

    this.conversionRate = function(fromCurrencyRate, toCurrencyRate){
        if(fromCurrencyRate == 0 || toCurrencyRate == 0 ){
            throw new Error("Conversion rates can not be 0.");
        }
        return parseFloat(toCurrencyRate/fromCurrencyRate).toFixed(2);
    };

};

exports.PayPal = new PayPal();