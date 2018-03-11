const colors = require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  execute() {
    console.log(`${colors.green(packageInfo.author)}`);
    process.exit(0);
  }
};
