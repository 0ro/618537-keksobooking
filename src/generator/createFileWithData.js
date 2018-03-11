const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);

module.exports = (fileName, data) => {
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(`${process.cwd()}/${fileName}.json`, JSON.stringify(data), fileWriteOptions);
};
