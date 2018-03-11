const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const app = express();
const logger = require(`../logger`);

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port) {
    const HOSTNAME = process.env.SERVER_HOST || `localhost`;
    const PORT = port || process.env.SERVER_PORT || 3000;

    app.listen(PORT, HOSTNAME, () => {
      logger.info(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  },
  app
};
