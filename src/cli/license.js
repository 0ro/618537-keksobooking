const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`winston`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    logger.info(`${colors.blue(packageInfo.license)}`);
    process.exit(0);
  }
};
