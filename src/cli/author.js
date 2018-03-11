const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`winston`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  execute() {
    logger.info(`${colors.green(packageInfo.author)}`);
    process.exit(0);
  }
};
