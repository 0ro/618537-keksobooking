const generate = require(`./generate`);
const {questionPromise} = require(`./questionPromise`);
const colors = require(`colors`);

module.exports = {
  name: `void`,
  description: `Show message for use generate`,
  execute() {
    questionPromise(`Hello User! Generate the data? y/n: `).then((answer) => {
      answer = answer.trim();
      if (answer === `y`) {
        return generate.execute();
      }
      throw new Error(`Cancel generate`);
    }).catch((err) => {
      console.error(colors.red(err));
      process.exit(1);
    });
  }
};
