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

The code within the directive operates as a function that receives three arguments, which are
unnamed by default, the first being the current contents of the text file with all preprocessor
directives removed, the second being the index of the directive within said cropped text, and the
third being an array of miscellaneous string arguments that were passed in by the environment.

Anything written to stdout (that is, anything that would normally be printed to the console),
will be injected where the directive is placed. However, if the code, executing as a function,
returns a string, said string will overwrite the text file entirely.

The language used within a preprocessor directive shall be defined by referencing a plugin capable
of processing it.

Furthermore, the code for a directive, in addition to returning a string, may also return a byte
array, which can allow the Universal Preprocessor to function as a compiler by saving said byte
array as a compiled program.

### 2.2 - Format

### 2.2.1 - Preprocessor Directive Structure

    (] universal-preprocessor/langJS [> // JS Code <)

### 2.2.2 - Comments

Any directive where the declared language is unrecognized may function as a comment. The
recommended language declaration string for a comment is a tilde, shown as follows:

    (] ~ [> This is a comment. <)

Thus, the universal preprocessor may function as a language agnostic commenting system.

### 2.3 - Examples

#### 2.3.1 - Example 1

The following code:

    Hello
    (] universal-preprocessor/langJS [>

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
    (] universal-preprocessor/langJS [> console.log("INDEX:", arguments[1]); <)
    World

Will be preprocessed to:

    Hello
    INDEX: 6
    World

#### 2.3.3 - Example 3

The following code:

    Hello
    (] universal-preprocessor/langJS [> return arguments[0].split("o").join("0"); <)
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
    (] universal-preprocessor/langJS [>

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

A plugin for the implementation of the Universal Preprocessor provided herein shall be implemented
as a CommonJS module, which shall export an object containing a "process" function.

The process function shall be invoked when processing a directive to which its module applies, and
shall take four arguments. The first argument shall be a string containing the code of the
directive's body, and the latter three arguments shall be, in order, the arguments to be passed to
said code.

The process function shall return an object containing a "value" field, along with an optional
"options" field. The value field shall contain the string output of the executed code to inject
into or overwrite onto the code from which the directive was sourced, or a number array to export
as binary. The options field, if present, shall contain boolean flags. An "overwrite" field in the
options object, set to true, indicates that the string in the value field is to overwrite the
source code rather than be injected into it. An "export" field in the options object, set to true,
indicates that the value field is to be exported as is as the result of the process, and should be
used when the value field is an array.

#### 2.4.2 - Arguments

Any argument added to the command line invocation of the universal preprocessor beyond those
previously discussed shall be passed to directives for miscellaneous usage, as shown in this
example:

    npx universal-preprocessor demo.txt output.txt arg1 arg2