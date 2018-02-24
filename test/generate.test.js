const {isFileExist, createFileWithResult} = require(`../src/generator/generate`);
const {rl} = require(`../src/generator/questionPromise`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const unlink = promisify(fs.unlink);
const close = promisify(fs.close);

describe(`Generate JSON command`, function () {
  it(`should create new file`, function () {
    const fileName = `testfile`;
    const numberOfEntity = 10;
    return isFileExist({fileName, numberOfEntity})
        .then((fd) => close(fd))
        .then(createFileWithResult.bind(null, {fileName, numberOfEntity}))
        .then(() => unlink(`${process.cwd()}/${fileName}.json`))
        .then(()=>rl.close());
  });
});
