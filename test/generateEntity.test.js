const assert = require(`assert`);
const helpers = require(`./helpers`);
const {isItemFromArray, isNumberFromRange, isArrayOfString} = helpers;
const generateEntity = require(`../src/generateEntity`);
const {author, offer, location} = generateEntity;

const OFFER_TITLES_ARRAY = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const OFFER_TYPE_ARRAY = [
  `flat`,
  `palace`,
  `house`,
  `bungalo`
];

const OFFER_CHECKIN_ARRAY = [`12:00`, `13:00`, `14:00`];

describe(`GenerateEntity`, () => {
  describe(`author`, () => {
    it(`should have an author`, () => {
      assert.equal(typeof author, `object`);
    });
    it(`author should have an avatar`, () => {
      assert.equal(typeof author.avatar, `string`);
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
    it(`offer.title should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.title, OFFER_TITLES_ARRAY), true);
    });
    it(`offer should have address and address should be address`, () => {
      assert.equal(typeof offer.address, `string`);
    });
    it(`offer.addres should be '{{location.x}}, {{location.y}}'`, () => {
      const arrFromStr = offer.address.split(`,`);
      assert.equal(arrFromStr[0] === location.x && arrFromStr[1] === location.y, true);
    });
    it(`offer should have a price and the price should be number`, () => {
      assert.equal(typeof offer.price, `number`);
    });
    it(`offer.price should be in between 1000...1 000 000`, () => {
      assert.equal(isNumberFromRange(offer.price, {start: 1000, end: 1000000}), true);
    });
    it(`offer should have a type and the type should be string`, () => {
      assert.equal(typeof offer.type, `string`);
    });
    it(`offer.type should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.type, OFFER_TYPE_ARRAY), true);
    });
    it(`offer should have rooms and rooms should be number`, () => {
      assert.equal(typeof offer.rooms, `number`);
    });
    it(`offer.rooms should be in between 1...5`, () => {
      assert.equal(isNumberFromRange(offer.rooms, {start: 1, end: 5}), true);
    });
    it(`offer should have guests and guests should be number`, () => {
      assert.equal(typeof offer.guests, `number`);
    });
    it(`offer should have a checkin and the checkin should be string`, () => {
      assert.equal(typeof offer.checkin, `string`);
    });
    it(`offer.checkin should be equal one from fixable values`, () => {
      assert.equal(isItemFromArray(offer.checkin, OFFER_CHECKIN_ARRAY), true);
    });
    it(`offer should have a checkout and the checkout should be string`, () => {
      assert.equal(typeof offer.checkout, `string`);
    });
    it(`offer should have features and features should be array`, () => {
      assert.equal(offer.features.isArray(), true);
    });
    it(`offer.features should be array of string`, () => {
      assert.equal(isArrayOfString(offer.features), true);
    });
    it(`offer should have a description and the description should be string`, () => {
      assert.equal(typeof offer.description, `string`);
    });
    it(`offer.description be an empty string`, () => {
      assert.equal(offer.description, ``);
    });
    it(`offer should have photos and photos should be array`, () => {
      assert.equal(offer.features.isArray(), true);
    });
    it(`offer.photos should be array of string`, () => {
      assert.equal(isArrayOfString(offer.photos), true);
    });
  });
  describe(`location`, () => {
    it(`location should have x and x should be number`, () => {
      assert.equal(typeof location.x, `number`);
    });
    it(`location.x should be in between 300...900`, () => {
      assert.equal(isNumberFromRange(location.x, {start: 300, end: 900}), true);
    });
    it(`location should have y and y should be number`, () => {
      assert.equal(typeof location.y, `number`);
    });
    it(`location.y should be in between 150...500`, () => {
      assert.equal(isNumberFromRange(location.y, {start: 150, end: 500}), true);
    });
  });
});
