var universalPreprocessor = {
	preprocess: (languages, text, args) => {

		args = args != null ? args : [];

		let tokens = text.split("\r").join("").split(/(\(\]|\(\>|\[\>|\<\))/);
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

			else if(tokens[i] == "(>") {

				directives.push(
					{
						language: "*",
						content: tokens[i + 1].trim(),
						index: newText.length
					}
				)

				i += 2;
			}

			else
				newText += tokens[i];
		}

		let indexShift = 0;

		for(let i = 0; i < directives.length; i++) {

			let language = languages.filter(item =>
				item.match(directives[i].language, directives[i].content)
			)[0];

			if(language == null)
				continue;

			let tempLength = newText.length;

			newText =
				language.process(
					args,
					directives[i].content,
					newText,
					directives[i].index + indexShift
				);

			if(Array.isArray(newText))
				return newText;
			
			indexShift += newText.length - tempLength;
		}

		return newText;
	}
};

if(typeof module == "object")
	module.exports = universalPreprocessor;