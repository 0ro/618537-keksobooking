const colors = require(`colors`);
const packageInfo = require(`../package.json`);

const getColorVersion = (version, arrOfColor) => {
  const colorsOfVersion = arrOfColor || [`red`, `green`, `blue`];
  return version.split(`.`).reduce((acc, item, i)=> {
    acc.push(colors[colorsOfVersion[i]](item));
    return acc;
  }, []).join(`.`);
};

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`v${getColorVersion(packageInfo.version)}`);
  }
};
