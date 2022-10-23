# Changelog

## Unreleased

## 2.0.0 - 2022-10-23

### Changed

* Update dependencies to match nestjs v8
* Use node v16 to build code

## 1.4.0 - 2021-11-30

### Added

* New `json()` method for json object logging

### Changed

* Bump `hub-logger` to v0.5.0

### Fixed

* `HubLoggerService` was not decorated as injectable.

## 1.3.3 - 2021-11-09

### Changed

* Bump version for hub-logger

## 1.3.2 - 2021-11-01

### Changed

* Use node v14 for package compatibility

## 1.3.1 - 2021-11-01

### Fixed

* Accidentally dropped support to nestjs v7

## 1.3.0 - 2021-11-01

### Added

* Method `createRequestLogger()` to create the request logging middleware.

## 1.2.0 - 2021-07-27

### Changed

* Now support both nestjs v7 and v8


## 1.1.1 - 2021-07-22

### Changed

* Export missing interfaces for logger options


## 1.1.0 - 2021-07-14

### Changed

* Full error trace is printed for the error log

## 1.0.0 - 2021-07-08

### Changed

* [breaking] support nestjs v8

## 0.1.2 - 2021-05-26

### Fixed

* Missing `gitpkg` dependency

## 0.1.0 - 2021-05-25

Initial release