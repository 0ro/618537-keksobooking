const getRandomString = () => Math.random().toString(36).substring(7);
const getRandomNumberFromRange = (min, max) => {
  return min + Math.floor(Math.random() * ((max || 1000) + 1 - min));
};
const getRandomItemFromArray = (array) => {
  const rand = getRandomNumberFromRange(0, array.length - 1);
  return array[rand];
};
const getRandomMixArray = (array) => {
  const arr = [...array];
  return arr.sort(() => Math.random() - 0.5);
};
const getRandomDate = (start = new Date(2015, 0, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
};

module.exports = {
  getRandomString,
  getRandomNumberFromRange,
  getRandomItemFromArray,
  getRandomMixArray,
  getRandomDate
};
