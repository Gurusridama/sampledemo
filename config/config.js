var define = require('node-constants')(exports)
var mysql      = require('mysql');
var dataConfig = {
	server: "localhost",
	user: "root",
	password: "",
	database : 'demodata'
};

define({dataConfig : dataConfig});