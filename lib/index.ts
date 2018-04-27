/**
 * Tiny TypeScript Logger
 * v2.0.0
 */
export type consoleArgument = string | number | boolean | symbol | object;
export enum LEVEL { OFF = 5, ALL = 0, TRACE = 0, LOG, INFO, WARN, ERROR, FATAL }
const modules: { [moduleName: string]: Logger } = {};
const modulesMap: Map<Logger, { level: LEVEL; moduleName: string }> = new Map();
let loggerLevel: LEVEL = LEVEL.ALL;

export class Logger {
    public static readonly global: Logger = modules.global = new Logger('global');

    protected constructor(moduleName: string) {
        modulesMap.set(this, { moduleName, level: LEVEL.ALL });
    }

    // tslint:disable-next-line
    public static parseMessage(_moduleName: string, _level: LEVEL, _logger: Logger): string {
        return '';
    }

    public static setGlobalLevel(level: LEVEL = loggerLevel): LEVEL {
        return loggerLevel = level;
    }

    public static create<T extends Logger>(this: typeof Logger, moduleName: string): T {
        return <T>modules[moduleName] || (modules[moduleName] = <T>new this(moduleName));
    }

    public get level(): LEVEL {
        return modulesMap.get(this).level;
    }

    public get moduleName(): string {
        return modulesMap.get(this).moduleName;
    }

    public setLevel(level: LEVEL): this {
        modulesMap.get(this).level = level;

        return this;
    }

    public trace(...args: consoleArgument[]): void {
        this.logWithLevel(LEVEL.TRACE, args);
    }

    public log(...args: consoleArgument[]): void {
        this.logWithLevel(LEVEL.LOG, args);
    }

    public info(...args: consoleArgument[]): void {
        this.logWithLevel(LEVEL.INFO, args);
    }

    public warn(...args: consoleArgument[]): void {
        this.logWithLevel(LEVEL.WARN, args);
    }

    public error(...args: consoleArgument[]): void {
        this.logWithLevel(LEVEL.ERROR, args);
    }

    public fatal(...args: consoleArgument[]): void {
        this.makeLog(LEVEL.FATAL, args);
    }

    public clear(): void {
        console.clear();
    }

    public isValid(level: LEVEL): boolean {
        return level >= loggerLevel && level >= this.level;
    }

    protected logWithLevel(level: LEVEL, args: consoleArgument[]): void {
        if (this.isValid(level)) {
            this.makeLog(level, args);
        }
    }

    protected makeLog(level: LEVEL, args: consoleArgument[]): consoleArgument[] {
        const consoleArgs: consoleArgument[] = [this.parseMessage(level), ...args];

        switch (level) {
            case LEVEL.FATAL:
                console.error(...consoleArgs);
                break;
            default:
                (<any>console)[LEVEL[level].toLowerCase()](...consoleArgs);
        }

        return consoleArgs;
    }

    protected parseMessage(level: LEVEL): string {
        return (<typeof Logger>this.constructor).parseMessage(this.moduleName, level, this);
    }
}
