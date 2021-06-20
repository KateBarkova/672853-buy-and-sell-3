
'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

const OFFERS_COUNT_FOR_COMMENTS_PAGE = 3;

const {getAPI} = require(`../api`);
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`my-tickets`, {offers});
});

myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`comments`, {offers: offers.slice(0, OFFERS_COUNT_FOR_COMMENTS_PAGE)});
});
module.exports = myRouter;
