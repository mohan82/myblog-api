"use strict";

var Blog = require('../persistence/blog');
var common = require('common');
var knex = require('knex');
var Promise = require('bluebird');


function Schema(blog){
    this.blog=blog;
}

Schema.prototype.createSchema = function(){

    console.log("Creating Blog Table if does not exist");
    return Promise.resolve(
    this.blog.dropPostTable().then(this.blog.createPostTable.bind(this.blog)));
};


function main(){
    var schema = new Schema(new Blog(common.config.DbConfig.dev()));
    schema.createSchema().finally(schema.blog.cleanUp.bind(schema.blog));
}

main();


