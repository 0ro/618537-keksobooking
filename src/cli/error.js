const colors = require(`colors`);
const help = require(`./help`);

module.exports = {
  name: `error`,
  description: `Shows program error`,
  execute(undefinedFlag) {
    console.error(colors.red(`Unknow command ${undefinedFlag}`));
    help.execute();
    process.exit(1);
  }
};
