var payPal = require('../../model/paypalModel').PayPal;


describe('Testing PayPal Model.', function(){

    describe("Checking conversion rate.", function() {
        it("Method should be define", function() {
            expect(payPal.conversionRate).toBeDefined();
        });
        it("Method should return correct result", function() {
            expect(payPal.conversionRate(1, 1)).toEqual(parseFloat(1).toFixed(2));
            expect(payPal.conversionRate(2, 2)).toEqual(parseFloat(1).toFixed(2));
            expect(payPal.conversionRate(4, 2)).toEqual(parseFloat(0.5).toFixed(2));
            expect(payPal.conversionRate(4, 200)).toEqual(parseFloat(50).toFixed(2));
        });
    });

    describe("Checking currency conversion.", function() {
        it("Method should be define", function() {
            expect(payPal.currencyConversion).toBeDefined();
        });
        it("Method should return correct result", function() {
            expect(payPal.currencyConversion(1, 1, 100)).toEqual(parseFloat(100).toFixed(2));
            expect(payPal.currencyConversion(1, 2, 50)).toEqual(parseFloat(100).toFixed(2));
            expect(payPal.currencyConversion(4, 2, 20)).toEqual(parseFloat(10).toFixed(2));
            expect(payPal.currencyConversion(4, 200, 500)).toEqual(parseFloat(25000).toFixed(2));

        });
    });

    describe("Checking getSupportedCurrencies.", function() {
        it("Method should be define", function() {
            expect(payPal.getSupportedCurrencies).toBeDefined();
        });
        it("Method should return supported currencies", function(done) {
            payPal.getSupportedCurrencies(function(data){
                expect(typeof data == 'object').toBeTruthy();
                done();
            });

        });
    });

    describe("Checking activity.", function() {
        it("Method should be define", function() {
            expect(payPal.activity).toBeDefined();
        });
        it("Method should return transaction list", function(done) {
            payPal.activity(function(data){
                expect(typeof data == 'object').toBeTruthy();
                done();
            });
        });
    });



});



