"use strict"
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
require('shelljs/global');

var COMMON_DIR = "common/";

var COMMON_TEST_DIR = COMMON_DIR + "test/";


var BLOG_PARSER_DIR = "blogparser/";
var BLOG_PARSER_TEST_DIR = BLOG_PARSER_DIR + "test/";
var WEBAPP_DIR = "webapp/";
var PERSISTENCE_DIR = "persistence/";
var PERSISTENCE_TEST_DIR = PERSISTENCE_DIR + "test/";
var WEBAPP_TEST_DIR = WEBAPP_DIR + "test/";


function executeShellCommand(command, ignoreError) {
    exec(command, {silent: false});
}


gulp.task("build", ['build-all', 'test']);

gulp.task("clean-build", ['clean-all']);


gulp.task("default", ["build"]);


gulp.task("test", ["run-common-test", "run-blog-test","run-persistence-test", "run-webapp-test"]);
gulp.task("clean-all", ["clean-common", "clean-blogparser", "clean-persistence", "clean-webapp"]);
gulp.task("build-all", ["build-common", "build-blogparser", "build-persistence", "build-webapp"]);


gulp.task("run-common-test", function () {
    gulp.src(COMMON_TEST_DIR + "*.js", {read: false})
        .pipe(mocha({reporter: 'spec'})).on('error', gutil.log);
});


gulp.task("run-blog-test", function () {
    gulp.src(BLOG_PARSER_TEST_DIR + "*.js", {read: false})
        .pipe(mocha({reporter: 'spec'})).on('error', gutil.log);
});

gulp.task("run-persistence-test",function(){
   gulp.src(PERSISTENCE_TEST_DIR  + "*.js", {read: false})
       .pipe(mocha({reporter: 'spec'})).on('error', gutil.log);
});
gulp.task("run-webapp-test", function () {
    gulp.src(WEBAPP_TEST_DIR + "/*.js", {read: false}).pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});

gulp.task("clean-persistence", function () {
    console.log("Cleaning up Persistence module");
    executeShellCommand("rm -r " + PERSISTENCE_DIR + "node_modules");

});

gulp.task("clean-blogparser", function () {
    console.log("Cleaning up blog parser");
    executeShellCommand("rm -r " + BLOG_PARSER_DIR + "node_modules");

});

gulp.task("clean-common", function () {
    console.log("Cleaning up blog parser");
    executeShellCommand("rm -r " + COMMON_DIR + "node_modules");

});


gulp.task("clean-webapp", function () {
    console.log("Cleaning WebApp node modules");
    executeShellCommand("rm -r " + WEBAPP_DIR + "node_modules");
});

gulp.task("build-common", function () {
    console.log("Building Common Module");
    executeShellCommand("npm install " + COMMON_DIR + " --prefix " + COMMON_DIR);
});

gulp.task("build-blogparser", function () {
    console.log("Building blog parser");
    executeShellCommand("npm install " + BLOG_PARSER_DIR + " --prefix " + BLOG_PARSER_DIR);
});

gulp.task("build-persistence", function () {
    console.log("Building Persistence module");
    executeShellCommand("npm install " + PERSISTENCE_DIR + " --prefix " + PERSISTENCE_DIR);

});

gulp.task("build-webapp", function () {
    executeShellCommand("npm install " + WEBAPP_DIR + " --prefix " + WEBAPP_DIR);

});

gulp.task('execute-test', function () {
    gulp.watch("**/**/*.js", ["test"]);
});