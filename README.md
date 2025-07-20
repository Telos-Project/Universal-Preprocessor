# The Universal Preprocessor

## 1 - Abstract

***Syntax is Optional.***

The universal preprocessor, or PUP, is a modular, language-agnostic text preprocessing and
templating system.

The essential method by which the Universal Preprocessor operates is inspired by PHP, but the major
difference is that the tags, or in universal preprocessor terms, directives, may contain code in
any language, may be embedded in any other language, and may overwrite surrounding code instead of
merely printing into it.

The universal preprocessor then simultaneously fulfils the functionality of PHP, but expands it to
any language, and functionally supports the full syntax overwriting of Racket.

## 2 - Contents

### 2.1 - How it Works

When the preprocessor is executed, the code within the directives will execute in the order that
the directives are placed.

The code within the directive operates as a function that recieves three arguments, which are
unnamed by default, the first being the current contents of the text file with all preprocessor
directives removed, the second being the index of the directive within said cropped text, and the
third being an array of miscellanous string arguments that were passed in by the environment.

Anything written to stdout (that is, anything that would normally be printed to the console),
will be injected where the directive is placed. However, if the code, executing as a function,
returns a string, said string will overwrite the text file entirely.

The language used within a preprocessor directive may either be explicity declared or implicitly
detected.

Furthermore, the code for a directive, in addition to returning a string, may also return a byte
array, which can allow the Universal Preprocessor to function as a compiler by saving said byte
array as a compiled program.

### 2.2 - Format

### 2.2.1 - Preprocessor Directive Structure

Explicit Language Declaration:

    (] JS [> // JS Code <)

Implicit Language Detection:

    (> // JS Code, thus the language will be detected as JS <)

### 2.2.2 - Comments

Any directive using explicit language declaration where the declared language is unrecognized may
function as a comment. The recommended language declaration string for a comment is a tilde, shown
as follows:

    (] ~ [> This is a comment. <)

Thus, the universal preprocessor may function as a language agnostic commenting system.

### 2.3 - Examples

#### 2.3.1 - Example 1

The following code:

    Hello
    (] JS [>

    	for(let i = 0; i < 10; i++)
    		console.log("ABC:", i, "\n");
    <)
    World

Will be preprocessed to:

    Hello
    ABC: 0
    ABC: 1
    ABC: 2
    ABC: 3
    ABC: 4
    ABC: 5
    ABC: 6
    ABC: 7
    ABC: 8
    ABC: 9
    
    World

#### 2.3.2 - Example 2

The following code:

    Hello
    (] JS [> console.log("INDEX:", arguments[1]); <)
    World

Will be preprocessed to:

    Hello
    INDEX: 6
    World

#### 2.3.3 - Example 3

The following code:

    Hello
    (] JS [> return arguments[0].split("o").join("0"); <)
    World

Will be preprocessed to:

    Hell0
	
    W0rld

### 2.4 - Usage

An implementation of the Universal Preprocessor is available on npm under the package
"universal-preprocessor".

Said package may be used as a command via npx, using the following format:

    npx universal-preprocessor [source_file] [target_file]

For example, if one had in a directory a file named "demo.txt", with the following content:

    Hello
    (] JS [>

    	for(let i = 0; i < 10; i++)
    		console.log("ABC:", i, "\n");
    <)
    World

And ran the following command in said directory:

    npx universal-preprocessor demo.txt output.txt

Then a file named "output.txt" would appear in the same directory:

    Hello
    ABC: 0
    ABC: 1
    ABC: 2
    ABC: 3
    ABC: 4
    ABC: 5
    ABC: 6
    ABC: 7
    ABC: 8
    ABC: 9
    
    World

#### 2.4.1 - Extension

Currently, this implementation of the universal preprocessor only supports JavaScript as a
directive language.

This functionality may be expanded upon by adding a third command line argument specifying the
alias or URL of a CommonJS module which exports a list of directive objects.

Directive objects have a match function and a process function.

The match function takes two string arguments, the first being the language specified in a
directive and the second being the text body of the same directive, and returns true if the
directive object corresponds to the language of said directive.

The process function takes a string array argument, followed by two string arguments, followed by a
numerical argument. The string array specifies miscellaneous command arguments passed to the
universal preprocessor. The first string argument specifies the text body of a directive. The
second string argument specifies the text in which said directive is embedded, and the numerical
argument specifies the character index at which said directive appears in said text. The process
function returns a string or numerical array representing the resulting text following the
execution of said directive.

#### 2.4.2 - Arguments

Any argument added to the command line invocation of the univeral preprocessor beyond those
previously discussed shall be passed to directives for miscellaneous usage. If one wishes to employ
such arguments without loading additional directive objects, specify the directive module alias as
"null", as shown in this example:

    npx universal-preprocessor demo.txt output.txt null arg1 arg2