var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");
var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.login = function (credentials, callback){
	if (credentials.username == undefined || credentials.password == undefined) callback ({error_code: 103});
	else if (validate_string(credentials.username, {lc:true, dg:true}) && validate_string(credentials.password, {uc:true, lc:true, sp:true, dg:true, sc:true})){
		mysqldatabase.query ("select * from users where username = '" + credentials.username + "' and password = '" + credentials.password + "'", 
			function (result){
				if (result.error_code !== 0 ){callback({"error_code": 100});}
				else if (result.result.length !== 1){callback({"error_code": 102});}
				else if (result.result[0].locking_state == "lock"){
					callback({error_code: 108});
				}
				else {
					tokenmanager.create_token (credentials.username, function(result){
						callback (result);
					})
				}
			})
	} else callback ({error_code: 101});
}

exports.logout = function (token, callback){
	tokenmanager.delete_token (token, function (result){
		callback(result);
	})
}

exports.user_info = function (token, res){
	tokenmanager.verify_token (token, function(response){
		if (response.error_code === 0 && response.valid === true){
			var username = response.username;
			mysqldatabase.query ("select * from users where username='" + username + "'", function (response){
				if (response.error_code === 0){
					if (response.result.length === 1){
						return res.end (JSON.stringify (response.result[0]));
					} else return res.end (JSON.stringify ({error_code: 107}));
				} else return res.end (JSON.stringify({error_code: response.error_code}));
			})
		} else return res.end (JSON.stringify ({error_code: response.error_code}));
	})
}
exports.modify_user = function (req, res){
	log (req);
	tokenmanager.verify_token (req.body.token, function(response){
		if (response.error_code === 0 && response.valid === true){
			var username = response.username;
			var info = req.body;

		if (info.password != null && validate_string(info.password, {uc: true, lc: true, dg: true, sc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.first_name != null && validate_string(info.first_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.last_name != null && validate_string(info.last_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.gender != null && validate_string(info.gender, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.email != null && validate_string(info.email, {uc: true, lc: true, cs:"@._", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.phone_number != null && validate_string(info.phone_number, {dg: true, cs: "+"}) == false) return res.end(JSON.stringify({error_code: 101}));
		if (info.address != null && validate_string(info.address, {uc: true, lc: true, sp: true, cs: ",.", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));

		mysqldatabase.query ("select * from users where username = '" + username + "'", 
			function (result){
				if (result.error_code !== 0){return res.end(JSON.stringify({"error_code": 100}));}
				else if (result.result.length != 1){return res.end(JSON.stringify({"error_code": 107}));}
				else if (result.result.length == 1) {
					var query = "update users set username='" + username + "'";
					if (info.password != null) query += ", password='" + info.password + "'";
					if (info.first_name != null) query += ", first_name='" + info.first_name + "'";
					if (info.last_name != null) query += ", last_name='" + info.last_name + "'";
					if (info.gender != null) query += ", gender='" + info.gender + "'";
					if (info.email != null) query += ", email='" + info.email + "'";
					if (info.phone_number != null) query += ", phone_number='" + info.phone_number + "'";
					if (info.address != null) query += ", address='" + info.address + "'";
					query += " where username='" + username + "'";

					mysqldatabase.query (query, function (result){
						return res.end (JSON.stringify({error_code: result.error_code}));
					});
				}
				else return res.end(JSON.stringify({error_code: 100}));
			}
		);
		} else return res.end (JSON.stringify ({error_code: response.error_code}));
	})	

}