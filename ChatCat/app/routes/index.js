'use strict';
const h		= require('../helpers');


module.exports = () => {
	let routes = {
		'get' : {
			'/':(req,res,next) => {
				res.render('login');
			},
			'/rooms': (req,res,next) => {
				res.render('rooms');
			},
			'/chat': (req,res,next) => {
				res.render('chatroom');
			}
		},
		'post' : {
			
		},
		'NA':(req,res,next) => {
			res.status(404).sendFile(process.cwd()+'/views/404.htm');
		},
	}

return h.route(routes);

};
