/**
 * log level
 */
export declare type LogLevel = 'error' | 'warn' | 'info' | 'debug';
/**
 * log data
 */
export declare type LogData = {
    [label: string]: string | number | boolean | undefined;
};
/**
 * Hub logger options
 */
export interface IHubLoggerOptions {
    /**
     * Minimal log level
     */
    level?: LogLevel;
    /**
     * Global log labels that will be added into every log message
     */
    labels?: LogData;
}
export declare class HubLogger {
    winstonLogger: any;
    options: IHubLoggerOptions;
    constructor(options?: IHubLoggerOptions);
    private log;
    /**
     * Print a info-level log.
     * @param status log status string
     * @param data log data
     */
    info(status: string, data?: LogData): void;
    /**
     * Print a debug-level log.
     * @param status log status string
     * @param data log data
     */
    debug(status: string, data?: LogData): void;
    /**
     * Print a warn-level log.
     * @param status log status string
     * @param data log data
     */
    warn(status: string, data?: LogData): void;
    /**
     * Print an error-level log.
     * @param status log status string
     * @param dataOrError log data or an Error object
     */
    error(status: string, dataOrError?: LogData | Error): void;
}
/**
 * Find out the problematic line in the source code by analyzing the error stack.
 * @param trace Error stack trace
 * @returns the path of the problematic file and the line number
 * @example 'at request (/opt/my-service/utils/request.js:91:23)'
 */
export declare function getErrorSource(trace?: string): string;
/**
 * Format log parameters into a log string. This method accepts the same parameters as the ones for
 * the logger methods and can be used to generate log message for testing.
 * @param level log level
 * @param timestamp log time
 * @param status log status
 * @param data optional log data
 * @returns an one-line log string
 * @example 'level="info" status="http-request-succeed" timestamp="..."'
 */
export declare function formatLog(level: LogLevel, status: string, data?: LogData): string;
