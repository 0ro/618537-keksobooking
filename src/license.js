const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    console.log(`${colors.blue(packageInfo.license)}`);
  }
};
