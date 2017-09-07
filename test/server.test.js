"use strict";
const request = require('supertest');
const app = require('../server/app')

/* test root path */
describe('Test the root path', function() {
    test('It should response the GET method', function() {
        return request(app).get("/").then(function(response) {
            expect(response.statusCode).toBe(200);
        })
    });
});

/** test no end point found */
describe('Test no end point found', function() {
    test('It return page not found in response', function() {
        return request(app).get("/sdffdf").then(function(response) {
            expect(response.text).toBe("<h1>404 - Page not found</h1>");
        })
    });
});

/*
var template = {
	"email":"julienbongars23@gmail.com",
	"password":"aslkdfjlaskdjfljd204832JLKSJFKL@#)$)(",
	"confirmPassword":"aslkdfjlaskdjfljd204832JLKSJFKL@#)$)(",
	"fullname":"Julien Bongars",
	"gender":"M",
	"dateofbirth":"1990-09-20T16:00:00.000Z",
	"address":"754 Yishun Street 72, #12-500",
	"country":"1",
	"contactnumber": "423452352354"
}
*/
