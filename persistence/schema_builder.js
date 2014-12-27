"use strict";

var Blog = require('../persistence/blog');
var common = require('common');
var knex = require('knex');
var Promise = require('bluebird');

var devKnexConfig = common.config.DbConfig.dev();
var conn = knex(devKnexConfig);
var blogObj = new Blog(conn);

blogObj.dropPostTable().then(blogObj.createPostTable.bind(blogObj))
    .then(function () {
        blogObj.savePost({
            "title": "test",
            "content": "Test Content",
            "guid": "test guid"

        });
    }).
    catch(function (error) {
        console.log("error" + error);
    })
    .finally(function () {
        console.info("Gracefully shutting down knex engine");
        conn.destroy();

    }).catch(function (e) {
        throw  e;
    });


