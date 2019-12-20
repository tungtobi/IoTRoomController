
var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.markasread = function (req, username, res){
	var d = new Date();
	var time = d.toISOString().slice(0, 19).replace('T', ' '); //now
	if (req.body.time != null){
		try{
			time = new Date (req.body.time).toISOString().slice(0, 19).replace('T', ' ');
		} catch(err){
			log ("Can't parse date " + time + " with error " + err);
			return res.end(JSON.stringify({error_code: 101}));
		}
	}

	mysqldatabase.query("update notifications set seen='true' where for_user='" + username + "' and time < '" + time + "'", function (response){
		return res.end (JSON.stringify({error_code: response.error_code}));
	})
}
