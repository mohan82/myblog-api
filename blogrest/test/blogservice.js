/**
 * Created by mohan on 25/10/14.
 */
"use strict";
var BlogService = require("../blogservice.js");

//File Dependencies
var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var readFile = Promise.promisify(fs.readFile);

//Chai
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect,
    should = chai.should();

var TEST_FILE_PATH = path.resolve('common/test_data/blog.xml');

describe("Test Blog Service Parsing", function () {
    var testContent;
    var blogService = new BlogService(null);

    before("Read File", function (done) {

        readFile(TEST_FILE_PATH, 'utf-8').then(function (data) {
            testContent = data;
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it("given valid test blog xml import blog should contain valid title", function (done) {
        console.log("importing blog");
        blogService.importBlog(testContent, function (postResult) {
            expect(postResult).to.have.property('length', 8);
            done();
        });
    });

});
