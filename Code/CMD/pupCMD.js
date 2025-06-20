#!/usr/bin/env node

require("telos-use-js");

var fs = require("fs");
var universalPreprocessor = require("./UniversalPreprocessor.js");

let langs = require("./pupLangs.js");

if(process.argv[4] != null && process.argv[4] != "null")
	langs = use(process.argv[4]);

let result = universalPreprocessor.preprocess(
	langs,
	fs.readFileSync(process.argv[2], "utf-8"),
	process.argv.length > 5 ? process.argv.slice(5) : []
);

fs.writeFileSync(
	process.argv[3],
	typeof result == "string" ? result : new Uint8Array(Buffer.from(result))
);