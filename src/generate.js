const {generateEntity} = require(`./generateEntity`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const openFile = util.promisify(fs.open);
const {questionPromise} = require(`./questionPromise`);
const colors = require(`colors`);

const answerState = {
  numberOfEntity: null,
  fileName: null
};

const setStateAnswer = (type, key, value) => {
  if (type === `number`) {
    const int = +value.trim();
    if (int === int && int > 0) {
      answerState[key] = int;
      return answerState;
    }
    throw new Error(`You did not enter a number > 0`);
  } else if (type === `string`) {
    if (value) {
      const string = value.trim();
      answerState[key] = string;
      return answerState;
    }
    throw new Error(`You did not enter a path`);
  }
  throw new Error(`I don't know this type`);
};

const openFileByName = (state) => {
  return openFile(`${process.cwd()}/${state.fileName}.json`, `wx`);
};

const createFile = (state) => {
  const data = generateEntity(state.numberOfEntity);
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(`${process.cwd()}/${state.fileName}.json`, JSON.stringify(data), fileWriteOptions);
};

const answerWithFileOverwrite = (answer) => {
  answer = answer.trim();
  if (answer === `y`) {
    return createFile(answerState);
  }
  throw new Error(`Cancel generate`);
};

const generateSuccess = () => {
  console.log(colors.green(`Generate done`));
  process.exit(0);
};

const generateFail = (err) => {
  if (err.code === `EEXIST`) {
    return questionPromise(`${colors.yellow(`WARNING`)} The file exists. Is it overwritten? y/n: `)
        .then(answerWithFileOverwrite)
        .then(generateSuccess)
        .catch((error) => generateFail(error));
  }
  console.error(colors.red(err));
  process.exit(1);
  return 0;
};

module.exports = {
  name: `generate`,
  description: `Generates data for project`,
  execute() {
    questionPromise(`How many items you need to create? `)
        .then(setStateAnswer.bind(null, `number`, `numberOfEntity`))
        .then(questionPromise.bind(null, `Write file's name: `))
        .then(setStateAnswer.bind(null, `string`, `fileName`))
        .then(openFileByName.bind(null, answerState))
        .then(createFile.bind(null, answerState))
        .then(generateSuccess)
        .catch(generateFail);
  }
};
