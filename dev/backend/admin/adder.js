var mysqldatabase = require (_LIB_PATH_ + "/mysqldatabase");
var tokenmanager = require (_AUTH_PATH_ + "/tokenmanager");
exports.addUser = function(req, res){
	if (
		req.body.username == undefined || 
		req.body.password == undefined ||
		req.body.first_name == undefined ||
		req.body.last_name == undefined ||
		req.body.gender == undefined ||
		req.body.email == undefined ||
		req.body.phone_number == undefined ||
		req.body.address == undefined || 
		req.body.role == undefined
	) return res.end (JSON.stringify({error_code: 103}));

	var info = req.body;

	if (validate_string (info.username, {lc: true, dg:true, cs:"_"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.password, {uc: true, lc: true, dg: true, sc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.first_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.last_name, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.gender, {uc: true, lc: true, sp: true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.email, {uc: true, lc: true, cs:"@._", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.phone_number, {dg: true, cs: "+"}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.address, {uc: true, lc: true, sp: true, cs: ",.", dg:true}) == false) return res.end(JSON.stringify({error_code: 101}));
	if (validate_string(info.role, {lc: true}) == false) return res.end(JSON.stringify({error_code: 101}));

	mysqldatabase.query ("select * from users where username = '" + info.username + "'", 
		function (result){
			if (result.error_code !== 0){res.end(JSON.stringify({"error_code": 100}));}
			else if (result.result.length > 0){res.end(JSON.stringify({"error_code": 105}));}
			else if (result.result.length == 0) {
				mysqldatabase.query ("insert into users value (null, '" + info.username + "', '" + info.password + "', '" + info.first_name + "', '" + info.last_name + "', '" + info.gender + "', '" + info.email + "', '" + info.phone_number + "', '" + info.address + "', '" + info.role +"', 'unlock')", function (result){
					if (result.error_code === 0){
						tokenmanager.create_token(info.username, function (result){
							return res.end(JSON.stringify(result));
						})
					} else return res.end(JSON.stringify({error_code: result.error_code}));
				});
			}
			else return res.end(JSON.stringify({error_code: 100}));
		}
	);
}