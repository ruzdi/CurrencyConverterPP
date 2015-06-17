var express = require('express');
var router = express.Router();

var payPal = require('../model/paypalModel').PayPal;
var exchangeRate = require('../model/exchangeRateModel').ExchangeRate;

/* GET activity page. */
router.get('/activity', function(req, res, next) {
    console.info("executing activity page..... ");
    payPal.activity(function(error, transactions){
        console.log("inside activity callback");
        payPal.getSupportedCurrencies(function(currencyCodes){
            res.render('paypal/activity', {
                title: 'Activity - Currency Conversion',
                pageHeader: "Transaction History",
                transactions: transactions,
                defaultCurrencyCode: exchangeRate.defaultCurrencyCode,
                defaultCurrencySymbol: exchangeRate.defaultCurrencySymbol,
                currencyCodes: currencyCodes
            });
        });
    });

});

/* GET currency conversion page. */
router.get('/currencyConversion', function(req, res, next) {
    console.info("executing currencyConversion page..... ");
    payPal.getSupportedCurrencies(function(currencyCodes){
        res.render('paypal/currencyConversion', {
            title: 'Currency Conversion',
            pageHeader: "Currency Conversion",
            currencyCodes: currencyCodes
        });
    });
});

/* POST currency conversion page. */
router.post('/currencyConversion', function(req, res, next) {
    console.info("executing currencyConversion page..... ");
    console.log("post data :: ", req.body);

    exchangeRate.getExchangeRatesAndSupportedCurrencies(function(rates, currencyCodes){

        var formData = {
            title: 'Currency Conversion',
            pageHeader: "Currency Conversion",
            currencyCodes: currencyCodes,
            data: {
                amount: req.body.amount,
                currencyCode: req.body.currencyCode,
                targetCurrencyCode: req.body.targetCurrencyCode
            },
            result: {},
            error: null
        };

        try {

            var targetAmount = payPal.currencyConversion(rates[req.body.currencyCode].rate, rates[req.body.targetCurrencyCode].rate, parseFloat(req.body.amount));

            formData.result = {
                fromCurrency: {
                    amount: parseFloat(req.body.amount).toFixed(2),
                    code: req.body.currencyCode,
                    symbol: rates[req.body.currencyCode].symbol
                },
                targetCurrency: {
                    amount: targetAmount,
                    code: req.body.targetCurrencyCode,
                    symbol: rates[req.body.targetCurrencyCode].symbol
                }
            }
        }catch(e){
            console.error("Error : "+e);
            formData.error = "Sorry! We know there is a problem. We will fix it soon.";
        }

        //console.log("Rendered data ::: ", formData);
        res.render('paypal/currencyConversion', formData);

    });

});

/* GET conversion rate page. */
router.get('/conversionRate', function(req, res, next) {
    console.info("executing conversionRate page..... ");
    payPal.getSupportedCurrencies(function(currencyCodes){
        res.render('paypal/conversionRate', {
            title: "Conversion Rate",
            pageHeader: "Conversion Rate",
            currencyCodes: currencyCodes
        });
    });
});

/* POST conversion rate page. */
router.post('/conversionRate', function(req, res, next) {
    console.info("executing conversionRate page..... ");
    console.log("post data :: ", req.body);

    exchangeRate.getExchangeRatesAndSupportedCurrencies(function(rates, currencyCodes){
        var formData = {
            title: "Conversion Rate",
            pageHeader: "Conversion Rate",
            currencyCodes: currencyCodes,
            data: {
                currencyCode: req.body.currencyCode,
                targetCurrencyCode: req.body.targetCurrencyCode
            },
            result: {},
            error: null
        };

        try{

            var targetAmount = payPal.conversionRate(rates[req.body.currencyCode].rate, rates[req.body.targetCurrencyCode].rate);

            formData.result = {
                fromCurrency: {
                    amount: 1,
                    code: req.body.currencyCode,
                    symbol: rates[req.body.currencyCode].symbol
                },
                targetCurrency: {
                    amount: targetAmount,
                    code: req.body.targetCurrencyCode,
                    symbol: rates[req.body.targetCurrencyCode].symbol
                }
            };

        }catch(e){
            console.error("Error : "+e);
            formData.error = "Sorry! We know there is a problem. We will fix it soon.";
        }

        //console.log("Rendered data ::: ", formData);
        res.render('paypal/conversionRate', formData);
    });

});

module.exports = router;
