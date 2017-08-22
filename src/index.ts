/**
 * Tiny TypeScript Logger
 * v1.0.0
 */
export type consoleArgument = string | number | boolean | symbol | object;
export type createMethod = (methodName: string) => Logger;
export enum LEVEL { OFF = 5, ALL = 0, TRACE = 0, LOG, INFO, WARN, ERROR, FATAL }
const modules: { [moduleName: string]: Logger } = {};
const modulesMap: Map<Logger, { level: LEVEL; moduleName: string; }> = new Map();
let loggerLevel: LEVEL = LEVEL.ALL;

export class Logger {
    public static readonly global: Logger = modules.global = new Logger('global');

    constructor(moduleName: string) {
        modulesMap.set(this, { moduleName, level: LEVEL.ALL });
    }

    // tslint:disable-next-line
    public static PARSE_MESSAGE(_moduleName: string, _level: LEVEL, _logger: Logger): string {
        return '';
    }

    public static readonly CLEAR = (): void => console.clear();
    public static readonly SET_GLOBAL_LEVEL = (level: LEVEL = loggerLevel): LEVEL => loggerLevel = level;
    public static readonly CREATE: createMethod = function (this: typeof Logger, moduleName: string): Logger {
        return modules[moduleName] || (modules[moduleName] = new this(moduleName));
    };

    public level(level: LEVEL): this {
        modulesMap.get(this).level = level;

        return this;
    }

    public trace(...args: consoleArgument[]): boolean {
        return this.logIfValid(LEVEL.TRACE, args);
    }

    public log(...args: consoleArgument[]): boolean {
        return this.logIfValid(LEVEL.LOG, args);
    }

    public info(...args: consoleArgument[]): boolean {
        return this.logIfValid(LEVEL.INFO, args);
    }

    public warn(...args: consoleArgument[]): boolean {
        return this.logIfValid(LEVEL.WARN, args);
    }

    public error(...args: consoleArgument[]): boolean {
        return this.logIfValid(LEVEL.ERROR, args);
    }

    public fatal(...args: consoleArgument[]): boolean {
        console.error(this.parsePrefix(LEVEL.FATAL), ...args);

        return true;
    }

    protected parsePrefix(level: LEVEL): string {
        return (<typeof Logger>this.constructor).PARSE_MESSAGE(modulesMap.get(this).moduleName, level, this);
    }

    private logIfValid(level: LEVEL, args: consoleArgument[]): boolean {
        const isValid: boolean = level >= loggerLevel && level >= modulesMap.get(this).level;

        if (isValid) {
            console[LEVEL[level].toLowerCase()](this.parsePrefix(level), ...args);
        }

        return isValid;
    }
}
