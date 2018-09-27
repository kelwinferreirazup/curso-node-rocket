const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');


const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');

const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');

const factory = require('../factories');

describe('Like', () => {
  beforeEach( async function()  {
    this.timeout(15000);
    await Tweet.remove();
    await User.remove();
  });

  it('it should be able to like an tweet', async function() {
    this.timeout(15000);
    const tweet = await factory.create('Tweet');
    const user = await factory.create("User");
    const jwtToken = user.generateToken();
    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response.body.likes).to.include(user.id);
  });
});
