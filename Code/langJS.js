var langJS = {
	process: (directive, text, index, args) => {

		var tempWrite = console.log;

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				log += (i > 0 ? " " : "") + arguments[i];
		}

		var log = "";

		try {

			var value = null;

			eval(
				"let tempFunc=function(text, index, args){" +
				directive +
				"};value=tempFunc(text, index, args);"
			);
			
			console.log = tempWrite;

			if(Array.isArray(value))
				return { value: value, options: { export: true } };
		
			return value != null ?
				{ value: value, options: { overwrite: true } } :
				{ value: log };
		}

		catch(error) {
			
			console.log = tempWrite;
		
			return null;
		}
	}
}

if(typeof module == "object")
	module.exports = langJS;