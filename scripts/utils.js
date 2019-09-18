const child_process = require('child_process');
const logger = require('./logger');

const spawnSync = child_process.spawnSync;

function eject(msg, code = 1) {
  logger.error(msg, '\n');
  process.exit(code);
}

function execute(cmd, withLog) {
  const config = withLog
    ? {
        stdio: 'inherit',
      }
    : undefined;
  const cmdArr = cmd.split(/\s+/);
  return spawnSync(cmdArr[0], cmdArr.slice(1), config);
}

module.exports = { eject, execute };
