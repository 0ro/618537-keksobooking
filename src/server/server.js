const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const app = express();

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port) {
    const HOSTNAME = process.env.SERVER_HOST;
    const PORT = port || process.env.SERVER_PORT;

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  },
  app
};
