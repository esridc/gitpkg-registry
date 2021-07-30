import { ModuleRef } from '@nestjs/core';
import { OnModuleInit } from '@nestjs/common';
import { HealthCheckService, HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';
export declare type DatabaseCheckDef = {
    /**
     * Health check type
     */
    type: 'database';
};
export declare type CheckDef = DatabaseCheckDef;
export declare type HealthCheckOptions = {
    /**
     * Health checks
     */
    checks: CheckDef[];
};
declare type HealthChecker = () => Promise<HealthIndicatorResult>;
export declare class HealthController implements OnModuleInit {
    private health;
    private modelRef;
    private options?;
    checkers?: HealthChecker[];
    constructor(health: HealthCheckService, modelRef: ModuleRef, options?: HealthCheckOptions | undefined);
    onModuleInit(): Promise<void>;
    check(): Promise<HealthCheckResult>;
    getChecker(definition: CheckDef): Promise<HealthChecker>;
}
export {};
