const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const state = require(`./state`);
const {generate} = require(`./offers-generator`);

module.exports = () => {
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(`${process.cwd()}/${state.fileName}.json`, JSON.stringify(generate(state.numberOfEntity)), fileWriteOptions);
};
