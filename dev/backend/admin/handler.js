var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");

var lister = require ('./lister');
var adder = require ('./adder');
var modifier = require ('./modifier');
var deleter = require ('./deleter');
var lockingStateHandler = require ('./locking_state_handler');
exports.handle_operation = function (req, res){
	//check web path
	if (req.url.substr(0, 7) !== "/admin/") //
		return res.end(JSON.stringify({error_code: 2})); //wrong url format

	//check admin
	var token = req.body.token;
	tokenmanager.verify_token (token, function (response){
		log (response);
		if (response.error_code === 0 && response.valid === true){
			var username = response.username;
			var role = response.role;
			if (role === "admin"){
				//handle operation
				var operation = req.url.substr (7);
				log ("access admin console with username = " + username + " role = " + role + " operation = " + operation);
				if (operation === "list-user"){
					return lister.listUser (res);
				} else if (operation === "add-user"){
					return adder.addUser(req, res);
				} else if (operation === "modify-user"){
					return modifier.modifyUser (req, res);
				} else if (operation === "delete-user"){
					return deleter.deleteUser (req, res);
				} else if (operation === "lock-user"){
					return lockingStateHandler.setUserLockingState (req, "lock", res);
				} else if (operation === "unlock-user"){
					return lockingStateHandler.setUserLockingState (req, "unlock", res);
				}
				else return res.end (JSON.stringify({error_code: 2}));
			} else return res.end (JSON.stringify({error_code: 106}));
		}
		return res.end(JSON.stringify({error_code: 104}));
	})
}


