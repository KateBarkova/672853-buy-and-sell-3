'use strict';

const express = require(`express`);

const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

const {HttpCode} = require(`../../constants`);
const {API_PREFIX, NOT_FOUND_MESSAGE_TEXT, DEFAULT_PORT} = require(`../serviceConstants`);

const routes = require(`../api`);

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
  .send(NOT_FOUND_MESSAGE_TEXT);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});


const createServer = (port) => {
  try {
    app.listen(port, (err) => {
      if (err) {
        logger.error(`An error occurred on server creation: ${err.message}`);
      }

      logger.info(`Listening to connections on ${port}`);
    });

  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
    process.exit(1);
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    createServer(port);
  }
};
