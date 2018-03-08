const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const app = express();

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port) {
    const HOSTNAME = `127.0.0.1`;
    const PORT = port || `3000`;

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  },
  app
};
