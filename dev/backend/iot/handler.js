var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");

var dataer = require ('./dataer');
exports.handle_operation = function (req, res){
	//check web path
	if (req.url.substr(0, 5) !== "/iot/") //
		return res.end(JSON.stringify({error_code: 2})); //wrong url format

	//check valid user
	var token = req.body.token;
	tokenmanager.verify_token (token, function (response){
		log (response);
		if (response.error_code === 0 && response.valid === true){
			var operation = req.url.substr (5);
			if (operation === "data"){
				return dataer.get_data(req, res);
			}
			else return res.end (JSON.stringify({error_code: 2}));
		}
		return res.end(JSON.stringify({error_code: 104}));
	})
}


/**/