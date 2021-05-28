'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.map(({category}) => category).flat();
    return [...new Set(categories)];
  }
}

module.exports = CategoryService;
