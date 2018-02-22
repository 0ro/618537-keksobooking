const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const readfile = promisify(fs.readFile);
const {extname} = require(`path`);

const MAP_OF_EXTENSIONS = new Map([
  [`.css`, `text/css`],
  [`.html`, `text/html; charset=UTF-8`],
  [`.png`, `image/png`],
  [`.jpg`, `image/jpeg`],
  [`.ico`, `image/x-icon`]
]);

const readFile = async (path, res) => {
  const data = await readfile(path);
  const ext = extname(path);

  res.setHeader(`content-type`, MAP_OF_EXTENSIONS.get(ext));
  res.setHeader(`content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer((req, res) => {
  const absolutePath = __dirname + `/../static` + url.parse(req.url).pathname;

  (async () => {
    try {
      console.log(req.url)
      if (req.url === `/`) {
        await readFile(absolutePath + `index.html`, res);
      } else {
        await readFile(absolutePath, res);
      }
      res.statusCode = 200;
      res.statusMessage = `OK`;
    } catch (e) {
      console.error(e);
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

module.exports = {
  execute(PORT) {
    const HOSTNAME = `127.0.0.1`;
    server.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  }
};
