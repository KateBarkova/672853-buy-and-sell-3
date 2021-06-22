'use strict';

const {nanoid} = require(`nanoid`);

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;
const {getRandomInt, shuffle} = require(`../../utils`);
const {readContent} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  SENTENCES_COUNT,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  OfferType,
  SumRestrict,
  PictureRestrict,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
} = require(`../serviceConstants`);

const generateOffers = (count, data) => {
  const {titles, categories, sentences, comments, userCount, categoryCount} = data;
  return Array(count).fill({}).map((_, index) => {
    const fields = userCount ? {
      userId: getRandomInt(1, userCount),
      category: [getRandomInt(1, categoryCount)],
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments, index + 1, userCount),
    } : {
      id: nanoid(MAX_ID_LENGTH),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
      category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
    };
    return {
      ...fields,
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      description: shuffle(sentences).slice(1, SENTENCES_COUNT).join(` `),
      type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};

const generateComments = (count, comments, offerId, userCount) =>
  (Array(count).fill({}).map(() => {
    const data = userCount ? {
      userId: getRandomInt(1, userCount),
      offerId,
    } : {
      id: nanoid(MAX_ID_LENGTH),
    };
    return {...data, text: getComment(comments)};
  }));

const getComment = (comments) => shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `);

const readFiles = async () => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);
  return {titles, categories, sentences, comments};
};

const getCountOffer = (args) => {
  const [count] = args;
  return Number.parseInt(count, 10) || DEFAULT_COUNT;
};

module.exports = {
  getPictureFileName,
  generateOffers,
  readFiles,
  getCountOffer
};
