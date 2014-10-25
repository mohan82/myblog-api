/**
 * Created by mohan on 25/10/14.
 */
"use strict"
var chai = require("chai"),
  expect = chai.expect,
  should = chai.should;
var BlogParser = require('../blogparser.js');
var blogParser = new BlogParser("test.xml");

describe("Test for Blog Parser",function(){
    it("Test parseBlog Function ",function(){

        expect(blogParser.parseBlog()).to.contain("Yet to parse");
    });
});