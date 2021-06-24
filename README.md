# hub-logger

A low-level and framework-agnostic logger that implements the Hub-wide logging pattern and formats for backend services. This is developed on the top of [winston](https://github.com/winstonjs/winston) with Hub-specific parsing and formatting logic.

More discussion about the logging pattern is at [this confluence page](https://confluencewikidev.esri.com/display/Hub/Logging).

## Installation

This library is published with [gitpkg](https://github.com/ramasilveyra/gitpkg) as git tags. You need to install it with the tag name ([here](https://github.com/esridc/gitpkg-registry/tags))

```
npm install git@github.com:esridc/hub-logger.git#hub-logger-v0.x.0-gitpkg
```

## Usage

``` typescript
import { HubLogger } from 'hub-logger'

const logger = new HubLogger()

logger.info('app-started')

logger.warn('database-query-slow', {
  query: 'SELECT * FROM jobs'
})

logger.error('get-request-failed', new Error('failure cause'))
```

## Documentation

Please read the comments in the source code or build the doc pages with `npm run build:doc`.

## Release

The whole release process has been automated. After the code and changelog are committed, simply run the `npm version` command and it will publish the new version in a git tag.