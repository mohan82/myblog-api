"use strict";
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var jshintStylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');

require('shelljs/global');

var COMMON_DIR = "common/";
var BLOG_PARSER_DIR = "blogparser/";
var WEBAPP_DIR = "webapp/";
var PERSISTENCE_DIR = "persistence/";
var TEST_DIR = "*/test/*.js";
var BUILD_DIR = "build/"
//ignore test,build and node modules dir
var CODE_DIR = ["!**/**/test/*.js",
    "!**/node_modules/**/*.js", "**/**/*.js", "!**/build/**/"];

function executeShellCommand(command) {
    exec(command, {silent: false});
}


gulp.task("build", ['build-all', 'coverage', 'jshint']);

gulp.task("clean-build", ['clean-all']);


gulp.task("default", ["build"]);


gulp.task("test", function () {
    executeShellCommand("mocha -R spec " + TEST_DIR);
});
gulp.task("clean-all", ["clean-build","clean-common", "clean-blogparser", "clean-persistence", "clean-webapp"]);
gulp.task("build-all", ["build-common", "build-blogparser", "build-persistence", "build-webapp"]);


gulp.task("clean-persistence", function () {
    console.log("Cleaning up Persistence module");
    executeShellCommand("rm -r "+BUILD_DIR);

});

gulp.task("clean-build",function(){
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
    console.log("Building Persistence module");
    executeShellCommand("npm install " + PERSISTENCE_DIR + " --prefix " + PERSISTENCE_DIR);

});

gulp.task("build-webapp", function () {
    executeShellCommand("npm install " + WEBAPP_DIR + " --prefix " + WEBAPP_DIR);

});

gulp.task('execute-test', function () {
    gulp.watch("**/**/*.js", ["test"]);
});

//Linting  and Code Quality Checks
gulp.task('jshint', function () {


    return gulp.src(CODE_DIR).
        pipe(jshint()).
        pipe(jshint.reporter(jshintStylish)).
        pipe(jshint.reporter('fail'));

});

gulp.task('jscs', function () {

    return gulp.src(CODE_DIR).
        pipe(jscs());
});

gulp.task('coverage', function () {
    return gulp.src(CODE_DIR)
        .pipe(istanbul({includeUntested: true})) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(TEST_DIR)
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: BUILD_DIR +"unit-test-coverage",
                    reporters: ['lcov'],
                    reportOpts: {dir: BUILD_DIR + "unit-test-coverage"}
                }));

        });
});