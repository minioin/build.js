#!/bin/sh 
":" //# comment; exec /usr/bin/env node --noharmony --experimental-modules  "$0" "$@"

import util from "util";
import vm from "vm";
import fs from "fs";

import buildjs from "../src/index.js"

const context = {
	buildjs,
	env: process.env
}

try {
	const code = fs.readFileSync("build.js", { encoding: 'utf8' });
	const script = new vm.Script(code); 
	vm.createContext(context); 
	script.runInContext(context); 
	await buildjs.main()
} catch(e) {
	console.log(e.message)
}



