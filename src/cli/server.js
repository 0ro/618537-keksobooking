const server = require(`../server/server`);
const args = process.argv.slice(3);

module.exports = {
  name: `server`,
  option: `<port>`,
  description: `Run server on [PORT], default is 3000`,
  execute() {
    server.run(args[0]);
  }
};
