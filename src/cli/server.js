const server = require(`../server`);
const args = process.argv.slice(3);

module.exports = {
  name: `server <port>`,
  description: `Run server on <port>, default is 3000`,
  execute() {
    server.run(args[3]);
    process.exit(0);
  }
};
