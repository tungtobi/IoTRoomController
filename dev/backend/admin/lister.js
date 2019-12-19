var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.listUser = function(res){
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