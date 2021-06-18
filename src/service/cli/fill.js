'use strict';

const {writeFile} = require(`../../utils`);
const {readFiles, generateOffers, getCountOffer} = require(`./generateDataUtils`);
const {FILL_DB_SQL} = require(`../serviceConstants`);

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  },
  {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`
  }
];

const getUsersValues = () => (users.map(({email, passwordHash, firstName, lastName, avatar}) =>
  `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`).join(`,\n`));

const getOfferValues = (offers) => (offers.map(({title, description, type, sum, picture, userId}) =>
  `('${title}', '${description}', '${type}', ${sum}, '${picture}', ${userId})`).join(`,\n`));

const getOfferCategoryValues = (offers) => {
  const offerCategories = offers.map((offer, index) => ({offerId: index + 1, categoryId: offer.category[0]}));
  return offerCategories.map(({offerId, categoryId}) => `(${offerId}, ${categoryId})`).join(`,\n`);
};

const getCommentsValue = (offers) => {
  const comments = offers.flatMap((offer) => offer.comments);
  return comments.map(({text, userId, offerId}) => `('${text}', ${userId}, ${offerId})`).join(`,\n`);
};

const getContent = (userValues, categoryValues, offerValues, offerCategoryValues, commentValues) => {
  return `
    INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
    ${userValues};
    INSERT INTO categories(name) VALUES
    ${categoryValues};
    ALTER TABLE offers DISABLE TRIGGER ALL;
    INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
    ${offerValues};
    ALTER TABLE offers ENABLE TRIGGER ALL;
    ALTER TABLE offer_categories DISABLE TRIGGER ALL;
    INSERT INTO offer_categories(offer_id, category_id) VALUES
    ${offerCategoryValues};
    ALTER TABLE offer_categories ENABLE TRIGGER ALL;
    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
    ${commentValues};
    ALTER TABLE comments ENABLE TRIGGER ALL;`;
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const {titles, categories, sentences, comments} = await readFiles();

    const countOffer = getCountOffer(args);

    const offers = generateOffers(countOffer, {titles, categoryCount: categories.length, userCount: users.length, sentences, comments});

    const userValues = getUsersValues(users);
    const offerValues = getOfferValues(offers);
    const offerCategoryValues = getOfferCategoryValues(offers);
    const commentValues = getCommentsValue(offers);
    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const content = getContent(userValues, categoryValues, offerValues, offerCategoryValues, commentValues);

    writeFile(FILL_DB_SQL, content);
  }
};
