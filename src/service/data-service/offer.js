'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../serviceConstants`);

class OfferService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer) {
    const newOffer = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...offer
    };

    this._offers = [
      ...this._offers,
      newOffer
    ];
    return newOffer;
  }

  find(offerId) {
    return this._offers.find(({id}) => id === offerId);
  }

  drop(offerId) {
    const offer = this.find(offerId);

    if (!offer) {
      return null;
    }

    this._offers = this._offers.filter(({id}) => id !== offerId);
    return offer;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this.find(id);
  }

  update(id, newOffer) {
    this._offers = this._offers.map((offer) => offer.id === id ? {
      ...offer,
      ...newOffer,
    } : offer);

    const offer = this.find(id);

    return offer;
  }

}

module.exports = OfferService;
