const {textRange, isImage, oneOf, isTime, unique, inRange} = require(`../util/assertion`);
const {OFFER_TYPES} = require(`../../data/offer`);

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 140;

const MIN_PRICE = 1;
const MAX_PRICE = 100000;

const MIN_ADDRESS_LENGTH = 1;
const MAX_ADDRESS_LENGTH = 100;

const MIN_ROOMS = 0;
const MAX_ROOMS = 1000;

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 100;

const schema = {
  'title': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
    ]
  },
  'type': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      oneOf(OFFER_TYPES)
    ]
  },
  'price': {
    required: true,
    assertions: [
      inRange(MIN_PRICE, MAX_PRICE)
    ]
  },
  'address': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH)
    ]
  },
  'checkin': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      isTime()
    ]
  },
  'checkout': {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      isTime()
    ]
  },
  'rooms': {
    required: true,
    assertions: [
      inRange(MIN_ROOMS, MAX_ROOMS)
    ]
  },
  'avatar': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'preview': {
    required: false,
    assertions: [
      isImage()
    ]
  },
  'features': {
    required: false,
    assertions: [
      unique()
    ]
  },
  'name': {
    required: false,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
    ]
  },

};

module.exports = schema;
