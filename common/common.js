"use strict"
var util = require('util');

var Common = {};
Common.Util ={};

Common.Util.isStringEmpty = function (text) {
    if (util.isNullOrUndefined(text)
        || !util.isString(text)
        || !text.trim()) {
        return true;
    } else {
        return false;
    }
};


module.exports = Common;