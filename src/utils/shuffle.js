'use strict';

module.exports.shuffle = (someArray) => {
  return someArray.sort(() => Math.random() - 0.5);
};
