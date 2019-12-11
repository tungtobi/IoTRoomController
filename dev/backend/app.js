require ("/var/app/backend/lib/constants.js");
require (_LIB_PATH_ + "/log");
require (_LIB_PATH_ + "/string");

var express = require('express');
var app = express();
var usermanager = require (_AUTH_PATH_ + '/usermanager');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', function (req, res) {
	usermanager.login (req.body, function (result){
		res.end (JSON.stringify(result)); 
	});
})
app.post ('/logout', function (req, res){
	if (req.body.token !== undefined){
		usermanager.logout (req.body.token, function (result){
			res.end (JSON.stringify(result));	
		});	
	}
})
app.post('/register', function (req, res){
	usermanager.register (req.body, function (result){
		res.end(JSON.stringify(result));
	})
})


app.use(express.static('public'));

app.get('/', function(req, res){
	res.redirect("/index.html");
});
app.get('/*', function (req, res){
	res.end(JSON.stringify({"error_code": 404}));
});
app.post('/*', function (req, res){
        res.end(JSON.stringify({"error_code": 404}));
});
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   log("App is listening at http://%s:%s", host, port)
})
