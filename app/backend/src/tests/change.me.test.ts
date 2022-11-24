import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response, Request } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;
  describe('testa o login', function () {
    afterEach(sinon.restore);
    it('???????', async function () {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.equal(200);
      chaiHttpResponse = await chai.request(app).get('/login/validate').set({
        Authorization:
          ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJEYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn19LCJpYXQiOjE2NjkzMTIwMzEsImV4cCI6MTY2OTM5ODQzMX0.upwBloizCTH3EKdQWH97EOycJkXr9BUH5P7Rd3ZDDbY',
      });
    });
  });
});
