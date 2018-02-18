const args = process.argv.slice(2);
const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const voidCommand = require(`./voidCommand`);
const error = require(`./error`);
const generate = require(`./generate`);

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
