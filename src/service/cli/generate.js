'use strict';

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  ExitCode
} = require(`../../constants`);

const fs = require(`fs`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict,
} = require(`./cliConstants`);


const getPictureFileName = (number) => {
  let value = number < 10 ? `0${number}` : number;
  return `item${value}.jpg, `;
};
const getCategories = () => {
  const categoryCount = getRandomInt(0, CATEGORIES.length - 1);
  const categories = [];
  for (let i = 0; i < categoryCount - 1; i++) {
    categories.push(CATEGORIES[getRandomInt(1, CATEGORIES.length - 1)]);
  }

  return categories;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: getCategories(),
  }));

};

const writeFile = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      console.error(`Can't write data to file...`);
      process.exit(ExitCode.error);
    }

    return console.info(`Operation success. File created.`);
  });
};

const generateMockData = (args) => {
  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
  return JSON.stringify(generateOffers(countOffer));

};

module.exports = {
  name: `--generate`,
  run(args) {
    const data = generateMockData(args);
    writeFile(data);
  }
};
