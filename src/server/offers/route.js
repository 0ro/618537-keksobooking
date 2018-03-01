const {Router} = require(`express`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const {generateEntity} = require(`../../generator/generateEntity`);
const multer = require(`multer`);
const {validateSchema} = require(`../util/validator`);
const keksobookingSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const {getRandomItemFromArray} = require(`../../generator/randomizer`);
const {AUTHOR_NAME} = require(`../../data/offer`);

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

const fillDefaultValues = (data, changes) => {
  let resultData = data;
  if (changes !== void 0) {
    Object.keys(resultData).forEach((key) => {
      if (!resultData[key].length) {
        Object.keys(changes).forEach((change) => {
          if (key === change) {
            resultData[key] = changes[change];
          }
        });
      }
    });
  }
  return resultData;
};

offersRouter.get(``, async(async (req, res) => res.send(toPage(offers))));

offersRouter.post(``, upload.fields(
    [{
      name: `avatar`,
      maxCount: 1
    },
    {
      name: `preview`,
      maxCount: 1
    }]), (req, res) => {

  const data = fillDefaultValues(req.body, {name: getRandomItemFromArray(AUTHOR_NAME)});

  const errors = validateSchema(data, keksobookingSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
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


offersRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = offersRouter;
