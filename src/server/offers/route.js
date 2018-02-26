const {Router} = require(`express`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`../../generator/generateEntity`);
const multer = require(`multer`);

const offersRouter = new Router();

const upload = multer({storage: multer.memoryStorage()});

offersRouter.use(bodyParser.json());

const offers = generateEntity(10);

const toPage = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

offersRouter.get(``, async(async (req, res) => res.send(toPage(offers))));

offersRouter.post(``, upload.single(`avatar`), (req, res) => {
  const data = req.body;

  res.send(data);
});

offersRouter.get(`/:date`, (req, res) => {
  const date = +req.params[`date`];
  const offer = offers.find((it) => it.date === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

module.exports = offersRouter;
