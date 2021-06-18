'use strict';

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;

const FILL_DB_SQL = `fill-db.sql`;

const DEFAULT_PORT = 3000;


const API_PREFIX = `/api`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const MAX_ID_LENGTH = 6;

const SENTENCES_COUNT = 5;
const MAX_COMMENTS = 4;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const NOT_FOUND_MESSAGE_TEXT = `Not found`;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  FILL_DB_SQL,
  SENTENCES_COUNT,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  OfferType,
  SumRestrict,
  PictureRestrict,
  API_PREFIX,
  DEFAULT_PORT,
  NOT_FOUND_MESSAGE_TEXT
};
