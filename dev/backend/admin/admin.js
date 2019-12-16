var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");
var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");

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
					return listUser (res);
				} else if (operation === "add-user"){
					return addUser(req, res);
				} else if (operation === "modify-user"){
					return modifyUser (req, res);
				} else if (operation === "delete-user"){
					return deleteUser (req, res);
				} else if (operation === "lock-user"){
					return setUserLockingState (req, "lock", res);
				} else if (operation === "unlock-user"){
					return setUserLockingState (req, "unlock", res);
				}
				else return res.end (JSON.stringify({error_code: 106}));
			} 
		}
		return res.end(JSON.stringify({error_code: 104}));
	})
}
function modifyUser(req, res){
	if (req.body.username == undefined) return res.end (JSON.stringify({error_code: 103}));

	var info = req.body;

	if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.password != null && validate_string(info.password, {uc: true, lc: true, dg: true, sc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.first_name != null && validate_string(info.first_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.last_name != null && validate_string(info.last_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.gender != null && validate_string(info.gender, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.email != null && validate_string(info.email, {uc: true, lc: true, cs:"@._", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.phone_number != null && validate_string(info.phone_number, {dg: true, cs: "+"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (info.address != null && validate_string(info.address, {uc: true, lc: true, sp: true, cs: ",.", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));

	mysqldatabase.query ("select * from users where username = '" + info.username + "'", 
		function (result){
			if (result.error_code !== 0){return res.end(JSON.stringify({"error_code": 100}));}
			else if (result.result.length != 1){return res.end(JSON.stringify({"error_code": 107}));}
			else if (result.result.length == 1) {
				var query = "update users set username='" + info.username + "'";
				if (info.password != null) query += ", password='" + info.password + "'";
				if (info.first_name != null) query += ", first_name='" + info.first_name + "'";
				if (info.last_name != null) query += ", last_name='" + info.last_name + "'";
				if (info.gender != null) query += ", gender='" + info.gender + "'";
				if (info.email != null) query += ", email='" + info.email + "'";
				if (info.phone_number != null) query += ", phone_number='" + info.phone_number + "'";
				if (info.address != null) query += ", address='" + info.address + "'";
				query += " where username='" + info.username + "'";

				mysqldatabase.query (query, function (result){
					return res.end (JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
		}
	);
}
function deleteUser(req, res){
	if (req.body.username == undefined) return res.end (JSON.stringify({error_code: 103}));
	var info = req.body;
	if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false) return res.end(JSON.stringify({error_code: 101}));

	//check if the user exists or not
	mysqldatabase.query ("select ID from users where username = '" + info.username + "'", 
		function (result){
			if (result.error_code !== 0){res.end(JSON.stringify({"error_code": 100}));}
			else if (result.result.length != 1){res.end(JSON.stringify({"error_code": 107}));}
			else if (result.result.length == 1){
				mysqldatabase.query ("delete from users where username='" + info.username + "'", function (result){
					return res.end(JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
	});
}
function setUserLockingState(req, lockingState, res){
	if (lockingState != "unlock" && lockingState != "lock") return res.end (JSON.stringify({error_code: 101}));
	if (
		req.body.username == undefined
	) return res.end (JSON.stringify({error_code: 103}));

	var info = req.body;
	if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false) return res.end(JSON.stringify({error_code: 101}));

	//check if the user exists or not
	mysqldatabase.query ("select ID from users where username = '" + info.username + "'", 
		function (result){
			if (result.error_code !== 0){res.end(JSON.stringify({"error_code": 100}));}
			else if (result.result.length != 1){res.end(JSON.stringify({"error_code": 107}));}
			else if (result.result.length == 1){
				mysqldatabase.query ("update users SET locking_state='" + lockingState + "' where username='" + info.username + "'", function (result){
					return res.end(JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
	});
}

function listUser (res){
	var query = "select * from users";
	mysqldatabase.query(query, function (response){
		if (response.error_code === 0){			
			var json = {error_code:0, number_of_users: response.result.length};
			for (var i = 0; i < response.result.length; ++i)
			{
				json['user_' + i] = JSON.parse(JSON.stringify(response.result[i]));
			}
			return res.end (JSON.stringify(json));
		} 
		return res.end(JSON.stringify({error_code:100}));
	})
}

function addUser(req, res){
	if (
		req.body.username == undefined || 
		req.body.password == undefined ||
		req.body.first_name == undefined ||
		req.body.last_name == undefined ||
		req.body.gender == undefined ||
		req.body.email == undefined ||
		req.body.phone_number == undefined ||
		req.body.address == undefined
	) return res.end (JSON.stringify({error_code: 103}));

	var info = req.body;

	if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.password, {uc: true, lc: true, dg: true, sc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.first_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.last_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.gender, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.email, {uc: true, lc: true, cs:"@._", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.phone_number, {dg: true, cs: "+"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.address, {uc: true, lc: true, sp: true, cs: ",.", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));

	mysqldatabase.query ("select * from users where username = '" + info.username + "'", 
		function (result){
			if (result.error_code !== 0){res.end(JSON.stringify({"error_code": 100}));}
			else if (result.result.length > 0){res.end(JSON.stringify({"error_code": 105}));}
			else if (result.result.length == 0) {
				mysqldatabase.query ("insert into users value (null, '" + info.username + "', '" + info.password + "', '" + info.first_name + "', '" + info.last_name + "', '" + info.gender + "', '" + info.email + "', '" + info.phone_number + "', '" + info.address + "', 'standard', 'unlock')", function (result){
					if (result.error_code === 0){
						tokenmanager.create_token(info.username, function (result){
							return res.end(JSON.stringify(result));
						})
					} else return res.end(JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
		}
	);
}