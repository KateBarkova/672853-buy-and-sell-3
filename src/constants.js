'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_COUNT = 1000;

const ExitCode = {
  error: 1,
  success: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_COUNT,
  ExitCode
};

