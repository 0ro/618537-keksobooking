const generate = require(`./generate`);

module.exports = {
  name: `void`,
  description: `Show message for use generate`,
  execute() {
    console.log(`Hi you can generate the data using the flag --${generate.name}`);
    process.exit(0);
  }
};
