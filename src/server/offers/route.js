const {Router} = require(`express`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {validateSchema} = require(`../util/validator`);
const keksobookingSchema = require(`./validation`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);
const dataRenderer = require(`../util/data-renderer`);
const {getRandomItemFromArray} = require(`../../generator/randomizer`);
const {AUTHOR_NAME} = require(`../../data/offer`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);

const offersRouter = new Router();

const upload = multer({storage: multer.memoryStorage()});

offersRouter.use(bodyParser.json());

offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const toPage = async (cursor, skip, limit) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

const fillDefaultValues = (data, changes) => {
  let resultData = data;
  if (changes !== void 0) {
    Object.keys(changes).forEach((item) => {
      if (!resultData[item]) {
        resultData[item] = changes[item];
      }
    });
  }
  return resultData;
};

const transformData = (data, date) => {
  const author = {
    name: data.name,
    avatar: data.avatar
  };

  const [x, y] = data.address.split(`,`);

  const location = {x, y};

  const offer = {
    title: data.title,
    address: data.address,
    description: data.description,
    price: data.price,
    type: data.type,
    rooms: data.rooms,
    guests: data.guests,
    checkin: data.checkin,
    checkout: data.checkout,
    features: data.features,
    photos: data.photos
  };

  return {
    author,
    offer,
    location,
    date
  };
};

offersRouter.get(``, async(async (req, res) => {
  const skip = +req.query.skip || 0;
  const limit = +req.query.limit || 20;
  res.send(await toPage(await offersRouter.offersStore.getAllOffers(), skip, limit));
}));

offersRouter.post(``, upload.fields(
    [{
      name: `avatar`,
      maxCount: 1
    },
    {
      name: `photos`,
      maxCount: 1
    }]), async(async (req, res) => {
  const data = fillDefaultValues(req.body,
      {
        name: getRandomItemFromArray(AUTHOR_NAME)
      });

  const dateNow = Date.now();

  const avatar = req.files.avatar[0];
  if (avatar) {
    data.avatar = avatar;
  }

  const errors = validateSchema(data, keksobookingSchema);
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${dateNow}/avatar`,
      mimetype: avatar.mimetype
    };
    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo;
  }

  const photos = req.files.photos[0];

  if (photos) {
    const photosInfo = {
      path: `/api/offers/${dateNow}/photos/1`,
      mimetype: photos.mimetype
    };
    await offersRouter.imageStore.save(photosInfo.path, createStreamFromBuffer(photos.buffer));
    data.photos = photosInfo;
  }

  dataRenderer.renderDataSuccess(req, res, data);

  await offersRouter.offersStore.save(transformData(data, dateNow));
}));

offersRouter.delete(`/:date`, async(async (req, res) => {
  const offerDate = +req.params.date;

  const offer = await offersRouter.offersStore.getOffer(offerDate);
  if (!offer) {
    throw new NotFoundError(`offer with date "${offerDate}" not found`);
  } else {
    await offersRouter.offersStore.removeOffer(offerDate);
  }
  res.send(offer);
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const offerDate = +req.params.date;

  const found = await offersRouter.offersStore.getOffer(offerDate);
  if (!found) {
    throw new NotFoundError(`offer with date "${offerDate}" not found`);
  }
  res.send(found);
}));

offersRouter.get(`/:date/avatar`, async(async (req, res) => {
  const offerDate = +req.params.date;

  const offer = await offersRouter.offersStore.getOffer(offerDate);

  if (!offer) {
    throw new NotFoundError(`offer with date "${offerDate}" not found`, 400);
  }

  const avatar = offer.author.avatar;

  if (!avatar) {
    throw new NotFoundError(`offer with date "${offerDate}" didn't upload avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

offersRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});

module.exports = (offerRouter, imageStore) => {
  offersRouter.offersStore = offerRouter;
  offersRouter.imageStore = imageStore;
  return offersRouter;
};
