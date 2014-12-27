var persistence = require('../persistence');
var chai = require("chai");
var common = require("common");

var expect = chai.expect;

describe("Test Persitence Module", function () {


    beforeEach("Before Test",function(){});

    it("expect persistence to have Blog Module",function(){
        var blogObj = new persistence.Blog(null);
        expect(blogObj).to.have.property("knex");
    });


});


























