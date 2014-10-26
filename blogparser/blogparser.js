"use strict"


var xml2js = require('xml2js');
var fs = require("fs");
var util = require("util");
var parser = new xml2js.Parser();

var BlogParser = function(xml){
    this.xml = xml;
};

BlogParser.prototype.parseBlog = function () {
    return " Yet to parse please visit us later to parse :"+this.xml;
};

module.exports = BlogParser;