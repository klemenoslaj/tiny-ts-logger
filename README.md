# tiny-ts-logger
TypeScript logger with the support of multiple modules at different log levels

## Installation
```
npm install tiny-ts-logger
yarn add tiny-ts-logger
```

## Usage

#### Using global logger
```javascript
import { Logger } from 'tiny-ts-logger';

Logger.global.log('This is log message');
Logger.global.error('And this is error message');
```

#### Using module specific logger

```javascript
import { Logger } from 'tiny-ts-logger';

const moduleLogger = Logger.create('moduleName');

moduleLogger.log('This is log message');
moduleLogger.error('And this is error message');
```

#### Adjusting global log level
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.create('moduleName');

Logger.setGlobalLevel(LEVEL.WARN);

globalLogger.log('This log message will be ignored! WARN > LOG');
moduleLogger.log('This log message will be ignored! WARN > LOG');

globalLogger.warn('This log message will be logged! WARN == WARN');
moduleLogger.error('This log message will be logged! WARN < ERROR');
```

#### Adjusting module log level
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.create('moduleName');

moduleLogger.setLevel(LEVEL.WARN);

globalLogger.log('This log message will be logged! Not affected by module level');
moduleLogger.log('This log message will be ignored! WARN > LOG');
moduleLogger.error('This log message will be logged! WARN == WARN');
```

#### Check if log will be ignored
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.create('moduleName');

moduleLogger.level(LEVEL.WARN);

if (!moduleLogger.isValid(LEVEL.LOG)) {
    // moduleLogger.log() will be ignored
}
```

## Extensibility
```javascript
import { Logger, consoleArgument } from 'tiny-ts-logger';

/**
 * This class demonstrates a simple derived class from base Logger
 */
class CustomLogger extends Logger {
    /**
     * Overriding the default name of global logger
     */
    public static get global(this: typeof CustomLogger): Logger {
        return this.create('custom-global-name');
    }

    /**
     * Overriding the standard(empty) parse message,
     * that gets atached in front of every log message
     */
    public static parseMessage(moduleName: string, level: LEVEL, _logger: CustomLogger): string {
        return `[${moduleName}] - ${LEVEL[level]} - `;
    }

    /**
     * Overriding the standard method with a custom behavior
     */
    public log(...args: consoleArgument[]): void {
        // Now intentionally ignoring validity of log level
        this.makeLog(LEVEL.LOG, args);
    }

    /**
     * Overriding the standard isValid check to allow logging
     * of current active level only
     */
    public isValid(level: LEVEL): boolean {
        return level === this.level;
    }

    /**
     * Overriding the standard logging mechanism.
     * For LEVEL.FATAL we call alert() instead of console.error()
     */
    protected makeLog(level: LEVEL, args: consoleArgument[]): consoleArgument[] {
        const consoleArgs: consoleArgument[] = [this.parseMessage(level), ...args];

        switch (level) {
            case LEVEL.FATAL:
                alert(consoleArgs.join(', '));
                break;
            default:
                console[LEVEL[level].toLowerCase()](...consoleArgs);
        }

        return consoleArgs;
    }
}
```

## Log levels
Log level will block all logs that have smaller priority than the specified level.

| Level      | Priority   |
|------------| :---------:|
| `ALL`      | **0**      |
| `TRACE`    | **0**      |
| `LOG`      | **1**      |
| `INFO`     | **2**      |
| `WARN`     | **3**      |
| `ERROR`    | **4**      |
| `FATAL`    | **5**      |
| `OFF`      | **5**      |
