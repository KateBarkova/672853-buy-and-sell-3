'use strict';

const fs = require(`fs`).promises;
const MOCKS_SOURCE = `mocks.json`;
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(MOCKS_SOURCE);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
