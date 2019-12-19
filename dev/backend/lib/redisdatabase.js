exports.json_get = function (key, callback){
	var Redis = require("iorejson");
	var redis = new Redis({password: '13111999'});

	redis.get(key, function(err, result) {
	  log (err + " " + result);
	  if (err == null){
	  	callback ({error_code: 0, "result": result});
	  } else callback({error_code: 301, "err": err});
	});
}