const colors = require(`colors`);
const help = require(`./help`);
const logger = require(`winston`);

module.exports = {
  name: `error`,
  description: `Shows program error`,
  execute(undefinedFlag) {
    logger.error(colors.red(`Unknow command ${undefinedFlag}`));
    help.execute();
    process.exit(1);
  }
};
