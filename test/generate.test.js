const fs = require(`fs`);
const {promisify} = require(`util`);
const unlink = promisify(fs.unlink);
const close = promisify(fs.close);
const isFileExist = require(`../src/generator/isFileExist`);
const createFileWithData = require(`../src/generator/createFileWithData`);
const state = require(`../src/generator/state`);

describe(`Generate JSON command`, function () {
  it(`should create new file`, function () {
    state.setState(`string`, `fileName`, `testFile`);
    state.setState(`number`, `numberOfEntity`, `10`);
    return isFileExist(state.fileName)
        .then((fd) => close(fd))
        .then(createFileWithData)
        .then(() => unlink(`${process.cwd()}/${state.fileName}.json`));
  });
});
