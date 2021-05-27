'use strict';

const chalk = require(`chalk`);
const express = require(`express`);

const {HttpCode} = require(`../../constants`);
const {API_PREFIX, NOT_FOUND_MESSAGE_TEXT, DEFAULT_PORT} = require(`../serviceConstants`);

const routes = require(`../api`);

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(NOT_FOUND_MESSAGE_TEXT));

const createServer = (port) => {
  app.listen(port, (err) => {
    if (err) {
      console.error(chalk.red(`Ошибка при создании сервера`), err);
    } else {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    }
  });
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    createServer(port);
  }
};
