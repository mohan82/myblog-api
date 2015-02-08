/**All Configuration Dev and Production**/
"use strict";

var os = require("os");

var Config = {};

var DbConfig= function(){

};


/**Production**/




/***Development***/

DbConfig.dev = function(){
     return {
         client:'pg',
         connection:'postgres://blog:blog@localhost/blog',
         pool:{
             min:2,
             max:50
         },
         debug:true
     };

};




/**Test/Integration Config**/
DbConfig.test = function(){
    //Every test requires unique db to avoid collisions
    var uniqueID = Math.random();
    var dbfullPath = os.tmpdir() + '/data_'+uniqueID+"_db.db";
    return {
        dialect: 'sqlite3',
        connection: {
            filename: dbfullPath
        },
        debug: true
    };
};

Config.DbConfig = DbConfig;
module.exports =Config;