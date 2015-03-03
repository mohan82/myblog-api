"use strict"
var BlogService = require("../blogservice.js");
var Blog = require("persistence").Blog;

var common = require("common");

//Chai
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var TEST_POSTS = createPosts();

function createPosts() {
    var posts = [];
    for (var i = 1; i <= 5; i++) {
        posts.push({
            title: "test_tile:" + i,
            content: "test_content",
            guid: "test_guid" + i,
            publicationDate: new Date()
        });
    }
    return posts;
}

function createPostTable(blog, done) {
    blog.createPostTable().then(function () {
        done();
    }).catch(function (error) {
        done(error);
    });
}

function dropTable(blog, done) {
    blog.dropPostTable().then(function () {
        blog.cleanUp();
        done();
    }).catch(function (error) {
        blog.cleanUp();
        done(error);
    });
}
describe("BlogService Integration Test", function () {
    var blog = new Blog(common.config.DbConfig.test());
    var blogService = new BlogService(blog);

    before("Initialise Database", function (done) {
        createPostTable(blog, done);
    });

    after("Drop Table", function (done) {
        dropTable(blog, done);
    });


    it("given valid test post savePost should persist", function (done) {
        blogService.savePost(TEST_POSTS).then(function () {
            expect(blog.getAllPosts()).eventually.to.have.property('length')
                .that.is.equal(TEST_POSTS.length).notify(done);
        }).catch(function (error) {
            done(error);
        });

    });
});

describe("Test Blog Service Blog Post select methods", function () {
    var blog = new Blog(common.config.DbConfig.test());
    var blogService = new BlogService(blog);

    function savePosts(done) {
        blogService.savePost(TEST_POSTS).then(function () {
            done();
        }).catch(function (error) {
            done(error);
        });

    }

    before('Initialise DB and Table', function (done) {
        createPostTable(blog, done);

    });
    before("Save Posts", function (done) {
        savePosts(done);
    });


    after("Drop DB", function (done) {
        dropTable(blog, done);

    });

    it("given valid test post getAllPosts should return valid posts length", function (done) {
        expect(blogService.getAllPosts()).
            eventually.to.have.property('length').that.is.equal(TEST_POSTS.length).notify(done);

    });
    it("given valid  first test post with tile getAllPosts should match valid test first title",function(done){
       expect(blogService.getAllPosts()).eventually.to.have.deep.property('[0]').
           that.has.property('title').to.equal(TEST_POSTS[0].title).notify(done);
    });
    
    it("given valid test guid for post getAllPosts shouldd contain valid test guid",function(done){
        expect(blogService.getAllPosts()).eventually.to.have.deep.property('[0]').
            that.has.property('guid').to.equal(TEST_POSTS[0].guid).notify(done);
    });
    
    it("given valid test publicationDate for post getAllPosts shouldd contain valid test publicationDate",function(done){
        expect(blogService.getAllPosts()).eventually.to.have.deep.property('[0]').
            that.has.property('pubDate').to.equal(TEST_POSTS[0].publicationDate).notify(done);
    });

});