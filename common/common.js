"use strict";
var util = require('util');
var config = require("./config.js");


var Common = {};
var Util ={};

Util.isStringEmpty = function (text) {
    if (util.isNullOrUndefined(text) ||
        !util.isString(text) ||
        !text.trim()) {
        return true;
    } else {
        return false;
    }
};

//Common.Util.createError =function(errorObjectName){
//    errorObjectName = function (message) {
//        Error.captureStackTrace(this,errorObjectName);
//        this.message = message;
//    };
//    errorObjectName.prototype = Object.create(Error.prototype);
//
//};
////Parser Error
//ParseError.prototype = Object.create(Error.prototype);
//ParseError.prototype.constructor = ParseError;
Common.config = config;
Common.Util = Util;
module.exports = Common;
