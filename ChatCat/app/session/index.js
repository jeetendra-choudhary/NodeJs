'use strict';

const session	= require('express-session');
const MongoStore	= require('connect-mongo')(session);
const config		= require('../config');

if (process.env.NODE_ENV === 'production'){
	// initialize session for production environment
	
}else{
	// initialize session for development environment
	module.exports = session({
		secret:config.sessionSecret,
		resave:false,
		saveUninitialized:true
	});
}
