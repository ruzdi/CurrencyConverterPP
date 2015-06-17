var request = require("request");
var configGlobal = require('../config/global');
var serverConfig = new configGlobal.ServerConfig();
var serverAddress = serverConfig.getServerAddress();

describe('Testing Application Routing', function(){

    describe("Home page", function() {
        describe("GET /", function(done) {
            it("should returns status code 200", function(done) {
                request.get(serverAddress, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });


    describe("Activity Page", function() {
        describe("GET /paypal/activity", function() {
            it("should returns status code 200", function(done) {
                request.get(serverAddress+'paypal/conversionRate', function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });


    describe("Currency Conversion", function() {
        describe("GET /paypal/currencyConversion", function() {
            it("should returns status code 200", function(done) {
                request.get(serverAddress+'paypal/conversionRate', function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });

    describe("Conversion Rate", function() {
        describe("GET /paypal/conversionRate", function() {
            it("should returns status code 200", function(done) {
                request.get(serverAddress+'paypal/conversionRate', function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });

});


