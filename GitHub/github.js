'use strict';
/*
	Author : Jeetendra Choudhary
	Author Url : http://jeetendra.xyz
	Description: A NodeJs Example of api consumption.
	License : GNU 2.0
	Scope	: Need to externalise credentials for security
		  Need to externalise urlString for simplycity
		  Need to include more and more apis for better learning and understanding about node js
*/
const http	=	require('http');
const url	=	require('url');
const qs	=	require('querystring');
const request	= 	require('request');
const APP_CONSTANT = 	require('./APP_CONSTANT.js');


let routes = {
		'GET':{
			'/':(req,res) => {
				res.writeHead(200,{'content-type':'text/html'});
				res.end('<center><h1> Welcome To Git Hub Api Demo</h1></center><br><h2>'+APP_CONSTANT.USER_NAME+'</h2>');
			},
			'/issues':(req,res) =>{
				var str = ' ';
				request.get(APP_CONSTANT.URL_STRING,
					{ 
						'auth':{
							'user':APP_CONSTANT.USER_NAME,
							'pass':APP_CONSTANT.USER_PASS,
							'sendImmediately':false
						},
						'headers':{
							'User-Agent':'Awesome-Octocat-App'
						}
					}).on('data',function(chunk){
						str += chunk;
					}).on('end',function(){
						res.writeHead(200,{'content-type':'application/json'});
						res.end(str);
					});
			}
		},
		'POST':{

		},
		'NA':(req,res)=>{
			res.writeHead(404);
			res.end('Content Not Found');
		}
}


function router(req,res){
	let baseURI = url.parse(req.url,true);	
	let resolveRoute = routes[req.method][baseURI.pathname];
	
	if(resolveRoute != undefined){
		req.queryParam = baseURI.query;
		resolveRoute(req,res);
	}else{
		routes['NA'](req,res);
	}
}

http.createServer(router).listen(3000,()=>{
	console.log('server running on port 3000');
});
