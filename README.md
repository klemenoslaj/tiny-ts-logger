# tiny-ts-logger
TypeScript logger with the support of multiple modules at different log levels

# Installation
```
npm install tiny-ts-logger
yarn add tiny-ts-logger
```

# Usage
```
import { Logger } from 'tiny-ts-logger';

const globalLogger = Logger.global;
const moduleLogger = Logger.create('moduleName');

globalLogger.debug('Debug message from global logger');
moduleLogger.debug('Debug message from module logger');

moduleLogger.level(Logger.LEVEL.WARN);
moduleLogger.debug('Module specific debug is ignored');
moduleLogger.warn('Module specific warn is logged');
globalLogger.debug('Global debug is logged');
```
## Log levels
Log level will block all logs that have smaller priority than the specified level.

| Level      | Priority   |
|------------| :---------:|
| `ALL`      | **0**      |
| `TRACE`    | **0**      |
| `DEBUG`    | **1**      |
| `INFO`     | **2**      |
| `WARN`     | **3**      |
| `ERROR`    | **4**      |
| `FATAL`    | **5**      |
| `OFF`      | **5**      |
