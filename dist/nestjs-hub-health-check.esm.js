import { __decorate, __metadata, __param } from 'tslib';
import { Get, Controller, Inject, Module } from '@nestjs/common';
import { TypeOrmHealthIndicator, HealthCheck, HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { ModuleRef } from '@nestjs/core';

var HEALTH_CHECK_OPTIONS = 'HEALTH_CHECK_OPTIONS';

var HealthController = /*#__PURE__*/function () {
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
        var db = this.modelRef.get(TypeOrmHealthIndicator);
        return function () {
          return db.pingCheck('database');
        };

      default:
        throw new Error("Invalid health check type \"" + definition.type + "\"");
    }
  };

  return HealthController;
}();

__decorate([Get(), HealthCheck(), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", Promise)], HealthController.prototype, "check", null);

HealthController = /*#__PURE__*/__decorate([/*#__PURE__*/Controller('health'), /*#__PURE__*/__param(2, /*#__PURE__*/Inject(HEALTH_CHECK_OPTIONS)), /*#__PURE__*/__metadata("design:paramtypes", [HealthCheckService, ModuleRef, Object])], HealthController);

var HealthModule_1;

var HealthModule = HealthModule_1 = /*#__PURE__*/function () {
  function HealthModule() {}

  HealthModule.forRoot = function forRoot(options) {
    return {
      module: HealthModule_1,
      controllers: [HealthController],
      imports: [TerminusModule],
      providers: [{
        provide: HEALTH_CHECK_OPTIONS,
        useValue: options
      }]
    };
  };

  return HealthModule;
}();

HealthModule = HealthModule_1 = /*#__PURE__*/__decorate([/*#__PURE__*/Module({})], HealthModule);

export { HealthController, HealthModule };
//# sourceMappingURL=nestjs-hub-health-check.esm.js.map
