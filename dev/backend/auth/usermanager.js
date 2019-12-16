var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");
var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.login = function (credentials, callback){
	if (credentials.username == undefined || credentials.password == undefined) callback ({error_code: 103});
	else if (validate_string(credentials.username, {lc:true, dg:true}) && validate_string(credentials.password, {uc:true, lc:true, sp:true, dg:true, sc:true})){
		mysqldatabase.query ("select * from users where username = '" + credentials.username + "' and password = '" + credentials.password + "'", 
			function (result){
				if (result.error_code !== 0 ){callback({"error_code": 100});}
				else if (result.result.length !== 1){callback({"error_code": 102});}
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
