const {generateEntity} = require(`./generateEntity`);
const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const openFile = util.promisify(fs.open);
const readline = require(`readline`);
const colors = require(`colors`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question[util.promisify.custom] = (arg) => {
  return new Promise((resolve) => {
    rl.question(arg, resolve);
  });
};

const questionPromise = util.promisify(rl.question);

const createFile = (fileName, generateQuantity) => {
  const data = generateEntity(generateQuantity);
  const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
  return writeFile(fileName, JSON.stringify(data), fileWriteOptions);
};

const generateSuccess = () => {
  console.log(colors.green(`Generate done`));
  process.exit(0);
};
const generateFail = (err) => {
  console.error(colors.red(err));
  process.exit(1);
};

module.exports = {
  name: `generate`,
  description: `Generates data for project`,
  execute() {
    let quantity;
    let fileName;
    questionPromise(`How many items you need to create? `).then((answer) => {
      const int = +answer.trim();
      if (int === int && typeof int === `number` && int > 0) {
        quantity = int;
        return questionPromise(`Write file's name: `);
      }
      throw new Error(`You did not enter a number > 0`);
    }).then((answer) => {
      fileName = `${process.cwd()}/${answer.trim()}.json`;
      if (fileName) {
        return openFile(fileName, `wx`);
      }
      throw new Error(`You did not enter a path`);
    }).then(()=>{
      return createFile(fileName, quantity);
    }).then(generateSuccess).catch((err) => {
      if (err.code === `EEXIST`) {
        questionPromise(`The file exists. Is it overwritten? y/n: `).then((answer) => {
          answer = answer.trim();
          if (answer === `y`) {
            return createFile(fileName, quantity);
          }
          throw new Error(`Cancel generate`);
        }).then(generateSuccess).catch((error) => generateFail(error));
        return;
      }
      generateFail(err);
    });
  }
};
