"use strict";

var Blog = require('../persistence/blog');
var common = require('common');
var BlueBirdPromise = require('bluebird');


function Schema(blog){
    this.blog=blog;
}

Schema.prototype.createSchema = function(){

    console.log("Creating Blog Table if does not exist");
    return BlueBirdPromise.resolve(
    this.blog.dropPostTable().then(this.blog.createPostTable.bind(this.blog)));
};

Schema.prototype.dropSchema = function(){
    console.log("Dropping Blog Table if it exist");
    return BlueBirdPromise.resolve(this.blog.dropPostTable());
};

function main(){
    var schema = new Schema(new Blog(common.config.DbConfig.dev()));
    schema.createSchema().finally(schema.blog.cleanUp.bind(schema.blog));

}

main();


