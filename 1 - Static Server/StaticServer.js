const http = require('http')
  , url	= require('url')  
  , fs = require('fs')
  , path = require('path')

// This are the mimes used to serve and decode types of request resources.
let mimes =	{
  '.htm':'text/html',
  '.css':'text/css',
  '.js' :'text/javascript',
  '.gif':'image/gif',
  '.jpg':'image/jpeg',
  '.png':'image/png'
}

/* The actual web server logic the core of any node application
 * The most foundation level example this can get advanced as much as required.
 */
let webserver = ((req,res) => {
  // if the route requested is '/', then load 'index.htm' or
  // else load the requested file(S)
  let baseURI = url.parse(req.url)
  let filepath = __dirname+ (baseURI.pathname === '/' ? '/index.htm': baseURI.pathname) 
	
  // Check if the requested file is accessible or not
  fs.access(filepath,fs.F_OK, error => {
    if(!error){ 
      //Read and serve the file
      fs.readFile(filepath,(error,content) => {
        if(!error){
          // Resolve the content type requested
          let contentType = mimes[path.extname(filepath)]
          // serve the file from the buffer
          console.log('Serving content: '+filepath)
          res.writeHead(200,{'Content-Type':contentType})
          res.end(content,'utf-8')
        }else{
          // serve a 500 error
          res.writeHead(500)
          res.end('The server could not read the file requested.')
        }
      })
    }else{
      // Serve a 404 content not found
      res.writeHead(404)
      res.end('Content not found!')
    }
  })
  console.log(filepath)


})

http.createServer(webserver).listen( 3000, () => {
  console.log('WebServer running at port 30000')
})

