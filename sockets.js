var payPal = require('./model/paypalModel').PayPal;
var exchangeRate = require('./model/exchangeRateModel').ExchangeRate;


module.exports = function(io) {

    console.log("on socket class");
    io.sockets.on('connection', function (socket) {
        console.log("socket.io .... ");
        socket.on('getConvertedCurrency', function(payload) {
            console.log("on getConvertedCurrency :: ", payload);
            exchangeRate.getExchangeRatesAndSupportedCurrencies(function(rates, currencyCodes){
                var convertedData = {};
                try {
                    convertedData.amount = payPal.currencyConversion(rates[payload.currencyCode].rate, rates[payload.targetCurrencyCode].rate, parseFloat(payload.amount).toFixed(2));
                    convertedData.symbol = rates[payload.targetCurrencyCode].symbol;
                }catch(e){
                    console.error("Error : "+e);
                    convertedData.error = true;
                    convertedData.errorMessage = "Unavailable";
                }
                socket.emit('setConvertedCurrency', convertedData);
            });

        });
    });
};