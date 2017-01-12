const expect = require('chai').expect;
const axios = require('axios');

let response;
let error;

beforeEach((done) => {
  axios.get('http://localhost:3000')
    .then((res) => {
      response = res;
      done();
    })
    .catch((err) => {
      error = err;
      done();
    })
})

describe('The index route', () => {
  it('should return a HTML file when receiving GET requests', () => {
    let data = response.data;

    expect(data.indexOf('html')).to.not.equal(-1);
  });
});