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
  SENTENCES_COUNT,
  OfferType,
  SumRestrict,
  PictureRestrict,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
} = require(`./cliConstants`);


const getPictureFileName = (number) => {
  const value = number.toString().padStart(2, `0`);
  return `item${value}.jpg`;
};

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(sentences).slice(1, SENTENCES_COUNT).join(` `),
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
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

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const data = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    writeFile(data);
  }
};
