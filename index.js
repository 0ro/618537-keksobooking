const args = process.argv.slice(2);
const version = require(`./src/version`);
const help = require(`./src/help`);
const error = require(`./src/error`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);
const voidCommand = require(`./src/voidCommand`);

switch (args[0]) {
  case `--version`:
    version.execute();
    break;

  case `--help`:
    help.execute();
    break;

  case `--author`:
    author.execute();
    break;

  case `--license`:
    license.execute();
    break;

  case `--description`:
    description.execute();
    break;

  case void 0:
    voidCommand.execute();
    break;

  default:
    error.execute(args.join(` `));
}
