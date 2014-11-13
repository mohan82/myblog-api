/**
 * Created by mohan on 25/10/14.
 */
"use strict"
var blogService = require("../blogservice.js");
var fs = require("fs");
var path = require("path");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect,
    should = chai.should();

var TEST_FILE_PATH = path.resolve('common/test_data/blog.xml');

describe("Test Blog Service", function () {
    var testContent;
    before("Read File", function (done) {
        fs.readFile(TEST_FILE_PATH, 'utf-8', function (error, data) {
            testContent = data;
            done(error);
        });
    });

    it("given valid test blog xml import blog should contain valid title", function (done) {
        console.log("importing blog");
        blogService.importBlog(testContent,function(postResult){
            expect(postResult).to.have.property('length', 10);
            done();
        });
    });
});