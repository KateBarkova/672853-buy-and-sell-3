'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../serviceConstants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);

    this._offers.push(newOffer);
    return newOffer;
  }

  find(id) {
    return this._offers.find((item) => item.id === id);
  }

  drop(id) {
    const offer = this.find(id);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter((item) => item.id !== id);
    console.log(11111, id, this._offers);
    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this.find(id);
  }

  update(id, offer) {
    const oldOffer = this.find(id);

    return Object.assign(oldOffer, offer);
  }

}

module.exports = OfferService;
