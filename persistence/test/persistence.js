"use strict";

var Blog= require('../persistence').Blog;
var chai = require("chai");
var common = require("common");

var expect = chai.expect;

describe("Test Persitence Module", function () {

   var blogObj = new Blog(common.config.DbConfig.test());
    before("Before Test",function(){

    });

    after("Clean up Test",function(){
       blogObj.cleanUp();
    });

    it("expect persistence to have Blog Module",function(){

        expect(blogObj).to.have.property("knex");
    });


});


























