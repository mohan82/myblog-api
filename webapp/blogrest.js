"use strict";
var app = require('express')();
var blogServiceFactory = require('./blogservicefactory'),
    blogService = blogServiceFactory.createBlogService();

app.get("/posts", function (req, res) {
    blogService.getAllPosts().then(function (results) {
        res.json(results);

    }).catch(function (error) {
        console.error(error);
        res.status(500).send({error: 'Internal Error occured'});
    });
});

app.get("/post/:id", function (req, res) {
    console.log("Post id is %s :", req.params.id);
    blogService.getPost(req.params.id).then(function (result) {
        res.json(result);

    }).catch(function (error) {
        console.error(error);
        res.status(500).send({error: 'Internal Error occured :  '+ error});

    });
});

app.listen(3000);