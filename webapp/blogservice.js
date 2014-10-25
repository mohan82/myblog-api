"use strict"
var BlogParser = require("blogparser");
var TEST_FILE = "test.xml";
function helloWorld(){
    return "hello";
}var BlogService = function () {
    this.blogParser = new BlogParser(TEST_FILE);
};
BlogService.prototype.getComments = function () {
    return this.blogParser.parseBlog();
};

module.exports = BlogService;


