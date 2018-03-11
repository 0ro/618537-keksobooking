const {MongoClient} = require(`mongodb`);
const logger = require(`winston`);

const url = process.env.DB_HOST;

module.exports = MongoClient.connect(url).then((client) => client.db(`keksobooking`)).catch((e) => {
  logger.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
