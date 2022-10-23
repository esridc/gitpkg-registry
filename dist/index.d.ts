/// <reference types="node" />
import { LoggerService } from '@nestjs/common';
import { HubLogger, IHubLoggerOptions, IJsonLoggingOptions, LogLevel } from 'hub-logger';
/**
 * A hub logger service for nestjs
 */
declare class HubLoggerService implements LoggerService {
    hubLogger: HubLogger;
    constructor(options?: IHubLoggerOptions);
    /**
     * Log an info level messgae.
     * @param message log message
     */
    log(message: string): void;
    /**
     * Log an error level message.
     * @param message log message
     * @param trace error trace
     */
    error(message: string, trace: string): void;
    /**
     * Log a warn level message.
     * @param message log message
     */
    warn(message: string): void;
    /**
     * Log a debug level message.
     * @param message log message
     */
    debug(message: string): void;
    /**
     * A dummy function that actually logs a debug level message.
     * @param message log message
     */
    verbose(message: string): void;
    /**
     * Log a json object for debugging.
     * @param data json data
     * @param options logging options
     */
    json(data: any, options?: IJsonLoggingOptions): void;
    /**
     * Create an expressjs middleware for HTTP request logging.
     * @returns a logger middleware
     */
    createRequestLogger(): (req: import("http").IncomingMessage, res: import("http").ServerResponse, callback: (err?: Error | undefined) => void) => void;
}
export { HubLoggerService, IHubLoggerOptions, IJsonLoggingOptions, LogLevel };
