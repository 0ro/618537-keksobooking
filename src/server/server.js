const express = require(`express`);
const offersRouter = require(`./offers/route`);
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
