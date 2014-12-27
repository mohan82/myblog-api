/**All Configuration Dev and Production**/


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
    return {
        dialect: 'sqlite3',
        connection: {
            filename: './data.db'
        },
        debug: true
    };
};

Config.DbConfig = DbConfig;
module.exports =Config;