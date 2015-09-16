/**
 * Created by mohan on 25/10/14.
 */
"use strict";

var fs = require("fs");
var Promise = require("bluebird");

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
    function getExpectGetPosts() {
        return expect(blogParser.parseBlogContent(testContent).then(blogParser.getPosts));
    }

    function getExpectGlassFishItem() {
        return getExpectGetPosts()
            .to.eventually.is.an('array').with.deep.property('[2]');
    }

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
        expect(blogParser.parseBlogContent.bind(blogParser, '')).to.throw(blogParser.ParseError);

    });

    it('given blog.xml getPosts should return the correct number of post', function () {
        return getExpectGetPosts().
            to.eventually.have.property('length', 8);

    });
    it("given blog.xml getPost third post item title should be about glassfish ", function () {
        return getExpectGlassFishItem().with.deep.property('title').that.is.to.contain('GlassFish');
    });
    it("given blog.xml getPost third post item should have valid guid ", function () {
        return getExpectGlassFishItem()
            .with.deep.property('guid').that.is.to.equal('http://mohan82.wordpress.com/?p=15');
    });
    it("given blog.xml getPost third post item should have valid pubDate ", function () {
        return getExpectGlassFishItem()
            .with.deep.property('publicationDate').that.is.to.equal(new Date('Mon, 06 Jun 2011 10:31:11 +0000'));
    });

    it("given blog.xml content parseImageLink should parse all images", function (done) {

        blogParser.parseBlogContent(testContent).then(function (result) {
            blogParser.getPosts(result).then(function (posts) {
                posts.forEach(function(post){
                    console.log(post.content);
                });
                done();
            });
        });
    });

});