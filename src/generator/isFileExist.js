const fs = require(`fs`);
const util = require(`util`);
const openFile = util.promisify(fs.open);
const state = require(`./state`);

module.exports = () => {
  return openFile(`${process.cwd()}/${state.fileName}.json`, `wx`);
};
