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
    var called = false;

    try {
      rest._$request(url, {
      data: options.data,
      method: options.method,
      onload: function (data) {
        callback(null, data);
        called = true;
        nProgress.done();
      },
      onerror: function (err) {
        callback(err, null);
        called = true;
        nProgress.done();
      },
      onbeforerequest: function () {
        nProgress.start();
      }
    });
    }
    catch (e) {
      if (!called) {
        callback(e, null);
        called = true;
      }
    }
  };

  return wrappedRest;
});