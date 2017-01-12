const expect = require('chai').expect;
const axios = require('axios');

let successfulGetResponse;
let successfulPutResponse;
let error;

let url = 'http://localhost:3000/api/data';

let testDataDesc = new Date(Date.now()).toTimeString() + " POST Request Test";

beforeEach((done) => {
  axios.get(url)
    .then((res) => {
      successfulGetResponse = res;
      
      return axios.post(url, {
          description: testDataDesc,
          completed: false
        });
    })
    .then((res) => {
      return axios({
        method: 'put',
        url,
        data: {
          id: res.data.id,
          description: new Date(Date.now()).toTimeString() + " POST Request Test"
        }
      });
    })
    .then((res) => {
      successfulPutResponse = res;
      done();
    })
    .catch((err) => {
      console.log(err);
      error = err;
      done();
    })
});

describe('The GET method on /api/data route', () => {
  it('should return a JSON object with a property "message" and a property "data"', () => {
    expect(successfulGetResponse.data).to.have.all.keys('message', 'data');
  });
});

describe('The PUT method on /api/data route', () => {
  it('should return with the status code 200', () => {
    expect(successfulPutResponse.status).to.equal(200);
  });
});