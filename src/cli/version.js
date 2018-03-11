const colors = require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`winston`);

const getColorVersion = (version, arrOfColor) => {
  const colorsOfVersion = arrOfColor || [`red`, `green`, `blue`];
  return version.split(`.`).map((item, i)=> {
    return colors[colorsOfVersion[i]](item);
  }).join(`.`);
};

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    logger.info(`v${getColorVersion(packageInfo.version)}`);
    process.exit(0);
  }
};
