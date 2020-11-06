import util from "util"
import cp from "child_process";

export const delayed = fn => (cmd) => () => fn(cmd)
export const log = delayed(console.log)
export const info = delayed(console.info)
export const debug = delayed(console.debug)
export const exec = delayed(execRun)
export const execPromise = util.promisify(cp.exec);

export async function execRun(cmd) {
	const { stdout, stderr } = await execPromise(cmd, { shell: '/bin/bash' });
	if(stdout) {
		console.log(stdout);
	}
	if(stderr) {
		console.error('ERROR: ', stderr);  
	}
}

