const util = require(`util`);
const readline = require(`readline`);

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

module.exports = {
  questionPromise
};
