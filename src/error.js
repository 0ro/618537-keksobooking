const help = require(`./help`);

module.exports = {
  name: `error`,
  description: `Shows program error`,
  execute(undefinedFlag) {
    console.error(`Unknows command ${undefinedFlag}`);
    help.execute();
    process.exit(1);
  }
};
