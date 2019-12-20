require ("/home/ubuntu/web/lib/constants.js");
require (_LIB_PATH_ + "/log");
require (_LIB_PATH_ + "/string");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//standard operations
var usermanager = require (_AUTH_PATH_ + '/usermanager');
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
	} else res.end (JSON.stringify({error_code: 103}));
})

app.post ('/user/info', function(req, res){
	if (req.body.token !== undefined){
		return usermanager.user_info (req.body.token, res);
	} else res.end (JSON.string({error_code: 103}));
})

app.post ('/user/modify-user', function(req, res){
	if (req.body.token !== undefined){
		return usermanager.modify_user (req, res);
	} else res.end (JSON.string({error_code: 103}));	
})
/*app.post('/register', function (req, res){
	usermanager.register (req.body, function (result){
		res.end(JSON.stringify(result));
	})
})*/

//for admin
var admin = require (_APP_PATH_ + "/admin/handler");
app.post('/admin/*', function (req, res){
	return admin.handle_operation (req, res); //without calling back
})

var iot = require (_APP_PATH_ + "/iot/handler");
app.post('/iot/*', function (req, res){
	return iot.handle_operation (req, res);
})

var notifications = require (_APP_PATH_ + "/notifications/handler");
app.post('/notifications/*', function (req, res){
	return notifications.handle_operation(req, res);
});


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
   
   log("App is listening at http://" + host + ":" + port);
})
