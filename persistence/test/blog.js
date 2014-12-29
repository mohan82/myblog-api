"use strict";


var chaiAsPromised = require("chai-as-promised");
var chai = require("chai");
chai.use(chaiAsPromised);
var expect = chai.expect,
    should = chai.should();

var CONST = require('../sqlconst');

var Blog = require("../blog");
var common = require('common');
var knexModule = require("knex");

describe("Integration Test for Blog DB", function () {



    var blogObj = new Blog(common.config.DbConfig.test());

    var TEST_POST = {
        "title": "test_title",
        "content": "test_content",
        "guid": "test_guid",
        "publicationDate":new Date()
    };

    before("Create Tables", function () {
        return blogObj.createPostTable();
    });

    after("clean up connection", function (done) {
        blogObj.dropPostTable().then(function () {
            blogObj.cleanUp();
            done();
        }).catch(function (error) {
            knex.destroy();
            done(error);
        });
    });


    beforeEach("Blog Post DML Initialisation", function () {
        return blogObj.savePost(TEST_POST);

    });

    afterEach("Clean up Blog Post DML Initialisation", function (done) {
        blogObj.findPostByTitle(TEST_POST.title).then(function (posts) {
            var post =posts[0];
            console.log("About to delete post %s", post.post_pk);
            blogObj.deletePost(post.post_pk).then(function () {
                console.log("Successfully deleted post");
                done();
            });
        }).catch(function (error) {
            done(error);
        });
    });

    it("given valid post table post table  should exist in db", function () {
        return expect(blogObj.knex.schema.hasTable(CONST.POST.TABLE)).to.eventually.be.true;
    });

    it("given Valid Post Record getAllPosts should return valid post title", function () {
        return blogObj.getAllPosts(10).should.eventually.have.deep
            .property('[0]').that.deep.have.property(CONST.POST.TITLE)
            .that.equals(TEST_POST.title);
    });

    it("given valid post record findPostById should retun valid post record", function (done) {
        blogObj.getAllPosts().then(function (posts) {
            var post = posts[0];
            var id = post.post_pk;
            blogObj.findPostById(id).should.eventually
                .have.deep.property('[0]').that.have.property(CONST.POST.PK)
                .that.equals(id).notify(done);
        }).catch(function (error) {
            done(error);
        });

    });

    it("given valid post findPostByTitle should return valid post record", function (done) {
        blogObj.getAllPosts().then(function (posts) {
            var post = posts[0];
            var title = post.title;
            blogObj.findPostByTitle(title).should.eventually
                .have.deep.property('[0]').that.have.property(CONST.POST.TITLE)
                .that.equals(title).notify(done);
        }).catch(function (error) {
            done(error);
        });

    });

});


