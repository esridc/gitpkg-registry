'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
var winston = /*#__PURE__*/require('winston');

var HubLogger = /*#__PURE__*/function () {
  function HubLogger(options) {
    var _options$labels;

    if (options === void 0) {
      options = {};
    }

    this.sizeLimit = this.getSizeLimit(options.sizeLimit);
    this.globalLabels = (_options$labels = options.labels) != null ? _options$labels : {};
    var consoleTransport = new winston.transports.Console({
      level: options.level || 'info',
      format: winston.format.printf(function (data) {
        return data.message;
      }),
      // handle uncaught node exceptions
      handleExceptions: true,
      // handle uncaught promise rejections
      handleRejections: true
    });
    this.winstonLogger = winston.createLogger({
      transports: [consoleTransport]
    });
  }

  var _proto = HubLogger.prototype;

  _proto.log = function log(level, status, data) {
    var timestamp = new Date();
    var formatted = formatLog(level, timestamp, status, Object.assign({}, this.globalLabels, data));

    if (formatted.length > this.sizeLimit) {
      this.warn('oversize-log-truncated', {
        timestamp: timestamp.toISOString()
      });
      formatted = ("TOO LONG TRUNCATED " + formatted.slice(0, this.sizeLimit)).trim();
    }

    this.winstonLogger[level](formatted);
  };

  _proto.getSizeLimit = function getSizeLimit(sizeLimit) {
    var _sizeLimit;

    var lowerLimit = 100;
    var upperLimit = 200 * 1000; // 200 KB

    sizeLimit = (_sizeLimit = sizeLimit) != null ? _sizeLimit : upperLimit;

    if (sizeLimit < lowerLimit) {
      // apply a lower limit to avoid truncating any meaningful information
      return lowerLimit;
    } else if (sizeLimit > upperLimit) {
      // apply a upper limit to satisfy AWS CloudWatch log size limit
      return upperLimit;
    } else {
      return sizeLimit;
    }
  }
  /**
   * Print a info-level log.
   * @param status log status string
   * @param data log data
   */
  ;

  _proto.info = function info(status, data) {
    this.log('info', status, data);
  }
  /**
   * Print a debug-level log.
   * @param status log status string
   * @param data log data
   */
  ;

  _proto.debug = function debug(status, data) {
    this.log('debug', status, data);
  }
  /**
   * Print a warn-level log.
   * @param status log status string
   * @param data log data
   */
  ;

  _proto.warn = function warn(status, data) {
    this.log('warn', status, data);
  }
  /**
   * Print an error-level log.
   * @param status log status string
   * @param dataOrError log data or an Error object
   */
  ;

  _proto.error = function error(status, dataOrError) {
    var data;

    if (dataOrError instanceof Error) {
      var error = dataOrError;
      data = {
        errorName: error.name,
        errorMessage: error.message
      };

      if (error.stack) {
        data.source = getErrorSource(error.stack);
      }
    } else {
      data = dataOrError;
    }

    this.log('error', status, data);
  };

  return HubLogger;
}();
/**
 * Find out the problematic line in the source code by analyzing the error stack.
 * @param trace Error stack trace
 * @returns the path of the problematic file and the line number
 * @example 'at request (/opt/my-service/utils/request.js:91:23)'
 */

function getErrorSource(trace) {
  if (trace === void 0) {
    trace = '';
  }

  var filenameAndLineNumber = /(.+?\.js):(\d+):\d+/;
  var line = trace.split('\n').find(function (line) {
    return filenameAndLineNumber.test(line);
  }) || '';
  return line.trim();
}
/**
 * Format log parameters into a log string. This method accepts the same parameters as the ones for
 * the logger methods and can be used to generate log message for testing.
 * @param level log level
 * @param timestamp
 * @param status log status
 * @param data optional log data
 * @returns an one-line log string
 * @example 'level="info" status="http-request-succeed" timestamp="..."'
 */

function formatLog(level, timestamp, status, data) {
  if (data === void 0) {
    data = {};
  }

  return Object.entries(_extends({
    level: level,
    timestamp: timestamp.toISOString(),
    status: status
  }, data)) // this properly formats objects and wraps strings in double quotes
  .map(function (_ref) {
    var key = _ref[0],
        value = _ref[1];
    return key + "=" + JSON.stringify(value);
  }).join(' ');
}

exports.HubLogger = HubLogger;
exports.formatLog = formatLog;
exports.getErrorSource = getErrorSource;
//# sourceMappingURL=hub-logger.cjs.development.js.map
