var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");
var get_handler = require ('./get');
var markasread_handler = require ('./markasread');

exports.handle_operation = function (req, res){
	//check web path
	if (req.url.substr(0, 15) !== "/notifications/") //
		return res.end(JSON.stringify({error_code: 2})); //wrong url format

	//check admin
	var token = req.body.token;
	tokenmanager.verify_token (token, function (response){
		log (response);
		if (response.error_code === 0 && response.valid === true){
			var username = response.username;
			var operation = req.url.substr (15);
			if (operation === "get")
				return get_handler.get(req, username, res);
			else if (operation === "markasread")
				return markasread_handler.markasread(req, username, res);
			else return res.end (JSON.stringify({error_code: 2}));
		} 
		return res.end(JSON.stringify({error_code: 104}));
	})
}