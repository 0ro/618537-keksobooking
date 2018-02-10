const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Available commands:
--help        — ${this.description};
--version     — ${version.description};
--author      — ${author.description};
--license     — ${license.description};
--description — ${description.description};`);
  }
};
