const colors = require(`colors`);
const packageInfo = require(`../package.json`);

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
    console.log(`v${getColorVersion(packageInfo.version)}`);
    process.exit(0);
  }
};
