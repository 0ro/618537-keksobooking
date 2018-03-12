const fs = require(`fs`);
const util = require(`util`);
const readFile = util.promisify(fs.readFile);
const offerStore = require(`../server/offers/store`);
const state = require(`./state`);

const addResultToDB = () => {
  const writeToDB = async (data) => {
    try {
      await offerStore.saveAll(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  };
  return readFile(`${process.cwd()}/${state.fileName}.json`, {encoding: `utf-8`})
      .then(writeToDB);
};

module.exports = addResultToDB;
