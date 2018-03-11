const db = require(`../../database/database`);
const logger = require(`../../logger`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }

  async saveAll(offersData) {
    return (await this.collection).insertMany(offersData);
  }

  async removeOffer(date) {
    return (await this.collection).deleteOne({date});
  }

  async removeAllOffers() {
    return (await this.collection).remove();
  }

}

module.exports = new OfferStore(setupCollection().catch((e) => logger.error(`Failed to set up "offers"-collection`, e)));
