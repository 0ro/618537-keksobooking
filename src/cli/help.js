const colors = require(`colors`);
const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const fill = require(`./fill`);
const generate = require(`../generator/generate`);
const server = require(`./server`);

const getCommands = (map) => {
  let resultString = ``;
  map.forEach((value, key)=>{
    resultString += key ? `--${colors.grey(key)} - ${colors.green(value)}\n` : `${colors.grey(`no flag`)} - ${colors.green(value)}\n`;
  });
  return resultString;
};

const help = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Available commands:\n` + getCommands(mapOfCommands));
    process.exit(0);
  }
};

const mapOfCommands = new Map([
  [`${help.name}`, help.description],
  [`${version.name}`, version.description],
  [`${author.name}`, author.description],
  [`${license.name}`, license.description],
  [`${description.name}`, description.description],
  [`${generate.name}`, `${generate.description}`],
  [`${server.name} ${server.option}`, `${server.description}`],
  [`${fill.name}`, fill.description]
]);

module.exports = help;
