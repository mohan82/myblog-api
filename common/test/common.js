"use strict";

var common = require("../common");

var chai = require("chai");
var expect = chai.expect,
    should = chai.should();

describe("Test for Common Util Functions", function () {

    it("Given blank string isStringEmpty should return true", function () {
        common.Util.isStringEmpty(' ').should.be.true;
    });

    it("Given not blanks string isStringEmpty should return false", function () {
        common.Util.isStringEmpty('hello world').should.be.false;
    });


    it("Given empty string isStringEmpty should return true", function () {
        common.Util.isStringEmpty('').should.be.true;
    });
    it("Given null isStringEmpty should return true", function () {
        common.Util.isStringEmpty(null).should.be.true;
    });
    it("Given undefined isStringEmpty should return true", function () {
        common.Util.isStringEmpty().should.be.true;
    });
    it("Given number isStringEmpty should return true", function () {
        common.Util.isStringEmpty(1).should.be.true;
    });


});
