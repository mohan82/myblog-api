"use strict";
var blogParser = require("blogparser");
var BlueBirdPromise = require("bluebird");



var BlogService = function (blog) {
    this.blogObj = blog;
};

BlogService.prototype.importBlog = function (blogContent, completedCallback) {
    console.log("Parsing Blog Content");
    var self = this;
    return this.parseBlogContent(blogContent).then(self.getPostResult)
        .done(completedCallback);
};

BlogService.prototype.parseBlogContent = function (blogContent) {
    return blogParser.parseBlogContent(blogContent)
        .then(function (rawBlogContent) {
            console.log("Setting Blog Result" + rawBlogContent);
            return rawBlogContent;
        });
};

BlogService.prototype.savePost = function (posts) {
    var blog = this.blogObj;
    var savePostBlueBirdPromises = [];
    posts.forEach(function (postElement) {
        savePostBlueBirdPromises.push(blog.savePost(postElement));
    });
   return BlueBirdPromise.all(savePostBlueBirdPromises).then(function(){
        console.log("Successfully saved");
    }).catch(function(error){
        console.error("Unknown exception occured:%s",error);
        throw  error;
    });
};

BlogService.prototype.getPostResult = function (rawBlogContent) {
    console.info("extracting post result from raw blog content ...");
    return blogParser.getPosts(rawBlogContent).then(function (postResult) {
        return postResult;
    });
};

module.exports = BlogService;


