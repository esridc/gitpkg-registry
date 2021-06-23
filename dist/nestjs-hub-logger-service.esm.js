import { getErrorSource, HubLogger } from 'hub-logger';

var HubLoggerService = /*#__PURE__*/function () {
  function HubLoggerService(options) {
    this.hubLogger = new HubLogger(options);
  }

  var _proto = HubLoggerService.prototype;

  _proto.log = function log(message) {
    this.hubLogger.info(message);
  };

  _proto.error = function error(message, trace) {
    this.hubLogger.error(message, {
      source: getErrorSource(trace)
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

export { HubLoggerService };
//# sourceMappingURL=nestjs-hub-logger-service.esm.js.map
