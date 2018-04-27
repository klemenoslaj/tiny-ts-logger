/**
 * Tiny TypeScript Logger
 * v2.0.0
 */
export declare type consoleArgument = string | number | boolean | symbol | object;
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
    protected constructor(moduleName: string);
    static parseMessage(_moduleName: string, _level: LEVEL, _logger: Logger): string;
    static setGlobalLevel(level?: LEVEL): LEVEL;
    static create<T extends Logger>(this: typeof Logger, moduleName: string): T;
    readonly level: LEVEL;
    readonly moduleName: string;
    setLevel(level: LEVEL): this;
    trace(...args: consoleArgument[]): void;
    log(...args: consoleArgument[]): void;
    info(...args: consoleArgument[]): void;
    warn(...args: consoleArgument[]): void;
    error(...args: consoleArgument[]): void;
    fatal(...args: consoleArgument[]): void;
    clear(): void;
    isValid(level: LEVEL): boolean;
    protected logWithLevel(level: LEVEL, args: consoleArgument[]): void;
    protected makeLog(level: LEVEL, args: consoleArgument[]): consoleArgument[];
    protected parseMessage(level: LEVEL): string;
}
