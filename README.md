# nestjs-hub-logger-service

This service implements the [Hub logging pattern](https://confluencewikidev.esri.com/x/IIG9Bg) based on the [hub-logger](https://devtopia.esri.com/dc/hub-logger) library and makes it available out-of-box in a [NestJS](https://nestjs.com/) application.

The service implement the `LoggerService` interface and can be used to replace the built-in logger.

## Installation

This library is published with [gitpkg](https://github.com/ramasilveyra/gitpkg) as git tags. You need to install it with the tag name [here](https://devtopia.esri.com/dc/nestjs-hub-logger-service/tags).

```
npm install git@devtopia.esri.com:dc/nestjs-hub-logger-service.git#nestjs-hub-logger-service-v0.x.0-gitpkg
```

## Usage

You can simply inject the logger service during the nestjs app startup.

``` typescript
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HubLoggerService } from 'nestjs-hub-logger-service';

const app = await NestFactory.create(AppModule, {
  logger: new HubLoggerService()
});

await app.listen(3000);
```

## Documentation

Please read the comments in the source code or build the doc pages with `npm run build:doc`.

## Release

The whole release process has been automated. After the code and changelog are committed, simply run the `npm version` command and it will publish the new version in a git tag.