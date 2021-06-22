
'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode} = require(`../constants`);

module.exports.writeFile = async (filename, content) => {
  try {
    await fs.writeFile(filename, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(ExitCode.error);
  }
};
