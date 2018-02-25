const {Router} = require(`express`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`../../generator/generateEntity`);

const offersRouter = new Router();

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

offersRouter.get(`/:date`, (req, res) => {
  console.log(req.params);
  const date = +req.params[`date`];
  const offer = offers.find((it) => it.date === date);
  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

module.exports = offersRouter;
