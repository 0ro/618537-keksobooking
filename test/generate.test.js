const fs = require(`fs`);
const {promisify} = require(`util`);
const unlink = promisify(fs.unlink);
const close = promisify(fs.close);
const isFileExist = require(`../src/generator/isFileExist`);
const {generate} = require(`../src/generator/offers-generator`);
const createFileWithData = require(`../src/generator/createFileWithData`);

describe(`Generate JSON command`, function () {
  it(`should create new file`, function () {
    const fileName = `testfile`;
    const numberOfEntity = 10;
    return isFileExist({fileName, numberOfEntity})
        .then((fd) => close(fd))
        .then(createFileWithData.bind(null, fileName, generate(numberOfEntity)))
        .then(() => unlink(`${process.cwd()}/${fileName}.json`));
  });
});
