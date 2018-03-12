const dialogForFill = require(`../generator/dialogForFill`);
const {questionPromise} = require(`../generator/questionPromise`);
const colors = require(`colors`);

module.exports = {
  name: `fill`,
  description: `Fill test data for project`,
  execute() {
    questionPromise(`Hello User! Generate the data? y/n: `).then((answer) => {
      answer = answer.trim();
      if (answer === `y`) {
        return dialogForFill.execute();
      }
      throw new Error(`Cancel generate`);
    }).catch((err) => {
      console.error(colors.red(err));
      process.exit(1);
    });
  }
};
