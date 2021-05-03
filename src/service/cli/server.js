'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const MOCKS_SOURCE = `mocks.json`;
const notFoundMessageText = `Not found`;

const getTemplate = (message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  return template;
};

const sendResponse = (res, statusCode, template, type = `text/html; charset=UTF-8`) => {
  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': type,
  });

  res.end(template);
};

const prepareData = async () => {
  const fileContent = await fs.readFile(MOCKS_SOURCE);
  const mocks = JSON.parse(fileContent);
  const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
  return getTemplate(`<ul>${message}</ul>`);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const template = await prepareData();
        sendResponse(res, HttpCode.OK, template);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, getTemplate(notFoundMessageText));
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, getTemplate(notFoundMessageText));
      break;
  }
};

const createServer = (port) => {
  http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
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
