const {generate} = require(`./offers-generator`);
const {questionPromise} = require(`./questionPromise`);
const colors = require(`colors`);
const createFileWithData = require(`./createFileWithData`);
const isFileExist = require(`./isFileExist`);
const addDataToDB = require(`./addDataToDB`);
const state = require(`./state`);

const handlerOfFileOverwrite = (answer) => {
  answer = answer.trim();
  if (answer === `y`) {
    return createFileWithData(generate(state.numberOfEntity));
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
        .then(handlerOfFileOverwrite)
        .then(addDataToDB)
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
    questionPromise(`How many offers you want to create? `)
        .then(state.setState.bind(state, `number`, `numberOfEntity`))
        .then(questionPromise.bind(null, `We will save offers to database and file. Write file's name: `))
        .then(state.setState.bind(state, `string`, `fileName`))
        .then(isFileExist)
        .then(createFileWithData)
        .then(addDataToDB)
        .then(generateSuccess)
        .catch((error) => generateFail(error));
  }
};
