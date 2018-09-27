const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');


const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');

const User = mongoose.model('User');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach( async function()  {
    this.timeout(15000);
    await User.remove();
  });
  describe('Signin', () => {
    it('it should be able to authenticate with valid credentials', async function() {
      this.timeout(15000);
      const user = await factory.create('User', {
        password:'asdfgasdas',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: 'asdfgasdas' });

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });
    it('it should not be able to signin with nonexistent user', async function() {
      this.timeout(15000);
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'ab.com', password: 'asdfgasdas' });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

  });
  describe('Signup', () => {
    it('it should be able to authenticate with credentials', async function() {
      this.timeout(15000);
      const user = await factory.attrs('User');
      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');

    });

    it('it should be able to sing up with duplicate', async function() {
      this.timeout(15000);
      const user = await factory.create('User');
      const user2 = await factory.attrs('User', {
        email: user.email,
      });
      console.log(user2);
      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');

    });
  });

});




