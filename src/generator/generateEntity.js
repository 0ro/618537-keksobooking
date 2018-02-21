const {
  getRandomString,
  getRandomNumberFromRange,
  getRandomItemFromArray,
  getRandomMixArray
} = require(`./randomizer`);
const {
  OFFER_TITLES,
  OFFER_TYPES,
  OFFER_CHECKINS,
  OFFER_PHOTOS,
  OFFER_FEATURES
} = require(`../../constants`);

const generateEntity = (number = 1) => {
  return new Array(number).fill(number).map(() => {
    const author = {
      avatar: `https://robohash.org/` + getRandomString()
    };

    const location = {
      x: getRandomNumberFromRange(300, 900),
      y: getRandomNumberFromRange(150, 500)
    };

    const offer = {
      title: getRandomItemFromArray(OFFER_TITLES),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumberFromRange(1000, 1000000),
      type: getRandomItemFromArray(OFFER_TYPES),
      rooms: getRandomNumberFromRange(1, 5),
      guests: getRandomNumberFromRange(0),
      checkin: getRandomItemFromArray(OFFER_CHECKINS),
      checkout: getRandomItemFromArray(OFFER_CHECKINS),
      features: getRandomMixArray(OFFER_FEATURES).slice(getRandomNumberFromRange(0, OFFER_FEATURES.length - 1)),
      description: ``,
      photos: getRandomMixArray(OFFER_PHOTOS)
    };

    return {
      author,
      offer,
      location
    };
  });
};

module.exports = {
  generateEntity
};
