'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var common = require('@nestjs/common');
var terminus = require('@nestjs/terminus');
var core = require('@nestjs/core');

var HEALTH_CHECK_OPTIONS = 'HEALTH_CHECK_OPTIONS';

exports.HealthController = /*#__PURE__*/function () {
  function HealthController(health, modelRef, options) {
    var _this$options$checks,
        _this$options,
        _this = this;

    this.health = health;
    this.modelRef = modelRef;
    this.options = options;
    var checkDefs = (_this$options$checks = (_this$options = this.options) == null ? void 0 : _this$options.checks) != null ? _this$options$checks : [];
    this.checkers = checkDefs.map(function (check) {
      return _this.getChecker(check);
    });
  }

  var _proto = HealthController.prototype;

  _proto.check = function check() {
    return this.health.check(this.checkers);
  };

  _proto.getChecker = function getChecker(definition) {
    switch (definition.type) {
      case 'database':
        var db = this.modelRef.get(terminus.TypeOrmHealthIndicator);
        return function () {
          return db.pingCheck('database');
        };

      default:
        throw new Error("Invalid health check type \"" + definition.type + "\"");
    }
  };

  return HealthController;
}();

tslib.__decorate([common.Get(), terminus.HealthCheck(), tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", Promise)], exports.HealthController.prototype, "check", null);

exports.HealthController = /*#__PURE__*/tslib.__decorate([/*#__PURE__*/common.Controller('health'), /*#__PURE__*/tslib.__param(2, /*#__PURE__*/common.Inject(HEALTH_CHECK_OPTIONS)), /*#__PURE__*/tslib.__metadata("design:paramtypes", [terminus.HealthCheckService, core.ModuleRef, Object])], exports.HealthController);

var HealthModule_1;

exports.HealthModule = HealthModule_1 = /*#__PURE__*/function () {
  function HealthModule() {}

  HealthModule.forRoot = function forRoot(options) {
    return {
      module: HealthModule_1,
      controllers: [exports.HealthController],
      imports: [terminus.TerminusModule],
      providers: [{
        provide: HEALTH_CHECK_OPTIONS,
        useValue: options
      }]
    };
  };

  return HealthModule;
}();

exports.HealthModule = HealthModule_1 = /*#__PURE__*/tslib.__decorate([/*#__PURE__*/common.Module({})], exports.HealthModule);
//# sourceMappingURL=nestjs-hub-health-check.cjs.development.js.map
