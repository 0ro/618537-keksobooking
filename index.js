const args = process.argv.slice(2);
const version = require(`./src/version`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);
const voidCommand = require(`./src/voidCommand`);
const error = require(`./src/error`);
const map = new Map([
  [`--${version.name}`, version.execute],
  [`--${help.name}`, help.execute.bind(help)],
  [`--${author.name}`, author.execute],
  [`--${license.name}`, license.execute],
  [`--${description.name}`, description.execute],
  [void 0, voidCommand.execute]
]);

if (map.get(args[0])) {
  map.get(args[0])();
} else {
  error.execute(args.join(` `));
}
