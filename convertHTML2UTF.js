/**
 * jQuery-Plugin "convertHTML2UTF"
 *
 * @version: 1.0, 03.03.2010
 * @author: Dilip Rajkumar
 *
 */

(function($) {
	var toUnicode = function(param){
	    var result = "";
	    for(var i = 0; i < param.length; i++){
	        var partial = param[i].charCodeAt(0).toString(16);
	        while(partial.length !== 4) partial = "0" + partial;
	        result += "\\u" + partial;
	    }
	    return result;
	};

	var subScriptArray = new Array('8320', '8321', '8322', '8323', '8324', '8325', '8326', '8327', '8328', '8329', '8330', '8331', '8332', '8333', '8334', '8336', '8337', '8338', '8339', '8341', '8342', '8343', '8344', '8345', '8346', '8347', '8348');

	var superScriptArray = new Array('8304;', '&sup1;', '&sup2;', '&sup3;', '8308', '8309', '8310', '8311', '8312', '8313', '8314', '8315', '8316', '8317', '8318', 'a', 'e', 'o', 'x', 'h', 'k', 'i', 'm', '8319', 'p', 's', 't');

	var scriptText = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', '(', ')', 'a', 'e', 'o', 'x', 'h', 'k', 'i', 'm', 'n', 'p', 's', 't');

	$.convertHTML2UTF = function(param) { 
		var refinedStr = '';
		param.split(/(<sub>.*?<\/sub>)|(<sup>.*?<\/sup>)/).map(function(val){
			if (val !== undefined) {
				if (val.indexOf('<sub>')!=-1) {
					val = $.trim(val.replace(/<\/?sub>/g,''));
					var tempValue = '';
					for (var x = 0; x < val.length; x++)
					{
					    var c = val.charAt(x);
					    tempValue = c;
						c = scriptText.indexOf(c);
						if (c != -1) {
							tempValue = '';
							c = subScriptArray[c];
							c = String.fromCharCode(c);
							tempValue = tempValue + c;
						};
					}
					refinedStr += tempValue;
				} else if (val.indexOf('<sup>')!=-1) {
					val = $.trim(val.replace(/<\/?sup>/g,''));
					var tempValue = '';
					for (var x = 0; x < val.length; x++)
					{
					    var c = val.charAt(x);
					    tempValue = c;
						c = scriptText.indexOf(c);
						if (c != -1) {
							tempValue = '';
							if (c != 1 & c != 2 & c!= 3) {
								c = superScriptArray[c];
								c = String.fromCharCode(c);
							}else{
								c = superScriptArray[c];
							};
							tempValue = tempValue + c;
						};
					}
					refinedStr += tempValue;
				}else{
					refinedStr += val;
				};
			};
		});
   		return refinedStr;	
 	}
})(jQuery);