var mysql = require('mysql');
exports.query = function(sql, callback){
	var con = mysql.createConnection({
	  host: "localhost",
	  user: "apprunner",
	  password: "apprunner",
	  database: "app"
	});
	con.connect(function(err) {
	  if (err) {log.log (err); callback({"err_code": err});}

	  con.query(sql, function (err, result) {
	  	log ("MySQL query: " + sql);
	  	log (result);
	  	log ("");
	    if (err) callback({'error_code': err});
	    else callback({"error_code": 0, "result": result});
	  });
	  con.end();
	}); 
}