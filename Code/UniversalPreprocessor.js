var universalPreprocessor = {
	preprocess: (text, args) => {

		args = args != null ? args : [];

		let tokens = text.split("\r").join("").split(/(\(\]|\[\>|\<\))/);
		let directives = [];

		let newText = "";

		for(let i = 0; i < tokens.length; i++) {

			if(tokens[i] == "(]") {

				directives.push(
					{
						language: tokens[i + 1].trim(),
						content: tokens[i + 3].trim(),
						index: newText.length
					}
				)

				i += 4;
			}

			else
				newText += tokens[i];
		}

		let indexShift = 0;

		for(let i = 0; i < directives.length; i++) {

			if(directives[i].language == "~")
				continue;

			let language = null;

			try {
				language = use(directives[i].language);
			}

			catch(error) {
				continue;
			}

			if(typeof language != "object")
				continue;

			if(language.process == null)
				continue;

			let index = directives[i].index + indexShift;
			let tempLength = newText.length;

			let value =
				language.process(
					directives[i].content,
					newText,
					index,
					args
				);

			if(typeof value != "object")
				continue;

			value.options = value.options != null ? value.options : { };

			if(value.options.export)
				return value;

			newText = value.options.overwrite ?
				"" + value.value :
				`${
					newText.substring(0, index)
				}${
					value.value
				}${
					newText.substring(index)
				}`;
			
			indexShift += newText.length - tempLength;
		}

		return newText;
	}
};

if(typeof module == "object")
	module.exports = universalPreprocessor;