const {generateEntity} = require(`./generateEntity`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const openFile = util.promisify(fs.open);
const {questionPromise} = require(`./questionPromise`);
const colors = require(`colors`);

const generateSuccess = () => {
  console.log(colors.green(`Generate done`));
  process.exit(0);
};

const generateFail = (err) => {
  console.error(colors.red(err));
  process.exit(1);
};

const answerState = {
  numberOfEntity: null,
  fileName: null
};

const setStateAnswer = (key, value) => {
  answerState[key] = value;
};

const answerWithNumber = (answer) => {
  const int = +answer.trim();
  if (int === int && typeof int === `number` && int > 0) {
    setStateAnswer(`numberOfEntity`, int);
    return questionPromise(`Write file's name: `);
  }
  throw new Error(`You did not enter a number > 0`);
};

const answerWithFileName = (answer) => {
  const fileName = `${process.cwd()}/${answer.trim()}.json`;
  if (fileName) {
    setStateAnswer(`fileName`, fileName);
    return openFile(fileName, `wx`);
  }
  throw new Error(`You did not enter a path`);
};

const createFile = (state) => () => {
  const data = generateEntity(state.numberOfEntity);
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(state.fileName, JSON.stringify(data), fileWriteOptions);
};

const answerWithFileOverwrite = (answer) => {
  answer = answer.trim();
  if (answer === `y`) {
    return createFile(answerState);
  }
  throw new Error(`Cancel generate`);
};

const errors = (err) => {
  if (err.code === `EEXIST`) {
    return questionPromise(`The file exists. Is it overwritten? y/n: `)
        .then(answerWithFileOverwrite)
        .then(generateSuccess)
        .catch((error) => generateFail(error));
  }
  return generateFail(err);
};

module.exports = {
  name: `generate`,
  description: `Generates data for project`,
  execute() {
    questionPromise(`How many items you need to create? `)
        .then(answerWithNumber)
        .then(answerWithFileName)
        .then(createFile(answerState))
        .then(generateSuccess)
        .catch(errors);
  }
};
