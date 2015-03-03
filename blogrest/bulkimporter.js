"use strict";

var BlogService = require('../blogrest/blogservice');
var Blog = require('persistence').Blog;
var common = require('common');
var BlueBirdPromise = require('bluebird');
var fs = require("fs");
BlueBirdPromise.longStackTraces();

var readFile = BlueBirdPromise.promisify(fs.readFile);

var BLOG_FILE_PATH = "/home/mohan/All_Projects/node_projects/blog_data/blog.xml";

function main() {
    var devConfig = common.config.DbConfig.dev();
    devConfig.debug =false;
    var blogService = new BlogService(new Blog(devConfig));
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


