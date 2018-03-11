const {generate} = require(`./offers-generator`);
const fs = require(`fs`);
const util = require(`util`);
const readFile = util.promisify(fs.readFile);
const {questionPromise} = require(`./questionPromise`);
const colors = require(`colors`);
const createFileWithData = require(`./createFileWithData`);
const offerStore = require(`../server/offers/store`);
const isFileExist = require(`./isFileExist`);

const state = {
  numberOfEntity: null,
  fileName: null
};

const setState = (type, key, value) => {
  if (type === `number`) {
    const int = +value.trim();
    if (int === int && int > 0) {
      state[key] = int;
      return state;
    }
    throw new Error(`You did not enter a number > 0`);
  } else if (type === `string`) {
    if (value) {
      const string = value.trim();
      state[key] = string;
      return state;
    }
    throw new Error(`You did not enter a path`);
  }
  throw new Error(`I don't know this type`);
};

const answerWithFileOverwrite = (answer) => {
  answer = answer.trim();
  if (answer === `y`) {
    return createFileWithData(state.fileName, generate(state.numberOfEntity));
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
        .then(addResultToDB.bind(null, state))
        .then(generateSuccess)
        .catch((error) => generateFail(error));
  }
  console.error(colors.red(err));
  process.exit(1);
  return 0;
};

const addResultToDB = (currentState) => {
  const writeToDB = async (data) => {
    try {
      await offerStore.saveAll(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  };
  return readFile(`${process.cwd()}/${currentState.fileName}.json`, {encoding: `utf-8`})
      .then(writeToDB);
};

module.exports = {
  name: `generate`,
  description: `Generates data for project`,
  execute() {
    questionPromise(`How many offers you want to create? `)
        .then(setState.bind(null, `number`, `numberOfEntity`))
        .then(questionPromise.bind(null, `We will save offers to database and file. Write file's name: `))
        .then(setState.bind(null, `string`, `fileName`))
        .then(isFileExist.bind(null, state.fileName))
        .then(createFileWithData.bind(null, state.fileName, generate(state.numberOfEntity)))
        .then(addResultToDB.bind(null, state))
        .then(generateSuccess)
        .catch(generateFail);
  }
};
