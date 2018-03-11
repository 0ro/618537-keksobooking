const {MongoClient} = require(`mongodb`);

const url = process.env.DB_HOST;

module.exports = MongoClient.connect(url).then((client) => client.db(`keksobooking`)).catch((e) => {
  console.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
