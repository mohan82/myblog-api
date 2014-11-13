/**
 * Created by mohan on 25/10/14.
 */
"use strict"

var fs = require("fs");
var path = require("path");

//Chai Libraries
var chaiAsPromised = require("chai-as-promised");
var chai = require("chai");
chai.use(chaiAsPromised);
var expect = chai.expect,
    should = chai.should();


var blogParser = require('../blogparser.js');
var TEST_FILE_PATH = path.resolve('common/test_data/blog.xml');


describe("Test for Blog Parser", function () {
    var testContent;


    before("Read File", function (done) {
        fs.readFile(TEST_FILE_PATH, 'utf-8', function (error, data) {
            testContent = data;
            done(error);
        });
    });

    beforeEach("Initialising BlogParser", function () {


    });

    it("Given blank string isStringEmpty should return true", function () {
        blogParser.isStringEmpty(' ').should.be.true;
    });

    it("Given not blanks string isStringEmpty should return false", function () {
        blogParser.isStringEmpty('hello world').should.be.false;
    });


    it("Given empty string isStringEmpty should return true", function () {
        blogParser.isStringEmpty('').should.be.true;
    });
    it("Given null isStringEmpty should return true", function () {
        blogParser.isStringEmpty(null).should.be.true;
    });
    it("Given undefined isStringEmpty should return true", function () {
        blogParser.isStringEmpty().should.be.true;
    });
    it("Given number isStringEmpty should return true", function () {
        blogParser.isStringEmpty(1).should.be.true;
    });


    it("given blog.xml parseBlogContent should return blog data with title Mohan", function () {
        return blogParser.parseBlogContent(testContent)
            .should.eventually.have.deep.property('rss.channel[0].title')
            .that.is.an('array')
            .with.deep.property('[0]')
            .that.is.to.contain('Mohan');


    });

    it("given invalid xml  parseBlogContent should throw error", function () {
        return blogParser.parseBlogContent('ew').should.eventually.be.rejectedWith(blogParser.ParseError);
    });

    it("given empty xml parseBlogContent should throw parse error", function () {
       expect(blogParser.parseBlogContent.bind(blogParser,'')).to.throw(blogParser.ParseError);

    });

    it('given blog.xml getPosts should return the correct number of post', function () {
        return expect(blogParser.parseBlogContent(testContent).then(blogParser.getPosts.bind(blogParser))).
            to.eventually.have.property('length', 10);

    });


});