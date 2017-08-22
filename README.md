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

const moduleLogger = Logger.CREATE('moduleName');

moduleLogger.log('This is log message');
moduleLogger.error('And this is error message');
```

#### Adjusting global log level
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.CREATE('moduleName');

Logger.SET_GLOBAL_LEVEL(LEVEL.WARN);

globalLogger.log('This log message will be ignored! WARN > LOG');
moduleLogger.log('This log message will be ignored! WARN > LOG');

globalLogger.warn('This log message will be logged! WARN == WARN');
moduleLogger.error('This log message will be logged! WARN < ERROR');
```

#### Adjusting module log level
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.CREATE('moduleName');

moduleLogger.level(LEVEL.WARN);

globalLogger.log('This log message will be logged! Not affected by module level');
moduleLogger.log('This log message will be ignored! WARN > LOG');
moduleLogger.error('This log message will be logged! WARN == WARN');
```

### Check if log was blocked
```javascript
import { Logger, LEVEL } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.CREATE('moduleName');

moduleLogger.level(LEVEL.WARN);

if (moduleLogger.log('This log is blocked by log level!')) {
    // Log was blocked
}
```

## Extensibility
```javascript
import { Logger } from 'tiny-ts-logger';

class CustomLogger extends Logger {
    static PARSE_MESSAGE(moduleName, level, logger) {
        return 'Prefix - ';
    }

    fatal(...args) {
        super.fatal(...args);
        // Do something different
        // e.g. Log to server

        return true;
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
