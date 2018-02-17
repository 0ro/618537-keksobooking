const isItemFromArray = (item, array) => {
  return array.some((i)=> item === i);
};

const isNumberFromRange = (number, {start, end}) => {
  return end >= number && number >= start;
};

const isArrayOfString = (array) => {
  return array.every((i)=> typeof i === `string`);
};

module.exports = {
  isItemFromArray,
  isNumberFromRange,
  isArrayOfString
};
