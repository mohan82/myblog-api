"use strict"
var BlogService = require("../blogservice.js");
var Blog = require("persistence").Blog;

var common = require("common");

//Chai
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect,
    should = chai.should();

describe("BlogService Integration Test", function () {
    var blog = new Blog(common.config.DbConfig.test());
    var blogService = new BlogService(blog);
    var testPosts = createPosts();

    before("Initialise Database", function (done) {
        blog.createPostTable().then(function(){
            done();
        }).catch(function(error){
            done(error);
        });
    });

    after("Drop Table", function (done) {
        blog.dropPostTable().then(function () {
            blog.cleanUp();
            done();
        }).catch(function (error) {
            blog.cleanUp();
            done(error);
        });
    });

    function createPosts() {
        var posts = [];
        for (var i = 1; i <= 5; i++) {
            posts.push({
                title: "test_tile:" + i,
                content: "test_content",
                guid: "test_guid"+i,
                publicationDate:new Date()
            });
        }
        return posts;
    }

    it("given valid test post savePost should persist", function (done) {
        blogService.savePost(testPosts).then(function(){
            expect(blog.getAllPosts()).eventually.to.have.property('length')
                .that.is.equal(testPosts.length).notify(done);
        }).catch(function(error){
            done(error);
        });

    });

});