const request = require(`supertest`);
const mockOffersRouter = require(`./mock-offers-router`);
const app = require(`express`)();

app.use(`/api/offers`, mockOffersRouter);

describe(`POST /api/offers`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`).
        send({
          name: `Pavel`,
          title: `Маленькая квартирка рядом с парком`,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          price: 30000,
          type: `flat`,
          rooms: 1,
          guests: 1,
          checkin: `09:00`,
          checkout: `07:00`,
          features: [`elevator`, `conditioner`]
        }).
        expect(200, {
          name: `Pavel`,
          title: `Маленькая квартирка рядом с парком`,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          price: 30000,
          type: `flat`,
          rooms: 1,
          guests: 1,
          checkin: `09:00`,
          checkout: `07:00`,
          features: [`elevator`, `conditioner`]
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`).
        field(`name`, `Pavel`).
        field(`title`, `Маленькая квартирка рядом с парком`).
        field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`).
        field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`).
        field(`price`, 30000).
        field(`type`, `flat`).
        field(`rooms`, 1).
        field(`guests`, 1).
        field(`checkin`, `09:00`).
        field(`checkout`, `07:00`).
        field(`features`, [`elevator`, `conditioner`]).
        expect(200, {
          name: `Pavel`,
          title: `Маленькая квартирка рядом с парком`,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          price: 30000,
          type: `flat`,
          rooms: 1,
          guests: 1,
          checkin: `09:00`,
          checkout: `07:00`,
          features: [`elevator`, `conditioner`]
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`).
        field(`name`, `Pavel`).
        field(`title`, `Маленькая квартирка рядом с парком`).
        field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`).
        field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`).
        field(`price`, 30000).
        field(`type`, `flat`).
        field(`rooms`, 1).
        field(`guests`, 1).
        field(`checkin`, `09:00`).
        field(`checkout`, `07:00`).
        field(`features`, [`elevator`, `conditioner`]).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(200);
  });

  it(`should fail if checkin is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`name`, ``).
        field(`title`, `Маленькая квартирка рядом с парком`).
        field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`).
        field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`).
        field(`price`, 30000).
        field(`type`, `flat`).
        field(`rooms`, 1).
        field(`guests`, 1).
        field(`checkin`, `9:00`).
        field(`checkout`, `07:00`).
        field(`features`, [`elevator`, `conditioner`]).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(400, [{
          fieldName: `checkin`,
          fieldValue: `9:00`,
          errorMessage: `should be a time in format HH:mm`
        }]);
  });

  it(`should fail if price is invalid`, () => {
    return request(app).post(`/api/offers`).
        field(`name`, ``).
        field(`title`, `Маленькая квартирка рядом с парком`).
        field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`).
        field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`).
        field(`price`, 0).
        field(`type`, `flat`).
        field(`rooms`, 1).
        field(`guests`, 1).
        field(`checkin`, `09:00`).
        field(`checkout`, `07:00`).
        field(`features`, [`elevator`, `conditioner`]).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(400, [{
          fieldName: `price`,
          fieldValue: `0`,
          errorMessage: `should be in range 1..100000`
        }]);
  });
});
