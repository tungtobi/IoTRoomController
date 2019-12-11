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

exports.register = function (info, callback){
	if (info.username == undefined || info.password == undefined) callback ({error_code: 103});
	else if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false || validate_string(info.password, {uc: true, lc: true, dg: true, sc: true, sp: true}) == false) callback({error_code: 101});
	else {
		mysqldatabase.query ("select * from users where username = '" + info.username + "' and password = '" + info.password + "'", 
			function (result){
				if (result.error_code !== 0){callback({"error_code": 100});}
				else if (result.result.length > 0){callback({"error_code": 105});}
				else {
					mysqldatabase.query ("insert into users value (null, '" + info.username + "', '" + info.password + "')", function (result){
						if (result.error_code === 0){
							tokenmanager.create_token(info.username, function (result){
								callback(result);
							})
						} else callback({error_code: result.error_code});
					});
				}
			}
		);
	}
}