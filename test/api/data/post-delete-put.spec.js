const expect = require('chai').expect;
const axios = require('axios');

let noDataResponse;
let validDataResponse;
let successfulDeleteResponse;
let invalidDeleteResponse;

let url = 'http://localhost:3000/api/data';

let testDataDesc = new Date(Date.now()).toTimeString() + " POST Request Test";

beforeEach((done) => {

  // Valid data request  
  axios.post(url, {
      description: testDataDesc,
      completed: false
    })
    .then((res) => {
      validDataResponse = res;

      return axios.post(url);
    })
    .catch((err) => {
      noDataResponse = err.response;

      // Success delete
      return axios({
        method: 'delete',
        url,
        data: {
          id: validDataResponse.data.id
        }
      });
    })
    .then((res) => {
      successfulDeleteResponse = res;

      // Invalid delete      
      return axios.delete(url);
    })
    .catch((err) => {
      invalidDeleteResponse = err.response;
      done();
    });
});

describe('The POST method on /api/data route', () => {
  it('should return a JSON object with a property "message" and a property "id" when success', () => {
    expect(validDataResponse.data).to.have.all.keys('message', 'id');
  });

  it('should return a JSON object containing a message "Invalid data" when fails', () => {
    expect(noDataResponse.data.message.indexOf('Invalid data')).to.not.equal(-1);
  });
});

describe('The DELETE method on /api/data route', () => {
  it('should return with status code 200 when successful', () => {
    expect(successfulDeleteResponse.status).to.equal(200);
  });

  it('should return a JSON object containing a message "Invalid data" when fails', () => {
    expect(invalidDeleteResponse.data.message.indexOf('Invalid data')).to.not.equal(-1);
  });
});