const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server/server`);

describe(`GET /api/offers`, function () {
  let dateForTest;
  it(`respond with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;
          assert.equal(page.total, 10);
          assert.equal(page.data.length, 10);
          assert.equal(Object.keys(page.data[0]).length, 4);

          dateForTest = page.data[0].date;
        });
  });

  it(`find offer by date`, () => {
    return request(app)
        .get(`/api/offers/${dateForTest}`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offer = response.body;
          assert.equal(offer.date, dateForTest);
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/offersasdf`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
