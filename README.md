# nestjs-hub-logger-service

This service implements the [Hub logging pattern](https://confluencewikidev.esri.com/x/IIG9Bg) based on the [hub-logger](https://devtopia.esri.com/dc/hub-logger) library and makes it available out-of-box in a [NestJS](https://nestjs.com/) application.

The service implement the `LoggerService` interface and can be used to replace the built-in logger.

## Installation

This library is published with [gitpkg](https://github.com/ramasilveyra/gitpkg) as git tags. You need to install it with the tag name [here](https://github.com/esridc/gitpkg-registry/tags).

```
npm install git@github.com:esridc/nestjs-hub-logger-service.git#nestjs-hub-logger-service-v0.x.0-gitpkg
```

## Usage Example

You can simply add the logger service during the nestjs application initialization.

``` typescript
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HubLoggerService } from 'nestjs-hub-logger-service';

const loggerService = new HubLoggerService()

// initialize the app with the logger directly
const app = await NestFactory.create(AppModule, {
  logger: loggerService
});

// or set the logger after app creation
// app.useLogger(loggerService)

await app.listen(3000);
```

Like any other utility service, the logger service can be injected anywhere in the application, like a route service:

``` typescript
import { Injectable } from '@nestjs/common';
import { HubLoggerService } from 'nestjs-hub-logger-service';

@Injectable()
export class MyService {
  constructor(private logger: HubLoggerService) {
  }

  findAll(): any {
    this.logger.info('request-received');
    return ['foo', 'bar'];
  }
}
```

## Documentation

Please read the comments in the source code or build the doc pages with `npm run build:doc`.

## Release

The whole release process has been automated. After the code and changelog are committed, simply run the `npm version` command and it will publish the new version in a git tag.