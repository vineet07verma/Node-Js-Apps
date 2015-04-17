// INCLUSE FILES
var express = require('express'),
fs = require('fs'),
// FOR VIEW FILES FORMAT
handlebars = require('express3-handlebars').create({
	defaultLayout:'main'
}),
fortune = require('./lib/fortune.js');

// INITIALIZE SERVER
app = express();
app.use(express.static(__dirname + '/public'));
//SET PORT
app.set('port', process.env.PORT || 3000);

//Engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// ROUTING
app.get('/', function(req, res, next){
	handlebars.defaultLayout = "login";
	//res.type('text/plain');
	//res.status('200');
	//res.send('Welcome to Express');
	res.render('home');
});

app.get('/about', function(req, res, next){
	/*res.type('text/plain');
	res.status('200');
	res.send('about Express');*/
	res.render('about', {
		title:"Welcome to Node App",
		Content: fortune.getFortune()
	});
});

// 404
app.use(function(req, res){
	res.type('text/plain');
	res.status('400');
	res.send('404 - Not Found');
});

// 505 server error
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status('500');
	res.send('500 - Server Error');
});
////



// START SERVER
app.listen(app.get('port'), function(){
	console.log('Server is Running on Port '+app.get('port')+'');
});



