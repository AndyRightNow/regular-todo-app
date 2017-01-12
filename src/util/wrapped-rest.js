define([
  '{pro}/lib/nej/util/ajax/rest.js',
  '{pro}/lib/nprogress.js'
], function (rest, nProgress) {
  var wrappedRest = {};


  /**
   * @callback requestCallback
   * @param {any} error
   * @param {any} responseData
   * @return {void}
   */
  /**
   * Wrap the request into a version with nProgress
   * 
   * @param {String} url
   * @param {Object} options
   * @param {requestCallback} callback (error, responseData) => void
   * @returns
   */
  wrappedRest.request = function (url, options, callback) {
    rest._$request(url, {
      data: options.data,
      method: options.method,
      onload: function (data) {
        callback(null, data);
        nProgress.done();
      },
      onerror: function (err) {
        callback(err, null);
        nProgress.done();
      },
      onbeforerequest: function () {
        nProgress.start();
      }
    });
  };

  return wrappedRest;
});