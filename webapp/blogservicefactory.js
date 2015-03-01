"use strict";

var BlogService = require("./blogservice.js");
var Blog = require("persistence").Blog;

var common = require("common");

var BlogServiceFactory = {};

BlogServiceFactory.createBlogService = function () {
    var blog = new Blog(common.config.DbConfig.dev());
    var blogService = new BlogService(blog);
    return blogService;
};

module.exports = BlogServiceFactory;

