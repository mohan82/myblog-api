"use strict";

var BlogService = require('../webapp/blogservice');
var Blog = require('persistence').Blog;
var common = require('common');
var Promise = require('bluebird');
var fs = require("fs");
var path = require("path");
Promise.longStackTraces();

var readFile = Promise.promisify(fs.readFile);

var BLOG_FILE_PATH = "/home/mohan/All_Projects/node_projects/blog_data/blog.xml";

function BulkImporter(blogService) {
    this.blogService = blogService;
}

BulkImporter.prototype.importBlog = function () {


};

function main() {
    var devConfig = common.config.DbConfig.dev();
    devConfig.debug =false;
    var blogService = new BlogService(new Blog(devConfig));
    var bulkImporter = new BulkImporter(blogService);
    readFile(BLOG_FILE_PATH, "UTF-8")
        .then(blogService.parseBlogContent.bind(blogService))
        .then(blogService.getPostResult.bind(blogService))
        .then(blogService.savePost.bind(blogService))
        .catch(function (error) {
            console.error(error.stack);
        }).finally(blogService.blogObj.
            cleanUp.bind(blogService.blogObj
        ));
}

main();

