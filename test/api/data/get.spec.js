const expect = require('chai').expect;
const axios = require('axios');

let response;
let error;

beforeEach((done) => {
  axios.get('http://localhost:3000/api/data')
    .then((res) => {
      response = res;
      done();
    })
    .catch((err) => {
      error = err;
      done();
    })
});

describe('The GET method on /api/data route', () => {
  it('should return a JSON object with a property "message" and a property "data"', () => {
    let data = response.data;

    expect(data).to.have.all.keys('message', 'data');
  });
});