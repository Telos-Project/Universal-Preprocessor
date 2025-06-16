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

The code within the directive operates as a function that recieves two unnamed arguments, the first
being the current contents of the text file with all preprocessor directives removed, and the
second being the index of the directive within said cropped text.

Anything written to stdout (that is, anything that would normally be printed to the console),
will be injected where the directive is placed. However, if the code, executing as a function,
returns a string, said string will overwrite the text file entirely.

The language used within a preprocessor directive may either be explicity declared or implicitly
detected.

Furthermore, the code for a directive, in addition to returning a string, may also return a byte
array, which can allow the Universal Preprocessor to function as a compiler by saving said byte
array as a compiled program.

### 2.2 - Preprocessor Directive Structure

Explicit Language Declaration:

    (] JS [> # JS Code <)

Implicit Language Detection:

    (> # JS Code, thus the language will be detected as JS <)

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