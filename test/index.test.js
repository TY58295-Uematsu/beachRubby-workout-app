const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../knex.js');
const  setupServer  = require('../server.js');

const app = setupServer();
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/authors/ with no params', () => {
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

  it('should return status 200.', async () => {
    const response = await request.get('/api/authors/');
    expect(response).to.have.status(200);
  });

  it('should return array of authors', async () => {
    const response = await request.get('/api/authors/');
    const { data } = JSON.parse(response.text);
    // console.log(data);
    
    expect(data).to.be.an.instanceOf(Array);
  });

  it('should have expected props', async () => {
    const response = await request.get('/api/authors/');
    const { data } = JSON.parse(response.text);

    data.forEach((author) => {
      expect(author).to.have.property('id');
      expect(author).to.have.property('name');
    });
  });
});

describe('GET /api/authors/ with query params', () => {
  const limit = 3;
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

  it('should return status 200.', async () => {
    const response = await request.get('/api/authors/').query({ limit });
    expect(response).to.have.status(200);
  });

  it('should accept a limit params', async () => {
    const response = await request.get('/api/authors/').query({ limit });
    const { data } = JSON.parse(response.text);

    expect(data.length).to.be.at.most(limit);
  });

  it('should have expected props', async () => {
    const response = await request.get('/api/authors/').query({ limit });
    const { data } = JSON.parse(response.text);

    data.forEach((author) => {
      expect(author).to.have.property('id');
      expect(author).to.have.property('name');
    });
  });
});

