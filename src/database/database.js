const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const url = process.env.DB_HOST || `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url).then((client) => client.db(`keksobooking`)).catch((e) => {
  logger.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
