var exchangeRate = require('../../model/exchangeRateModel').ExchangeRate;

describe('Testing ExchangeRateModel.', function(){

    describe("Checking isExistExchangeRate.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.isExistExchangeRate).toBeDefined();
        });
        it("Method should return boolean value", function(done) {
            exchangeRate.isExistExchangeRate(function(value){
                expect(typeof  value == 'boolean').toBeTruthy();
                expect(typeof  value == 'boolean').not.toBeFalsy();
                done();
            });
        });
    });

    describe("Checking getExchangeRateFileName.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getExchangeRateFileName).toBeDefined();
        });
        it("Method should return proper file name", function() {
            expect(exchangeRate.getExchangeRateFileName()).not.toBeUndefined();
            expect(exchangeRate.getExchangeRateFileName()).not.toBeNull();
        });
    });

    describe("Checking getDate.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getDate).toBeDefined();
        });
        it("Method should return date string in Y-m-d format", function() {
            expect(exchangeRate.getDate()).not.toBeUndefined();
            expect(exchangeRate.getDate()).not.toBeNull();
            expect(exchangeRate.getDate()).toBe(new Date().toISOString().split("T")[0]);
        });
    });

    describe("Checking getExchangeRateFilePath.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getExchangeRateFilePath).toBeDefined();
        });
        it("Method should return correct path", function() {
            expect(exchangeRate.getExchangeRateFilePath()).toBeDefined();
            expect(exchangeRate.getExchangeRateFilePath()).not.toBeNull();
            expect(exchangeRate.getExchangeRateFilePath().substr(-10)).toEqual(new Date().toISOString().split("T")[0]);
        });
    });

    describe("Checking getExchangeRates.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getExchangeRates).toBeDefined();
        });
        it("Method should return correct value", function(done) {
            exchangeRate.getExchangeRates(function(error, data){
                expect(error).toBe(null);
                expect(typeof data == 'object').toBeTruthy();
                expect(data).not.toBeNull();
            });
            done();
        });
    });


    describe("Checking readExchangeRates.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.readExchangeRates).toBeDefined();
        });
        it("Method should return correct value", function(done) {
            exchangeRate.readExchangeRates(function(error, data){
                expect(error).toBe(null);
                expect(typeof data == 'object').toBeTruthy();
                expect(data).not.toBeNull();
                done();
            });
        });
    });

    describe("Checking readOpenExchangeData.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.readOpenExchangeData).toBeDefined();
        });
    });

    describe("Checking readOpenExchangeLatestRates.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.readOpenExchangeLatestRates).toBeDefined();
        });
    });

    describe("Checking saveOpenExchangeRates.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.saveOpenExchangeRates).toBeDefined();
        });
        it("Method should create file with no error", function(done) {
            var fileData = "AUD=$ 0.98";
            var filePath = __dirname+"/../resources/test"+(new Date().getMilliseconds().toString());
            exchangeRate.saveOpenExchangeRates(filePath, fileData, function(error, data){
                expect(error).toBe(null);
                done();
            });
        });

    });

    describe("Checking formatOpenExchangeRates.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.formatOpenExchangeRates).toBeDefined();
        });
    });

    describe("Checking getCurrencySymbolFilePath.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getCurrencySymbolFilePath).toBeDefined();
        });
        it("Method should return correct path", function() {
            expect(exchangeRate.getCurrencySymbolFilePath()).toBeDefined();
            expect(exchangeRate.getCurrencySymbolFilePath()).not.toBeNull();
            expect(exchangeRate.getCurrencySymbolFilePath().substr(-20)).toEqual("currencySymbols.json");
        });
    });

    describe("Checking getExchangeRatesAndSupportedCurrencies.", function() {
        it("Method should be define", function() {
            expect(exchangeRate.getExchangeRatesAndSupportedCurrencies).toBeDefined();
        });
        it("Method should return correct value", function(done) {
            exchangeRate.getExchangeRatesAndSupportedCurrencies(function(rates, currencyCodes){
                expect(rates).toBeDefined();
                expect(typeof rates == 'object').toBeTruthy();
                expect(rates).not.toBeNull();

                expect(currencyCodes).toBeDefined();
                expect(typeof currencyCodes == 'object').toBeTruthy();
                expect(currencyCodes.length).not.toBeNull();

                done();
            });


        });
    });

});



