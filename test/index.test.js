const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../knex.js');
const setupServer = require('../server.js');

const app = setupServer();
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/workout/ ', () => {
  let request;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    //     const check = await db('users').first();
    // console.log(check);

    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it('should return status 200.', async () => {
    const response = await request.get(
      `/api/workout?wo.workout_day=2025-05-18`
    );
    expect(response).to.have.status(200);
  });

  it('should return array of authors', async () => {
    const response = await request.get(
      `/api/workout?wo.workout_day=2025-05-18`
    );
    const { data } = JSON.parse(response.text);
    // console.log(data);

    expect(data).to.be.an.instanceOf(Array);
  });

  it('should have expected props', async () => {
    const response = await request.get(
      `/api/workout?wo.workout_day=2025-05-18`
    );
    const { data } = JSON.parse(response.text);

    data.forEach((author) => {
      expect(author).to.have.property('id');
      expect(author).to.have.property('name');
    });
  });
});

describe('PATCH api/thisweek/url with query params', () => {
  const body = { youtube_url: 'test', workout_id: 3 };
  let request;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it('should return status 201.', async () => {
    const response = await request.patch('/api/thisweek/url').send( body );
    expect(response).to.have.status(201);
  });

  it('should accept a limit params', async () => {
    const response = await request.patch('/api/thisweek/url').send( body );
    
    const { data } = JSON.parse(response.text);
    console.log('🐶data',data);

    expect(data.length).to.equal(1);
  });

  it('should have expected props', async () => {
    const response = await request.patch('/api/thisweek/url').send( body );
    const { data } = JSON.parse(response.text);

    data.forEach((author) => {
      expect(author).to.have.property('id');
      expect(author).to.have.property('youtube_url');
      expect(author).to.have.property('workout1');
      expect(author).to.have.property('workout2');
      expect(author).to.have.property('workout3');
      expect(author).to.have.property('workout4');
      expect(author).to.have.property('workout5');
    });
  });
});
