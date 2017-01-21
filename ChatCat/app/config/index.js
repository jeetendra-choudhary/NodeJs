	'use strict';

	if(process.env.NODE_ENV === 'production'){
		// Offer production stage environment variables
		module.exports = {
		host:process.env.host || "",
		dbURI:process.env.dbURI,
		sessionSecret:process.env.sessionSecret
		     "fb": {
			     "clientID":process.env.fbClientId,//"1708616822781769",
			     "clientSecret":process.env.sessionSecret,//"9d961c46e4befc42ead81c5bf8e36f72",
			     "callbackURL":process.env.host + "/auth/facebook/callback",
			     "profileFields":["id","displayName","photos"]
		     }   

		}
	} else{
		// Offer dev stage settings and data
		module.exports = require('./developement.json');
	}
