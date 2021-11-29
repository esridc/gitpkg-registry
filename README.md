# hub-logger

A low-level and framework-agnostic logger that implements the Hub-wide logging pattern and formats for backend services. This is developed on the top of [winston](https://github.com/winstonjs/winston) with Hub-specific parsing and formatting logic.

More discussion about the logging pattern is at the confluence page [Logging](https://confluencewikidev.esri.com/display/Hub/Logging).

## Installation

This library is published with [gitpkg](https://github.com/ramasilveyra/gitpkg) as git tags. You need to install it with the tag name ([here](https://github.com/esridc/gitpkg-registry/tags))

```
npm install https://github.com/esridc/gitpkg-registry.git#hub-logger-v0.x.x-gitpkg
```

## Usage

### Simple Example

This example shows how to create a logger and logs with different levels.

``` typescript
import { HubLogger } from 'hub-logger'

const logger = new HubLogger()

logger.debug('node-started')

logger.info('app-started')

logger.warn('database-query-executed', {
  query: 'SELECT * FROM jobs'
})

logger.error('data-processing-failed', new Error('failure cause'))
```

### HTTP Request Logging

This example shows how to create an expressjs middleware to log http request status. This feature is based on [morgan](https://github.com/expressjs/morgan).

``` typescript
import { HubLogger } from 'hub-logger'
import express from 'express'

const logger = new HubLogger()
const app = express()
  .use(logger.createRequestLogger())
  .get('/test', function(_, res) {
    res.status(500).send();
  });

app.listen(3000)

// when a GET request is received, it will log a message:
// level="error" timestamp="2021-01-01T00:00:00.000Z" status="request-failed" method="GET" url="/test" statusCode=500 responseTime=0.75
```

### JSON Object Logging

General logging methods in the logger doesn't accept nested JSON objects. It is not encouraged to log a JSON object in production environment because there is a risk to introduce oversize or difficult-to-format objects. 

However, directly logging an object is valuable during development and debugging. To satisfy the need of quick JSON logging, a separate `json()` method can be used. This method by default uses the `debug` log level and doesn't have any size limit for messages.

``` typescript
import { HubLogger } from 'hub-logger'

const logger = new HubLogger({
  // the HubLogger must use `debug` level to log json object, otherwise, the
  // developer should specify a log level at the json() call
  level: 'debug'
})

const user = {
  id: 'test-id',
  profile: {
    firstName: 'foo',
    lastName: 'bar'
  }
}

logger.json(user, {
  // optionally prettify output
  pretty: true,
  // optionally change log level
  level: 'info'
})
```

## Documentation

Please read the comments in the source code or build the doc pages with `npm run build:doc`.

## Release

The whole release process has been automated. After the code and changelog are committed, simply run the `npm version` command and it will publish the new version in a git tag.
