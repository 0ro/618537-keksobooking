const express = require(`express`);

const app = express();
app.use(express.static(`static`));

module.exports = {
  run(PORT) {
    const HOSTNAME = `127.0.0.1`;
    const DEFAULT_PORT = `3000`;

    app.listen(PORT || DEFAULT_PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  },
  app
};
