var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.setUserLockingState = function (req, lockingState, res){
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