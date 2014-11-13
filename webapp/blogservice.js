"use strict"
var blogParser = require("blogparser");
var Q = require("q");


var BlogService = {};

BlogService.importBlog = function (blogContent,completedCallback) {
    console.log("Parsing Blog Content");
    return BlogService.parseBlogContent(blogContent).then(BlogService.getPostResult)
        .done(completedCallback);
};

BlogService.parseBlogContent = function (blogContent) {
    return blogParser.parseBlogContent(blogContent)
        .then(function (rawBlogContent) {
            console.log("Setting Blog Result" + rawBlogContent);
            return rawBlogContent;
        });
};

BlogService.getPostResult = function (rawBlogContent) {
    return blogParser.getPosts(rawBlogContent).then(function (postResult) {
        console.log("Setting Post Result" + postResult);
        return postResult;
    });
};

module.exports = BlogService;


