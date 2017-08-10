/**
 * Tiny Logger
 * v1.0.0
 */
export type consoleArgument = string | number | boolean | symbol | object;
export enum LEVEL { OFF = 5, ALL = 0, TRACE = 0, DEBUG, INFO, WARN, ERROR, FATAL }
const modules: {[moduleName: string]: Logger} = {};
const modulesMap: Map<Logger, { level: LEVEL; moduleName: string; }> = new Map();

let loggerLevel: LEVEL = LEVEL.ALL;

export class Logger {
    public static readonly LEVEL: typeof LEVEL = LEVEL;
    public static readonly global: Logger = modules.global = new Logger('global');

    constructor(moduleName: string) {
        modulesMap.set(this, { moduleName, level: LEVEL.ALL });
    }

    // tslint:disable-next-line
    public static PARSE_MESSAGE(_moduleName: string, _level: LEVEL, _logger: Logger): string {
        return '';
    }

    public static readonly level = (level: LEVEL = loggerLevel): LEVEL => loggerLevel = level;
    public static readonly create = (moduleName: string): Logger => modules[moduleName] || (modules[moduleName] = new Logger(moduleName));

    public level(level: LEVEL): this {
        modulesMap.get(this).level = level;

        return this;
    }

    public trace(...args: consoleArgument[]): this {
        if (this.isLevelValid(LEVEL.TRACE)) {
            console.trace(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.TRACE, this), ...args);
        }

        return this;
    }

    public debug(...args: consoleArgument[]): this {
        if (this.isLevelValid(LEVEL.DEBUG)) {
            console.log(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.DEBUG, this), ...args);
        }

        return this;
    }

    public info(...args: consoleArgument[]): this {
        if (this.isLevelValid(LEVEL.INFO)) {
            console.info(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.INFO, this), ...args);
        }

        return this;
    }

    public warn(...args: consoleArgument[]): this {
        if (this.isLevelValid(LEVEL.WARN)) {
            console.warn(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.WARN, this), ...args);
        }

        return this;
    }

    public error(...args: consoleArgument[]): this {
        if (this.isLevelValid(LEVEL.ERROR)) {
            console.error(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.ERROR, this), ...args);
        }

        return this;
    }

    public fatal(...args: consoleArgument[]): this {
        console.error(Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.FATAL, this), ...args);

        return this;
    }

    public isLevelValid(level: LEVEL): boolean {
        return level >= loggerLevel && level >= modulesMap.get(this).level;
    }
}
