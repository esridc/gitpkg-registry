import morgan from 'morgan';

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

// https://github.com/winstonjs/winston/issues/1575
// eslint-disable-next-line @typescript-eslint/no-var-requires

var winston = /*#__PURE__*/require('winston'); // higher value means the log level is more important


var LOG_LEVEL_SEVERITY = {
  error: 4,
  warn: 3,
  info: 2,
  debug: 1
};
var HubLogger = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function HubLogger(options) {
    var _options$labels, _options$level;

    if (options === void 0) {
      options = {};
    }

    this.sizeLimit = this.getSizeLimit(options.sizeLimit);
    this.globalLabels = (_options$labels = options.labels) != null ? _options$labels : {};
    this.level = (_options$level = options.level) != null ? _options$level : 'info';
    var consoleTransport = new winston.transports.Console({
      level: this.level,
      format: winston.format.printf(function (data) {
        return data.message;
      }),
      // handle uncaught node exceptions
      handleExceptions: true,
      // handle uncaught promise rejections
      // (using ts-ignore because the current type definition misses this option, see https://github.com/winstonjs/winston/issues/1927)
      // @ts-ignore
      handleRejections: true
    });
    this.winstonLogger = winston.createLogger({
      transports: [consoleTransport]
    });
  }
  /**
   * Private Methods
   */


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
    var upperLimit = 200000; // 200 KB

    sizeLimit = (_sizeLimit = sizeLimit) != null ? _sizeLimit : upperLimit;

    if (sizeLimit < lowerLimit) {
      // apply a lower limit to avoid truncating any meaningful information
      return lowerLimit;
    }

    if (sizeLimit > upperLimit) {
      // apply a upper limit to satisfy AWS CloudWatch log size limit
      return upperLimit;
    }

    return sizeLimit;
  }
  /**
   * Public Methods
   */

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
  }
  /**
   * Print a JSON data object for debugging. The default log level is debug and it doesn't have message size limit.
   * @param data JSON data object
   * @param options logging options
   */
  ;

  _proto.json = function json(data, options) {
    var _options$level2, _options, _options2;

    if (options === void 0) {
      options = {
        level: 'debug'
      };
    }

    var logLevel = (_options$level2 = (_options = options) == null ? void 0 : _options.level) != null ? _options$level2 : 'debug'; // explicitly skip the expensive stringification if possible

    if (!this.shouldLog(logLevel)) {
      return;
    }

    var message = (_options2 = options) != null && _options2.pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
    this.winstonLogger[logLevel](message);
  }
  /**
   * Check if a message with the given log level should be logged.
   * @param level log level
   * @returns
   */
  ;

  _proto.shouldLog = function shouldLog(level) {
    return LOG_LEVEL_SEVERITY[level] >= LOG_LEVEL_SEVERITY[this.level];
  };

  _proto.getRequestLogLevel = function getRequestLogLevel(status) {
    if (!status || status >= 500) {
      return 'error';
    }

    if (status >= 400) {
      return 'warn';
    }

    return 'debug';
  };

  _proto.getRequestLogStatus = function getRequestLogStatus(logLevel) {
    var status = logLevel === 'debug' ? 'succeeded' : 'failed';
    return "http-request-" + status;
  }
  /**
   * Create an Expressjs middleware for HTTP request logging.
   * @returns
   */
  ;

  _proto.createRequestLogger = function createRequestLogger(options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    var morganOptions = Object.assign({}, options, {
      skip: function skip(_, res) {
        return !_this.shouldLog(_this.getRequestLogLevel(res.statusCode));
      }
    });
    return morgan(function (tokens, req, res) {
      var method = tokens.method(req, res);
      var url = tokens.url(req, res);
      var statusCode = res.statusCode;
      var timestamp = tokens.date(req, res, 'iso');
      var responseTime = Number(tokens['response-time'](req, res));

      var logLevel = _this.getRequestLogLevel(res.statusCode);

      var logStatus = _this.getRequestLogStatus(logLevel);

      var logData = Object.assign({}, _this.globalLabels, {
        method: method,
        url: url,
        statusCode: statusCode,
        responseTime: responseTime
      });
      return formatLog(logLevel, timestamp, logStatus, logData);
    }, morganOptions);
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
 * @param timestamp log timestamp, either a Date instance or a formatted string
 * @param status log status
 * @param data optional log data
 * @returns an one-line log string
 * @example 'level="info" status="http-request-succeed" timestamp="..."'
 */

function formatLog(level, timestamp, status, data) {
  if (data === void 0) {
    data = {};
  }

  var formattedTimestamp = timestamp instanceof Date ? timestamp.toISOString() : timestamp;
  return Object.entries(_extends({
    level: level,
    timestamp: formattedTimestamp,
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
