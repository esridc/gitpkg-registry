import { DynamicModule } from '@nestjs/common';
import { HealthCheckOptions } from './health.controller';
export declare class HealthModule {
    static forRoot(options?: HealthCheckOptions): DynamicModule;
}
