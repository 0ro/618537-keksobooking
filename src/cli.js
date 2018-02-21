const args = process.argv.slice(2);
const version = require(`./cli/version`);
const help = require(`./cli/help`);
const author = require(`./cli/author`);
const license = require(`./cli/license`);
const description = require(`./cli/description`);
const voidCommand = require(`./cli/voidCommand`);
const error = require(`./cli/error`);
const generate = require(`./generator/generate`);

const map = new Map([
  [`--${version.name}`, version.execute],
  [`--${help.name}`, help.execute],
  [`--${author.name}`, author.execute],
  [`--${license.name}`, license.execute],
  [`--${description.name}`, description.execute],
  [`--${generate.name}`, generate.execute],
  [void 0, voidCommand.execute]
]);

if (map.get(args[0])) {
  map.get(args[0])();
} else {
  error.execute(args.join(` `));
}
