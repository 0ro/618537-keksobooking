const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`winston`);

module.exports = {
  name: `description`,
  description: `Shows program description`,
  execute() {
    logger.info(`${colors.green(packageInfo.description)}`);
    process.exit(0);
  }
};
