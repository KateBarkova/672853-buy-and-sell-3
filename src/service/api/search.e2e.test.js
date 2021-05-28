/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `FBjqp4`,
    "title": `Куплю антиквариат`,
    "picture": `item15.jpg`,
    "description": `Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Таких предложений больше нет! Пользовались бережно и только по большим праздникам.`,
    "type": `offer`,
    "sum": 37266,
    "category": [`Игры`, `Посуда`, `Разное`],
    "comments": [
      {
        "id": `w9DZQp`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
    ]
  },
  {
    "id": `to4CZo`,
    "title": `Куплю антиквариат`,
    "picture": `item01.jpg`,
    "description": `Таких предложений больше нет! Даю недельную гарантию. Если товар не понравится — верну всё до последней копейки. Бонусом отдам все аксессуары.`,
    "type": `sale`,
    "sum": 36868,
    "category": [`Животные`, `Посуда`, `Игры`, `Разное`],
    "comments": [
      {
        "id": `guY_M6`,
        "text": `Оплата наличными или перевод на карту?`},
      {
        "id": `-vkxKN`,
        "text": `А где блок питания? А сколько игр в комплекте? Почему в таком ужасном состоянии?`},
      {
        "id": `aXMNRO`,
        "text": `Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `ndmxtm`,
    "title": `Куплю антиквариат`,
    "picture": `item10.jpg`,
    "description": `Это настоящая находка для коллекционера! Таких предложений больше нет! Продаю с болью в сердце... Даю недельную гарантию.`,
    "type": `sale`,
    "sum": 96550,
    "category": [`Посуда`],
    "comments": [
      {
        "id": `qi3IlI`,
        "text": `Оплата наличными или перевод на карту?`},
      {
        "id": `mJuVBP`,
        "text": `А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `CG2MYL`,
    "title": `Продам книги Стивена Кинга`,
    "picture": `item16.jpg`,
    "description": `Это настоящая находка для коллекционера! Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Даю недельную гарантию.`,
    "type": `offer`,
    "sum": 62955,
    "category": [`Животные`, `Журналы`, `Книги`],
    "comments": [
      {
        "id": `IIt3hR`,
        "text": `Совсем немного...`},
      {
        "id": `SIZ7mM`,
        "text": `С чем связана продажа? Почему так дешёво?`},
      {
        "id": `ZPFwmm`,
        "text": `Неплохо, но дорого. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `ZldGn9`,
    "title": `Продам книги Стивена Кинга`,
    "picture": `item09.jpg`,
    "description": `Даю недельную гарантию. Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Это настоящая находка для коллекционера!`,
    "type": `offer`,
    "sum": 59614,
    "category": [`Посуда`],
    "comments": [
      {
        "id": `_oPBdv`,
        "text": `Неплохо, но дорого. Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({query: `Куплю антиквариат`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(3));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`FBjqp4`));

});

test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(HttpCode.OK)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
