const author = require(`./author`);
const description = require(`./description`);

module.exports = {
  name: `void`,
  description: `Shows program description and name of author`,
  execute() {
    description.execute();
    author.execute();
  }
};
