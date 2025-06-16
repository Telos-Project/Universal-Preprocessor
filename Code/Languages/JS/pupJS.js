module.exports = {
	match: (language, text) => {

		return language.trim().toLowerCase() == "js" ||
			language.trim().toLowerCase() == "javascript";
	},
	process: (args, directive, text, index) => {

		var tempWrite = console.log;

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				alpha += (i > 0 ? " " : "") + arguments[i];
		}

		var alpha = text.substring(0, index);
		var beta = text.substring(index);

		try {

			var value = null;

			eval(
				"let tempFunc=function(text, index, args){" +
				directive +
				"};value=tempFunc(text, index, arguments);"
			);
			
			console.log = tempWrite;

			if(Array.isArray(value))
				return value;
		
			return value != null ? "" + value : alpha + beta;
		}

		catch(error) {
			
			console.log = tempWrite;
		
			return text;
		}
	}
};