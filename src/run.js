import {execRun} from "./util.js"

let tasks = {}
export const task = (name, cmd) => tasks[name] = cmd

export async function main() {
	const [node, scriptPath, task, ...rest] = process.argv;
	console.log(process.argv)
	try{
		let cmd = tasks[task] || tasks['*'] || help;
		return run({task, cmd, rest})
	} catch(e) {
		console.error(e);
	}
}

export async function run({task, cmd, rest, wrapper = execRun}) {
	if(typeof cmd === 'string') {
		return tasks[cmd] ? run({task, cmd: tasks[cmd], rest, wrapper}) : wrapper(cmd)
	} else if(typeof cmd === 'function') {
		let result = await cmd({task, cmd, rest});
		return run({task, cmd: result, rest, wrapper})
	} else if(Array.isArray(cmd)) {
		for (let c of cmd) {
			await run({task, cmd: c, rest, wrapper})
		}
	}
}

