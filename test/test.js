let mongoose = require("mongoose");
let projectModel = require("../model/requestModel");
let chai = require("chai");
let should = chai.should();
let chaiHttp = require("chai-http");
let server = require("../index");
chai.use(chaiHttp);

//testing post
describe("Testing POST request", () => {
    it("should return average, standardDeviation", (done) => {
        chai.request("http://localhost:3001")
            .post("/statisticalCalculation")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                list: [2, 3, 4, 5, 6, 7, 8, 9, 10]
            })
            .end(function(err, res) {

                console.log('====================================');
                console.log(res.body);
                console.log('====================================');

                if (err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.have.property("average");
                    //res.body.should.have.property("median");
                    res.body.should.have.property("standardDeviation");
                    done();
                }
            });
    });
    it("should return average, standardDeviation", (done) => {
        console.log("Testing POST request 2");
        chai.request("http://localhost:3001")
            .post("/statisticalCalculation")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                list: [15, 15, 15, 15, 15, 15, 15, 15, 15]
            })
            .end(function(err, res) {

                console.log('====================================');
                console.log(res.body);
                console.log('====================================');

                if (err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.have.property("average");
                    //res.body.should.have.property("median");
                    res.body.should.have.property("standardDeviation");
                    done();
                }

            });
    });
    it("should return average, standardDeviation", (done) => {
        console.log("Testing POST request 3");

        chai.request("http://localhost:3001")
            .post("/statisticalCalculation")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                list: [0, 0, 0, -15, -15, 1, 2, 30148643251, 14]
            })
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    console.log('====================================');
                    console.log(res.body);
                    console.log('====================================');
                    res.should.have.status(200);
                    res.body.should.have.property("average");
                    //res.body.should.have.property("median");
                    res.body.should.have.property("standardDeviation");
                    done();
                }
            });
    });
});