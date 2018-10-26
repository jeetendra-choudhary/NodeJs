'use strict';

const http	=	require('http'),
url	=	require('url'),
qs	=	require('querystring')

let	routes	= {
	'GET':{
		'/': (req,res) =>{
			res.writeHead(200,{'content-type':'text/html'})
			res.end('<center><h1>Hello Route</h1></center>')
		},
		'/about': (req,res) =>{
			res.writeHead(200,{'content-type':'text/html'})
			res.end('<center><h1>About Jeet</h1></center>')
		},
		'/api/getinfo':(req,res) => {
		//Fetch data from db and responsd as JSON
			res.writeHead(200,{'content-type':'application/json'})
			res.end(JSON.stringify(req.queryParams))
		}
		
	},
	'POST':{
		'/api/login':(req,res) => {
			let body = ''
			req.on('data',data => {
				body += data
				if (body.length > 2097152){
					res.writeHead(413,{'content-type':'text/html'})
					res.end('<h3> Error: File exceeeds the 2mb limit</h3>',()=>req.connection.destroy())
				}
			})
			req.on('end',() => {
				let params = qs.parse(body);
				console.log('User Name: ',params['username'])
				console.log('Password: ',params['password'])
				res.end()
			})
		}		
	},
	'NA':(req,res)=>{
		res.writeHead(404)
		res.end('Content Not Found')
	}
}

let router = (req,res) => {
	let baseURI = url.parse(req.url,true)
	let resolveRoute = routes[req.method][baseURI.pathname]

	if(resolveRoute != undefined){
		req.queryParams = baseURI.query
		resolveRoute(req,res)
	}else{
		routes['NA'](req,res)
	}
}

http.createServer(router).listen(3000,()=>{
	console.log('server running on port 3000');
});
