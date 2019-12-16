var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
function get_role (username, callback){
	var query = "select * from users where username='" + username + "'";
	mysqldatabase.query (query, function (response){
		if (response.error_code === 0 && response.result.length === 1){
			return callback({error_code: 0, role: response.result[0].role});
		} else return callback ({error_code: 100});
	})
}
function verify_token(token, callback){
		if (token.length > 0 && validate_string (token, {uc:true, lc:true, dg:true})){
			mysqldatabase.query ("select * from tokens where token = '" + token + "' and created_time > NOW() - INTERVAL 30 DAY", function (result){
				if (result.error_code === 0)
				{
					if (result.result.length === 1){
						get_role (result.result[0].username, function (response){
							if (response.error_code === 0)
								return callback({"error_code": 0, "valid": true, "username": result.result[0].username, "role": response.role});
							else return callback({"error_code": response.error_code});
						});
					} else {return callback({"error_code": 104, "valid": false});}
				} else {return callback({"error_code": 104, "valid": false});}
			});
		} 
		else return callback({"error_code": 104, "valid": false});
}
exports.verify_token = verify_token;
exports.create_token = function (username, callback){
	var new_token = generate_string (128, {uc:true, lc:true, dg:true});
	mysqldatabase.query ("insert into tokens value ('" + new_token + "', '" + username + "', null)", function (result){
		if (result.error_code === 0){
			callback ({"error_code": 0, "token": new_token});
		}
		else callback({"error_code": 100});
	});
}

exports.delete_token = function (token, callback){
	verify_token (token, function(result){
		if (result.valid === true){
			mysqldatabase.query("delete from tokens where token = '" + token + "'", function (result){
				if (result.error_code !== 0) {callback({"error_code": 100});}
				else {callback({"error_code": 0});}
			});
		} else {callback({"error_code": 104});}
	});
}