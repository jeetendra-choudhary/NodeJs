'use strict';

const express 	= require('express');
const app	= express();
const chatCat	= require('./app');

app.set('port',process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine','ejs');


app.use('/',chatCat.router);

app.listen(app.get('port'),()=>{
	console.log('Chat Cat running on port ',app.get('port'));
});
