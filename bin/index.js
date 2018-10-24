const Promise = require("bluebird");
const program = require("commander");
const ncp = Promise.promisify(require('ncp').ncp);

// Config ncp
ncp.limit = 16;


const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')

program
  .name("steengen")
  .version(VERSION, "    --version")
  .usage("<dir>")
  .parse(process.argv);

// ********************************
// ** Utilities
// ********************************
function logDone() {
  console.log('Done');
}

function handleError(error) {
  console.error(error);
}

// ********************************
// ** Main functions
// ********************************

function main() {
  const sourcePath = TEMPLATE_DIR;
  const destPath = program.args.shift() || '.'

  ncp(sourcePath, destPath)
    .then(logDone)
    .catch(handleError);
}

main();
