"use strict";


var xml2js = require('xml2js');
var BluebirdPromise = require("bluebird");
var parser = new xml2js.Parser();
var common = require("common");

var BlogParser = {};

var CONTENT_ELEMENT = "content:encoded";
var POST_TYPE_ELEMENT = "wp:post_type";
var POST_CONTENT_TYPE = "post";

BlogParser.Post = function (title, content, publicationDate, guid) {
    this.title = title;
    this.content = content;
    this.publicationDate = publicationDate;
    this.guid = guid;

};


BlogParser.parseBlogContent = function (xml) {
    console.info("Parsing blog content..");
    if (common.Util.isStringEmpty(xml)) {
        throw new BlogParser.ParseError("Cannot parse empty string");
    }
    return new BluebirdPromise(function (resolve, reject) {
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
    return BluebirdPromise.resolve(BlogParser._parsePosts(rawBlogContent));

};

//__Private Parser Methods ___

BlogParser._getTitle = function (element) {
    return String(element.title);
};
BlogParser._getContent = function (element) {
    return String(element[CONTENT_ELEMENT]);
};

BlogParser._getGuid = function (element) {
    return String(element.guid[0]._);
};

BlogParser._getContentType = function (element) {
    return String(element[POST_TYPE_ELEMENT]);
};
BlogParser._isPostContentType = function (element) {
    var contentType = this._getContentType(element);
    return contentType === POST_CONTENT_TYPE;
};

BlogParser._getPubDate = function (element) {
    return element.pubDate;
};

BlogParser._parsePosts = function (rawBlogContent) {
    console.info("Tyring to parse posts of given rawBlogContent:" + rawBlogContent);
    var posts = [];
    rawBlogContent.rss.channel.forEach(function (channelElement) {
        channelElement.item.forEach(function (itemElement) {

            if (!BlogFilter.isValidPost(itemElement)) {
                console.warn("Invalid element %s, skipping ..", itemElement.title);
                return;
            }

            var publicationDate = new Date(BlogParser._getPubDate(itemElement));
            var post = new BlogParser.Post(BlogParser._getTitle(itemElement),
                BlogParser._getContent(itemElement),
                publicationDate,
                BlogParser._getGuid(itemElement));
            posts.push(post);
        });
    });
    return posts;
};

//__End Private Methods ___


//Blog Filter
var BlogFilter = function () {
};

BlogFilter.hasTitle = function (element) {
    return !common.Util.isStringEmpty(BlogParser._getTitle(element));
};


BlogFilter.hasValidPublicationDate = function (element) {
    var time = Date.parse(BlogParser._getPubDate(element));
    if (!isNaN(time)) {
        return true;
    } else {
        console.warn("Invalid time :%s for element  %s:", BlogParser._getPubDate(element),
            BlogParser._getTitle(element));
        return false;
    }
};

BlogFilter.hasValidContentType = function (element) {
    if (BlogParser._isPostContentType(element)) {
        return true;
    } else {
        console.warn("Invalid content type :%s for item %s ,only post is parsed ",
            BlogParser._getContentType(element), BlogParser._getTitle(element));
        return false;
    }
};


BlogFilter.isValidPost = function (element) {
    return this.hasTitle(element) &&
        this.hasValidPublicationDate(element) &&
        this.hasValidContentType(element);
};


//Parser Error
var ParseError = exports.ParseError = function (message) {
    Error.captureStackTrace(this, ParseError);
    this.message = message;
};
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

BlogParser.ParseError = ParseError;

module.exports = BlogParser;