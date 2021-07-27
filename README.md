# nestjs-hub-health-check

A [nestjs](https://nestjs.com/) module that auto-creates the health check endpoint and implements Hub's health check practices:

* Verify application responseiveness
* Verify dependency connections: Database

This module is developed with [@nestjs/terminus](https://github.com/nestjs/terminus) and see this [documentation](https://docs.nestjs.com/recipes/terminus#healthchecks-terminus) for more explaination.

## Installation

This package is an internal package and published with [gitpkg](https://github.com/ramasilveyra/gitpkg). You can need to install it with the tag URL.

```
npm install http://github.com/esridc/gitpkg-registry.git#nestjs-hub-health-check-v0.x.0-gitpkg
```

You can find the available versions in the gitpkg registry's [Tags](https://github.com/esridc/gitpkg-registry/tags) page.

## Usage

The library exports a dynamic module `HealthModule` and can be directly imported into the app module.

``` typescript
import { HealthModule } from 'nestjs-hub-health-check';

@Module({
  imports: [
    HealthModule.forRoot()
  ]
})
export class AppModule implements NestModule {}
```

This module will create a `/health` endpoint in the root domain and perform a health check when the endpoint is called.

## Configuration

You can provide optional configuration to cutomize the health check.

``` typescript
import { HealthModule } from 'nestjs-hub-health-check';

@Module({
  imports: [
    HealthModule.forRoot({
      // optional configuration
      
      // an array of extra check definitions
      checks: []
    })
  ]
})
export class AppModule implements NestModule {}
```

### Defining additional checks

By default, the health check endpoint only verify the liveness of the service. To define additional checks for dependency connections, you need to add the definition in the `checks` array.

#### Database connection check

This is defined by the `database` type check. It utilizes the [@nestjs/typeorm](https://github.com/nestjs/typeorm) library and re-uses the database connection in the service.

``` typescript
import { HealthModule } from 'nestjs-hub-health-check';

@Module({
  imports: [
    HealthModule.forRoot({
      checks: [
        {
          type: 'database'
        }
      ]
    })
  ]
})
export class AppModule implements NestModule {}
```

## Response

When the healtch check succeeds, the endpoint returns a 200 response with the following body

``` javascript
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

If the health check fails, the response will be 500 with a body like

``` javascript
{
  "status": "error",
  "info": {},
  "error": {
    // ... detail error messages
  },
  "details": {}
}
```
