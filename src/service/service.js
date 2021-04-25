'use strict';

const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

if (userCommand === `--generate` && parseInt(userArguments.slice(1), 10) > 1000) {
  console.log(`Не больше 1000 объявлений`);
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));
