/**
 * Created by mohan on 25/10/14.
 */
"use strict"
var BlogService = require("../blogservice.js");
var chai = require("chai"),
    expect = chai.expect,
    should = chai.should;

var  blogObj = new BlogService();

describe("Test Blog Service",function(){
    beforeEach(function(){


    });
    it("should test blog service getComemnts",function(){
       expect(blogObj.getComments()).to.contain("test");
    });
});