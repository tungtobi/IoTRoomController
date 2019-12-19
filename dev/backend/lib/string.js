global.generate_string = function(length, conditions) {
   var result           = '';
   var characters       = '';
   if (conditions.uc != undefined) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   if (conditions.lc === true) characters += "abcdefghijklmnopqrstuvwxyz";
   if (conditions.dg === true) characters += "0123456789";
   if (conditions.sp === true) characters += " ";
   if (conditions.sc === true) characters += "!@#$%^&*()";

   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
   		result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

global.validate_string = function(s, conditions){ //uppercase, lowercase, digit, space, specialcharacter
	var valid = true;
	for (var i = 0; i < s.length; ++i){
		var cvalid = false;
		if (conditions.uc === true && (s.charCodeAt(i) >= 65 && s.charCodeAt(i) <= 90)) cvalid = true;
		if (conditions.lc === true && (s.charCodeAt(i) >= 97 && s.charCodeAt(i) <= 122)) cvalid = true;
		if (conditions.dg === true && (s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57)) cvalid = true;
		if (conditions.sp === true && s.charCodeAt(i) === 32) cvalid = true;
		if (conditions.sc === true && (s.charCodeAt(i) >= 33 && s.charCodeAt(i) <= 47)) cvalid = true;
		if (conditions.cs != undefined){
			for (var j = 0; j < conditions.cs.length; ++j)
				if (s.charCodeAt(i) === conditions.cs.charCodeAt (j)) cvalid = true;
		}
		
		if (cvalid === false){
			log ("==== vaildatation failed: " + s);
			return false;
		}
	}
	return true;
}