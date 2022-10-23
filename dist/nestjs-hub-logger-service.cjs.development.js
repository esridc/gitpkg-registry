'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var common = require('@nestjs/common');
var hubLogger = require('hub-logger');

/**
 * A hub logger service for nestjs
 */

exports.HubLoggerService = /*#__PURE__*/function () {
  function HubLoggerService(options) {
    this.hubLogger = new hubLogger.HubLogger(options);
  }
  /**
   * Log an info level messgae.
   * @param message log message
   */


  var _proto = HubLoggerService.prototype;

  _proto.log = function log(message) {
    this.hubLogger.info(message);
  }
  /**
   * Log an error level message.
   * @param message log message
   * @param trace error trace
   */
  ;

  _proto.error = function error(message, trace) {
    this.hubLogger.error(message, {
      trace: trace
    });
  }
  /**
   * Log a warn level message.
   * @param message log message
   */
  ;

  _proto.warn = function warn(message) {
    this.hubLogger.warn(message);
  }
  /**
   * Log a debug level message.
   * @param message log message
   */
  ;

  _proto.debug = function debug(message) {
    this.hubLogger.debug(message);
  }
  /**
   * A dummy function that actually logs a debug level message.
   * @param message log message
   */
  ;

  _proto.verbose = function verbose(message) {
    // reduce the number of actual log levels
    this.debug(message);
  }
  /**
   * Log a json object for debugging.
   * @param data json data
   * @param options logging options
   */
  ;

  _proto.json = function json(data, options) {
    if (options === void 0) {
      options = {
        level: 'debug'
      };
    }

    this.hubLogger.json(data, options);
  }
  /**
   * Create an expressjs middleware for HTTP request logging.
   * @returns a logger middleware
   */
  ;

  _proto.createRequestLogger = function createRequestLogger() {
    return this.hubLogger.createRequestLogger();
  };

  return HubLoggerService;
}();

exports.HubLoggerService = /*#__PURE__*/tslib.__decorate([/*#__PURE__*/common.Injectable()], exports.HubLoggerService);
//# sourceMappingURL=nestjs-hub-logger-service.cjs.development.js.map
