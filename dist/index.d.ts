import { LoggerService } from '@nestjs/common';
import { HubLogger, IHubLoggerOptions } from 'hub-logger';
export declare class HubLoggerService implements LoggerService {
    hubLogger: HubLogger;
    constructor(options?: IHubLoggerOptions);
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
