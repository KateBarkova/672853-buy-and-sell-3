'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.flatMap(({category}) => category);
    return [...new Set(categories)];
  }
}

module.exports = CategoryService;
