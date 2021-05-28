/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `4zTBRX`,
    "title": `Куплю антиквариат`,
    "picture": `item11.jpg`,
    "description": `Пользовались бережно и только по большим праздникам. Товар в отличном состоянии. Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города.`,
    "type": `sale`,
    "sum": 2961,
    "category": [`Книги`, `Разное`, `Посуда`, `Игры`],
    "comments": [
      {
        "id": `GIFZka`,
        "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`
      },
      {
        "id": `Z-rd7u`,
        "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`
      },
      {
        "id": `hVUBHA`,
        "text": `А сколько игр в комплекте? Совсем немного... С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `Ckib22`,
        "text": `А сколько игр в комплекте? Совсем немного... Почему в таком ужасном состоянии?`}]
  },
  {
    "id": `nvwUZ4`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "picture": `item08.jpg`,
    "description": `Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Таких предложений больше нет! Если товар не понравится — верну всё до последней копейки.`,
    "type": `sale`,
    "sum": 79017,
    "category": [`Животные`, `Книги`],
    "comments": [
      {
        "id": `8HL2Tf`,
        "text": `Неплохо, но дорого.`
      },
      {
        "id": `olx3Fh`,
        "text": `Неплохо, но дорого. Почему в таком ужасном состоянии? А сколько игр в комплекте?`
      },
      {
        "id": `Onx-y5`,
        "text": `Вы что?! В магазине дешевле. Совсем немного...`}]
  },
  {
    "id": `8OJWau`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "picture": `item01.jpg`,
    "description": `Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Даю недельную гарантию.`,
    "type": `sale`,
    "sum": 97324,
    "category": [`Животные`, `Посуда`, `Игры`, `Разное`],
    "comments": [
      {
        "id": `yEmooM`,
        "text": `Вы что?! В магазине дешевле.`}]
  },
  {
    "id": `cb9fOs`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "picture": `item12.jpg`,
    "description": `Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!`,
    "type": `sale`,
    "sum": 22663,
    "category": [`Книги`, `Животные`, `Посуда`],
    "comments": [
      {
        "id": `S-P81x`,
        "text": `Совсем немного... Неплохо, но дорого. С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `FVXnIc`,
        "text": `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле.`
      },
      {
        "id": `BNlBY7`,
        "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? А сколько игр в комплекте?`
      },
      {
        "id": `vWruYt`,
        "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?`}]
  },
  {
    "id": `l6WLss`,
    "title": `Куплю антиквариат`,
    "picture": `item15.jpg`,
    "description": `Продаю с болью в сердце... Даю недельную гарантию. Бонусом отдам все аксессуары. Это настоящая находка для коллекционера!`,
    "type": `sale`,
    "sum": 76232,
    "category": [`Книги`, `Животные`],
    "comments": [
      {
        "id": `0XNQtC`,
        "text": `А где блок питания? Неплохо, но дорого.`
      },
      {
        "id": `UeICRl`,
        "text": `Почему в таком ужасном состоянии? А сколько игр в комплекте?`}]}
];

const newOffer = {
  category: `Котики`,
  title: `Дам погладить котика`,
  description: `Дам погладить котика. Дорого. Не гербалайф`,
  picture: `cat.jpg`,
  type: `OFFER`,
  sum: 100500
};

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "4zTBRX"`, () => expect(response.body[0].id).toBe(`4zTBRX`));

});

describe(`API returns an offer with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/4zTBRX`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю антиквариат"`, () => expect(response.body.title).toBe(`Куплю антиквариат`));

});

describe(`API creates an offer if data is valid`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});


describe(`API refuses to create an offer if data is invalid`, () => {

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});


describe(`API changes existent offer`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/4zTBRX`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/4zTBRX`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});


test(`API returns status code 404 when trying to change non-existent offer`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/4zTBRX`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/4zTBRX`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`4zTBRX`));

  test(`Offer count is 4 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/offers/4zTBRX/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
