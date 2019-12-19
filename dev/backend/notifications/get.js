var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
	
exports.get = function (req, username, res){
	var d = new Date();
	var end_time = d.toISOString().slice(0, 19).replace('T', ' '); //now
	d.setDate(d.getDate() - 2);
	var start_time = d.toISOString().slice(0, 19).replace('T', ' ');
	var limit = 100;
	if (req.body.start_time != null && req.body.end_time != null){
		try{
			start_time = new Date (req.body.start_time).toISOString().slice(0, 19).replace('T', ' ');
			end_time = new Date (req.body.end_time).toISOString().slice(0, 19).replace('T', ' ');
		} catch(err){
			log ("Can't parse date " + start_time + " or " + end_time + " with error " + err);
			return res.end(JSON.stringify({error_code: 101}));
		}
	}
	if (req.body.limit != null && validate_string(req.body.limit, {dg: true}) == true)
		limit = Number(req.body.limit);

	mysqldatabase.query("select * from notifications where for_user='" + username + "' and time > '" + start_time + "' and time < '" + end_time + "' limit " + limit, function (response){
		if (response.error_code != 0){return res.end(JSON.stringify({error_code: 300}));}
		else{
			var json = {error_code: 0};
			json['number_of_notifications'] = response.result.length;
			for (var i = 0; i < response.result.length; ++i){
				json['notification_' + i] = response.result[i];
			}
			return res.end(JSON.stringify(json));
		}
		return res.end (JSON.stringify({error_code: 1}));
	})
}