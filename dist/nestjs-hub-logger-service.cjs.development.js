'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hubLogger = require('hub-logger');

var HubLoggerService = /*#__PURE__*/function () {
  function HubLoggerService(options) {
    this.hubLogger = new hubLogger.HubLogger(options);
  }

  var _proto = HubLoggerService.prototype;

  _proto.log = function log(message) {
    this.hubLogger.info(message);
  };

  _proto.error = function error(message, trace) {
    this.hubLogger.error(message, {
      trace: trace
    });
  };

  _proto.warn = function warn(message) {
    this.hubLogger.warn(message);
  };

  _proto.debug = function debug(message) {
    this.hubLogger.debug(message);
  };

  _proto.verbose = function verbose(message) {
    // reduce the number of actual log levels
    this.debug(message);
  };

  return HubLoggerService;
}();

exports.HubLoggerService = HubLoggerService;
//# sourceMappingURL=nestjs-hub-logger-service.cjs.development.js.map
