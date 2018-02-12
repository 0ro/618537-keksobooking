const colors = require(`colors`);
const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const voidCommand = require(`./voidCommand`);

const getCommands = (map) => {
  let resultString = ``;
  map.forEach((value, key)=>{
    resultString += `--${colors.grey(key)} - ${colors.green(value)}\n`;
  });
  return resultString;
};

const help = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Available commands:\n` + getCommands(mapOfCommands));
  }
};

const mapOfCommands = new Map([
  [`${help.name}`, help.description],
  [`${version.name}`, version.description],
  [`${author.name}`, author.description],
  [`${license.name}`, license.description],
  [`${description.name}`, description.description],
  [void 0, voidCommand.description]
]);

module.exports = help;
