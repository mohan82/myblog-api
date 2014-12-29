"use strict"

var CONST = require('../persistence/sqlconst');
var util = require("util");
var DEFAULT_LIMIT = 50;
var MAX_THRESHOLD = 500;
var knexModule = require("knex");
/**
 *
 * @param name
 * @constructor
 */
function Blog(knexConfig) {
    this.knex = knexModule(knexConfig);
}

//DDL Functions
Blog.prototype.dropPostTable = function () {
    console.info("Dropping table if exist");
    return this.knex.schema.dropTableIfExists(CONST.POST.TABLE);
}

/**
 * Table Create Post Table
 */
Blog.prototype.createPostTable = function () {
    console.info("Creating %s table if exist", CONST.POST.TABLE);
    return this.knex.schema.createTable(CONST.POST.TABLE, function (table) {
        table.increments(CONST.POST.PK);
        table.string(CONST.POST.GUID).unique();
        table.string(CONST.POST.TITLE).unique()
            .notNullable();
        table.binary(CONST.POST.CONTENT)
            .notNullable();
        table.datetime(CONST.POST.PUB_DATE).index(CONST.POST.IDX_PUBDATE)
            .notNullable();
    });
};


Blog.prototype.cleanUp = function(){
    console.log("Cleaning up Knex");
   this.knex.destroy();
};

Blog.prototype.savePost = function (post) {
    var record = {
        "title": post.title,
        "content": post.content,
        "guid": post.guid,
        "publication_date":post.publicationDate
    };
    return this.knex.insert(record).into(CONST.POST.TABLE);
};

Blog.prototype.deletePost = function (postId) {
    console.info("Deleting post :%d",postId);
    return this.knex(CONST.POST.TABLE).where(CONST.POST.PK,postId).del();
};

//Limit Helper functions
function checkLowerBoundLimit(limit) {
    if (util.isNullOrUndefined(limit) || limit === 0) {
        return DEFAULT_LIMIT;
    } else {
        return limit;
    }
}

function checkUpperBoundLimit(value) {
    if (!util.isNullOrUndefined(value) && value >= MAX_THRESHOLD) {
        return MAX_THRESHOLD;
    }
    else {
        return value;
    }
}

Blog.prototype._determineDefaultLimit = function (limit) {
    var result = checkLowerBoundLimit(limit);
    result = checkUpperBoundLimit(result);
    return result;
};


// Query functions

Blog.prototype.findPostById = function (postId) {
    return this.knex.
        select(CONST.POST.PK,CONST.POST.TITLE, CONST.POST.CONTENT, CONST.POST.GUID)
        .from(CONST.POST.TABLE)
        .where(CONST.POST.PK, postId);
};

Blog.prototype.getAllPosts = function (limit) {
    return this.knex.select(CONST.POST.PK,CONST.POST.TITLE, CONST.POST.CONTENT, CONST.POST.GUID)
        .from(CONST.POST.TABLE).limit(this._determineDefaultLimit(limit));
};

Blog.prototype.findPostByTitle = function (title) {
    return this.knex.
        select(CONST.POST.PK,CONST.POST.TITLE, CONST.POST.CONTENT, CONST.POST.GUID)
        .from(CONST.POST.TABLE)
        .where(CONST.POST.TITLE, title);
};



module.exports = Blog;

