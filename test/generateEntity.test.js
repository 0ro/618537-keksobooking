const assert = require(`assert`);
const {generateEntity} = require(`../src/generator/generateEntity`);
const [{author, offer, location, date}] = generateEntity();
const helpers = require(`./helpers`);
const {
  isItemFromArray,
  isNumberFromRange,
  isArrayOfString
} = helpers;
const {
  OFFER_TITLES,
  OFFER_TYPES,
  OFFER_CHECKINS
} = require(`../src/data/offer`);

describe(`GenerateEntity`, () => {
  describe(`author`, () => {
    it(`should have an author`, () => {
      assert.equal(typeof author, `object`);
    });
    it(`author should have an avatar`, () => {
      assert.equal(typeof author.avatar, `string`);
    });
    it(`author should have a name`, () => {
      assert.equal(typeof author.name, `string`);
    });
    it(`avatar should be url`, () => {
      assert.equal(/https?/.test(author.avatar), true);
    });
  });
  describe(`offer`, () => {
    it(`should have an offer`, () => {
      assert.equal(typeof offer, `object`);
    });
    it(`offer should have title and title should be string`, () => {
      assert.equal(typeof offer.title, `string`);
    });
    it(`offer should have address and address should be string`, () => {
      assert.equal(typeof offer.address, `string`);
    });
    it(`offer should have a price and the price should be number`, () => {
      assert.equal(typeof offer.price, `number`);
    });
    it(`offer should have a type and the type should be string`, () => {
      assert.equal(typeof offer.type, `string`);
    });
    it(`offer should have rooms and rooms should be number`, () => {
      assert.equal(typeof offer.rooms, `number`);
    });
    it(`offer should have guests and guests should be number`, () => {
      assert.equal(typeof offer.guests, `number`);
    });
    it(`offer should have a checkout and the checkout should be string`, () => {
      assert.equal(typeof offer.checkout, `string`);
    });
    it(`offer should have features and features should be array`, () => {
      assert.equal(Array.isArray(offer.features), true);
    });
    it(`offer should have a description and the description should be string`, () => {
      assert.equal(typeof offer.description, `string`);
    });
    it(`offer should have photos and photos should be array`, () => {
      assert.equal(Array.isArray(offer.photos), true);
    });
    it(`offer.title should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.title, OFFER_TITLES), true);
    });
    it(`offer.addres should be '{{location.x}}, {{location.y}}'`, () => {
      const arrFromStr = offer.address.split(`,`);
      assert.equal(+arrFromStr[0] === location.x && +arrFromStr[1] === location.y, true);
    });
    it(`offer.price should be in between 1000...1 000 000`, () => {
      assert.equal(isNumberFromRange(offer.price, {start: 1000, end: 1000000}), true);
    });
    it(`offer.type should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.type, OFFER_TYPES), true);
    });
    it(`offer.rooms should be in between 1...5`, () => {
      assert.equal(isNumberFromRange(offer.rooms, {start: 1, end: 5}), true);
    });
    it(`offer should have a checkin and the checkin should be string`, () => {
      assert.equal(typeof offer.checkin, `string`);
    });
    it(`offer.checkin should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.checkin, OFFER_CHECKINS), true);
    });
    it(`offer.checkout should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.checkout, OFFER_CHECKINS), true);
    });
    it(`offer.features should be array of string`, () => {
      assert.equal(isArrayOfString(offer.features), true);
    });
    it(`offer.description be an empty string`, () => {
      assert.equal(offer.description, ``);
    });
    it(`offer.photos should be array of string`, () => {
      assert.equal(isArrayOfString(offer.photos), true);
    });
  });
  describe(`location`, () => {
    it(`should have an location`, () => {
      assert.equal(typeof location, `object`);
    });
    it(`location should have x and x should be number`, () => {
      assert.equal(typeof location.x, `number`);
    });
    it(`location should have y and y should be number`, () => {
      assert.equal(typeof location.y, `number`);
    });
    it(`location.x should be in between 300...900`, () => {
      assert.equal(isNumberFromRange(location.x, {start: 300, end: 900}), true);
    });
    it(`location.y should be in between 150...500`, () => {
      assert.equal(isNumberFromRange(location.y, {start: 150, end: 500}), true);
    });
  });
  describe(`date`, () => {
    it(`date should be number`, () => {
      assert.equal(typeof date, `number`);
    });
  });
});
