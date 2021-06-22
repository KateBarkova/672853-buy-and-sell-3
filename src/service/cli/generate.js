'use strict';

const {writeFile} = require(`../../utils`);
const {generateOffers, readFiles, getCountOffer} = require(`./generateDataUtils`);

const {FILE_NAME} = require(`../serviceConstants`);


module.exports = {
  name: `--generate`,
  async run(args) {
    const contentData = await readFiles();
    const countOffer = getCountOffer(args);
    const data = JSON.stringify(generateOffers(countOffer, contentData));
    writeFile(FILE_NAME, data);
  }
};
