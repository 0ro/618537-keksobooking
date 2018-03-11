const fs = require(`fs`);
const util = require(`util`);
const openFile = util.promisify(fs.open);

module.exports = (fileName) => {
  return openFile(`${process.cwd()}/${fileName}.json`, `wx`);
};
