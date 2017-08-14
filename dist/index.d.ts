/**
 * Tiny TypeScript Logger
 * v1.0.0
 */
export declare type consoleArgument = string | number | boolean | symbol | object;
export declare enum LEVEL {
    OFF = 5,
    ALL = 0,
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
}
export declare class Logger {
    static readonly LEVEL: typeof LEVEL;
    static readonly global: Logger;
    constructor(moduleName: string);
    static PARSE_MESSAGE(_moduleName: string, _level: LEVEL, _logger: Logger): string;
    static readonly level: (level?: LEVEL) => LEVEL;
    static readonly create: (moduleName: string) => Logger;
    level(level: LEVEL): this;
    trace(...args: consoleArgument[]): this;
    debug(...args: consoleArgument[]): this;
    info(...args: consoleArgument[]): this;
    warn(...args: consoleArgument[]): this;
    error(...args: consoleArgument[]): this;
    fatal(...args: consoleArgument[]): this;
    isLevelValid(level: LEVEL): boolean;
}
