"use strict"
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
require('shelljs/global');

var BLOG_PARSER_DIR = "blogparser/";
var BLOG_PARSER_TEST_DIR = BLOG_PARSER_DIR + "test/";
var WEBAPP_DIR = "webapp/";
var WEBAPP_TEST_DIR = WEBAPP_DIR + "test/";


function executeShellCommand(command, ignoreError) {
    exec(command, {silent: false});
}


gulp.task("build", ['build-all', 'test']);

gulp.task("clean-build", ['clean-all']);


gulp.task("default", ["build"]);


gulp.task("test", ["run-blog-test", "run-webapp-test"]);
gulp.task("clean-all", ["clean-blogparser", "clean-webapp"]);
gulp.task("build-all", ["build-blogparser", "build-webapp"]);


gulp.task("run-blog-test", function () {
    gulp.src(BLOG_PARSER_TEST_DIR + "*.js", {read: false})
        .pipe(mocha({reporter: 'spec'})).on('error', gutil.log);
});

gulp.task("run-webapp-test", function () {
    gulp.src(WEBAPP_TEST_DIR + "/*.js", {read: false}).pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});

gulp.task("clean-blogparser", function () {
    console.log("Cleaning up blog parser");
    executeShellCommand("rm -r " + BLOG_PARSER_DIR + "node_modules");

});


gulp.task("clean-webapp", function () {
    console.log("Cleaning WebApp node modules");
    executeShellCommand("rm -r " + WEBAPP_DIR + "node_modules");
});


gulp.task("build-blogparser", function () {
    console.log("Building blog parser");
    executeShellCommand("npm install " + BLOG_PARSER_DIR + " --prefix " + BLOG_PARSER_DIR);
});

gulp.task("build-webapp", function () {
    executeShellCommand("npm install " + WEBAPP_DIR + " --prefix " + WEBAPP_DIR);

});

gulp.task('execute-test', function () {
    gulp.watch("**/**/*.js", ["test"]);
});