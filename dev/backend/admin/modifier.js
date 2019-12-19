var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
exports.modifyUser = function(req, res){
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
	if (info.role != null && (validate_string(info.role, {lc: true}) == false || (info.role != "standard" && info.role != "admin"))) return res.end(JSON.stringify({error_code: 101}));

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
				if (info.role != null) query += ", role='" + info.role + "'";
				query += " where username='" + info.username + "'";

				mysqldatabase.query (query, function (result){
					return res.end (JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
		}
	);
}