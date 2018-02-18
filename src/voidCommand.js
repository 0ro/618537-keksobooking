const generate = require(`./generateEntity`);

module.exports = {
  name: `void`,
  description: `Shows program description and name of author`,
  execute() {
    console.log(`Hi you can generate the data using the flag --${generate.name}`);
  }
};
