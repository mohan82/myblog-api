"use strict"


var xml2js = require('xml2js');
var fs = require("fs");
var util = require("util");
var Q = require("q");
var parser = new xml2js.Parser();

var BlogParser = {};

BlogParser.parseBlogContent = function (xml) {
    console.info("Parsing blog content..");
    var deferred = Q.defer();
    parser.parseString(xml, function (err, rawBlogContent) {
        if (err) {
            deferred.reject(new Error("Cannot parse given :" +
            xml + err.stack));
        } else {
            deferred.resolve(rawBlogContent);
        }
        console.info("Successfully parsed blog given blog content..");
    });
    return deferred.promise;
};


BlogParser.getPosts = function (rawBlogContent) {
    console.info("Tyring to parse given rawBlogContent:" + rawBlogContent);
    return Q.fcall(function getPosts() {
        return parsePosts(rawBlogContent);
    });
};

function parsePosts(rawBlogContent) {
    console.info("Tyring to parse posts of given rawBlogContent:" + rawBlogContent);
    var posts = [];
    rawBlogContent.rss.channel.forEach(function (channelElement) {
        channelElement.item.forEach(function (itemElement, index) {

            var post = {
                "title": itemElement.title,
                "pubDate": itemElement.pubDate,
                "content": itemElement["content:encoded"],
                "guid": itemElement.guid[0]._

            };
            posts.push(post);
        });
    });
    return posts;
}

module.exports = BlogParser;