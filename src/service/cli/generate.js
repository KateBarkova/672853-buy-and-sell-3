'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {
  ExitCode
} = require(`../../constants`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  SENTENCES,
  SENTENCES_COUNT,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict,
} = require(`./cliConstants`);


const getPictureFileName = (number) => {
  const value = number.toString().padStart(2, `0`);
  return `item${value}.jpg`;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(SENTENCES).slice(1, SENTENCES_COUNT).join(` `),
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
  }));

};

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(ExitCode.error);
  }
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
