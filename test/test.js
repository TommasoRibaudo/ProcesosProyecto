let mongoose = require("mongoose");
let projectModel = require("../model/requestModel");
let chai = require("chai");
let should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../index");
chai.use(chaiHttp);

//testing post
describe("Testing POST request", function() {
    it("should return average, median, standardDeviation", function() {
        try {
            console.log("Testing POST request 1");
            chai.request("http://localhost:3001/")
                .post("/statisticalCalculation")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    list: [2, 3, 4, 5, 6, 7, 8, 9, 10]
                })
                .end(function(err, res) {

                    console.log("error: " + err)
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property("average");
                    res.body.should.have.property("median");
                    res.body.should.have.property("standardDeviation");

                });
        } catch (e) {
            console.log(e);
        }
    });
    it("should return average, median, standardDeviation", function() {
        console.log("Testing POST request 2");
        chai.request("http://localhost:3001/")
            .post("/statisticalCalculation")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                list: [15, 15, 15, 15, 15, 15, 15, 15, 15]
            })
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property("average");
                res.body.should.have.property("median");
                res.body.should.have.property("standardDeviation");

            });
    });
    it("should return average, median, standardDeviation", function() {
        console.log("Testing POST request 3");

        chai.request("http://localhost:3001/")
            .post("/statisticalCalculation")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                list: [0, 0, 0, -15, -15, 1, 2, 30148643251, 14]
            })
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property("average");
                res.body.should.have.property("median");
                res.body.should.have.property("standardDeviation");
            });
    });
});