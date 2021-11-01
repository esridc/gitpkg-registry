# Changelog

## Unreleased

## 0.4.2 - 2021-11-01

### Changed
* Use node v14 for package compatibility

## 0.4.1 - 2021-11-01

### Fixed
* An `import()` bug for winston in TypeScript, see https://github.com/winstonjs/winston/issues/1575

## 0.4.0 - 2021-11-01

### Added
* New method `createRequestLogger()`  for HTTP request logging ([#5](https://devtopia.esri.com/dc/hub-logger/pull/5))

### Changed
* Update dependencies

## 0.3.2 - 2021-09-01

### Fixed
* The `prepare` npm script was running in CI and could break the docker image build process.

## 0.3.1 - 2021-08-31

### Changed
* Print a warning if a log message is truncated
* Apply a valid range for the size limit value

## 0.3.0 - 2021-08-30

### Added
* Customizable log size limit ([#3](https://devtopia.esri.com/dc/hub-logger/pull/3))

## 0.2.0 - 2021-05-24

### Added
* Allow to use global log labels

### Changed
* Allow undefined values in the log data

## 0.1.1 - 2021-05-21

### Fixed
* Missing export for the `getErrorSource` method

## 0.1.0 - 2021-05-21

Inital release