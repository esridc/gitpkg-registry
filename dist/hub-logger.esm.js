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
    if (options === void 0) {
      options = {};
    }

    this.options = options;
    var consoleTransport = new winston.transports.Console({
      // show info log and above by default
      level: options.level || 'info',
      format: winston.format.printf(winstonFormat),
      // handle uncaught node exceptions
      handleExceptions: true
    });
    this.winstonLogger = winston.createLogger({
      transports: [consoleTransport]
    });
  }

  var _proto = HubLogger.prototype;

  _proto.log = function log(level, status, data) {
    var message = {
      status: status
    };
    var logData = Object.assign({}, this.options.labels, data); // only add the data if exists

    if (Object.keys(logData).length > 0) {
      message.data = logData;
    }

    this.winstonLogger[level](message);
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

function winstonFormat(data) {
  return formatLog(data.level, data.message.status, data.message.data);
}
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
 * @param timestamp log time
 * @param status log status
 * @param data optional log data
 * @returns an one-line log string
 * @example 'level="info" status="http-request-succeed" timestamp="..."'
 */

function formatLog(level, status, data) {
  if (data === void 0) {
    data = {};
  }

  var timestamp = new Date().toISOString();
  return Object.entries(_extends({
    level: level,
    timestamp: timestamp,
    status: status
  }, data)) // this properly formats objects and wraps strings in double quotes
  .map(function (_ref) {
    var key = _ref[0],
        value = _ref[1];
    return key + "=" + JSON.stringify(value);
  }).join(' ');
}

export { HubLogger, formatLog, getErrorSource };
//# sourceMappingURL=hub-logger.esm.js.map
