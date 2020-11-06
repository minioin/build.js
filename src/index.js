import path from "path";

import {config} from "./config.js";
import {log, info, debug, delayed, exec} from "./util.js";
import {task, run, main} from "./run.js";

export default {
	main,
	config,
	task,
	log,
	info,
	debug,
	delayed,
	exec,
}
