"use strict";
var blogParser = require("blogparser");
var BlueBirdPromise = require("bluebird");
var util = require('util');


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
    return BlueBirdPromise.all(savePostBlueBirdPromises).then(function () {
        console.log("Successfully saved");
    }).catch(function (error) {
        console.error("Unknown exception occured:%s", error);
        throw  error;
    });
};

BlogService.prototype.getPostResult = function (rawBlogContent) {
    console.info("extracting post result from raw blog content ...");
    return blogParser.getPosts(rawBlogContent).then(function (postResult) {
        return postResult;
    });
};

BlogService.prototype.convertKnexResultToPostWithoutContent = function(result){
    return {
        id: result.post_pk,
        title: result.title,
        guid: result.guid,
        pubDate: new Date(result.publication_date)

    };
};

BlogService.prototype.convertKnexResultToPost = function(result){
    return {
        id: result.post_pk,
        title: result.title,
        content: result.content.toString(),
        guid: result.guid,
        pubDate: new Date(result.publication_date)
    };

};

BlogService.prototype.getAllPosts = BlueBirdPromise.method(function () {
    var posts = [];
    var self = this;
    return this.blogObj.getAllPosts().then(function(results){
        results.forEach(function (result) {
            var post =self.convertKnexResultToPostWithoutContent(result);
            posts.push(post);
        });
        return posts;
    });
});


BlogService.prototype.getPost = BlueBirdPromise.method(function (id) {
     if (util.isNullOrUndefined(id)) {
        throw new TypeError("Empty Id given");
     }
    return this.blogObj.findPostById(id).then(function (results) {
        if (!util.isArray(results) || results.length === 0) {
            throw  new TypeError("Invalid id provided :" + id);

        }
        return this.convertKnexResultToPost(results[0]);
    }.bind(this));

});

module.exports = BlogService;


