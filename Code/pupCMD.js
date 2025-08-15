#!/usr/bin/env node

require("telos-use-js");

var fs = require("fs");
var universalPreprocessor = require("./UniversalPreprocessor.js");

let result = universalPreprocessor.preprocess(
	fs.readFileSync(process.argv[2], "utf-8"),
	process.argv.length > 4 ? process.argv.slice(4) : []
);

fs.writeFileSync(
	process.argv[3],
	typeof result == "string" ? result : new Uint8Array(Buffer.from(result))
);