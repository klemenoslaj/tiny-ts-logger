/**
 * Tiny TypeScript Logger
 * v1.0.0
 */
export declare type consoleArgument = string | number | boolean | symbol | object;
export declare type createMethod = (methodName: string) => Logger;
export declare enum LEVEL {
    OFF = 5,
    ALL = 0,
    TRACE = 0,
    LOG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
}
export declare class Logger {
    static readonly global: Logger;
    constructor(moduleName: string);
    static PARSE_MESSAGE(_moduleName: string, _level: LEVEL, _logger: Logger): string;
    static readonly CLEAR: () => void;
    static readonly SET_GLOBAL_LEVEL: (level?: LEVEL) => LEVEL;
    static readonly CREATE: createMethod;
    level(level: LEVEL): this;
    trace(...args: consoleArgument[]): boolean;
    log(...args: consoleArgument[]): boolean;
    info(...args: consoleArgument[]): boolean;
    warn(...args: consoleArgument[]): boolean;
    error(...args: consoleArgument[]): boolean;
    fatal(...args: consoleArgument[]): boolean;
    protected parsePrefix(level: LEVEL): string;
    private logIfValid(level, args);
}
