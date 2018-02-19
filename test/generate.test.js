const {isFileExist, createFileWithResult} = require(`../src/generate`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const unlink = promisify(fs.unlink);

describe(`Generate JSON command`, function () {
  it(`should create new file`, function () {
    const fileName = `testfile`;
    const numberOfEntity = 10;
    return isFileExist({fileName, numberOfEntity})
        .then(createFileWithResult.bind(null, {fileName, numberOfEntity}))
        .then(() => unlink(`${process.cwd()}/${fileName}.json`));
  });
});
