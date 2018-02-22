const server = require(`../server`);
const args = process.argv.slice(3);

module.exports = {
  name: `server`,
  option: `<port>`,
  description: `Run server on <port>, default is 3000`,
  execute() {
    server.execute(args[0]);
  }
};
