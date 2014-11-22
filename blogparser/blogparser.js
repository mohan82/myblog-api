"use strict";


var xml2js = require('xml2js');
var fs = require("fs");
var util = require("util");
var Promise = require("bluebird");
var parser = new xml2js.Parser();
var common = require("common");

var BlogParser = {};

BlogParser.Post = function (title, content, pubDate, guid) {
    this.title = title;
    this.content = content;
    this.pubDate = pubDate;
    this.guid = guid;

};

BlogParser.parseBlogContent = function (xml) {
    console.info("Parsing blog content..");
    if (common.Util.isStringEmpty(xml)) {
        throw new BlogParser.ParseError("Cannot parse empty string");
    }
    return new Promise(function (resolve, reject) {
        parser.parseString(xml, function (err, rawBlogContent) {
            if (err) {
                var error = new BlogParser.ParseError("Cannot parse given :" +
                xml + " , " + err.stack);
                reject(error);
            } else {
                resolve(rawBlogContent);
            }
            console.info("Successfully parsed blog given blog content..");
        });
    });


};


BlogParser.getPosts = function (rawBlogContent) {
    console.info("Tyring to parse given rawBlogContent:" + rawBlogContent);
    return Promise.resolve(parsePosts(rawBlogContent));

};

function parsePosts(rawBlogContent) {
    console.info("Tyring to parse posts of given rawBlogContent:" + rawBlogContent);
    var posts = [];
    rawBlogContent.rss.channel.forEach(function (channelElement) {
        channelElement.item.forEach(function (itemElement, index) {

            var title = String(itemElement.title);
            if (common.Util.isStringEmpty(title)) {
                return;
            }
            var content = String(itemElement["content:encoded"]);
            var guid = String(itemElement.guid[0]._);
            var pubDate = new Date(itemElement.pubDate);
            var post = new BlogParser.Post(title, content, pubDate, guid);
            posts.push(post);
        });
    });
    return posts;
}

//Parser Error
var ParseError = exports.ParseError = function (message) {
    Error.captureStackTrace(this, ParseError);
    this.message = message;
}
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

BlogParser.ParseError = ParseError;

module.exports = BlogParser;