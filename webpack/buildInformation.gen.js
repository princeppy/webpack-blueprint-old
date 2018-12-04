// note: based on samples from https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function captureBuildInformation() {
  const { stdout, stderr } = await exec('git rev-parse HEAD');

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

  const compiledAt = new Date().toISOString();
  const commitSha = stdout.replace('\n', '');
  return {
    code: `
export const compiledAt = '${compiledAt}'; 
export const commit = '${commitSha}';
`
  };
}

module.exports = captureBuildInformation;
