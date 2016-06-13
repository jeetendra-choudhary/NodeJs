# Static Node Server
 - It should serve static html website
 - Should serve index.html file as default or should serve the file requested by user.
 - It uses nested callback, refered as `CallBack Hell`. For a better approach please refer to `Static Server Pro.`
 - It buffers up the file using `fs.readFile` Which is again not a good practice however, should suffies the simple use case. For a better approach using stream please refer to `Static Server Pro.`
 
## Installation & Usage Instrcution 

- Clone the repo in to the root folder of the Static Website
- Execute using node StaticServer.js
