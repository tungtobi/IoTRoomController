var redisdatabase = require (_LIB_PATH_ + "/redisdatabase");
exports.get_data = function(req, res){
	redisdatabase.json_get ("dht11", function (response){
		log (response);
		if (response.error_code === 0)
			return res.end (JSON.stringify ({error_code: 0, "result": JSON.parse(response.result)}));
		else return res.end (JSON.stringify ({error_code: response.error_code}));
	})
}