webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/**
 * Testing and demonstration of Tiny Logger
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Console = (function () {
    function Console() {
        this.element = document.getElementById('console');
        this.classMap = (_a = {},
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].TRACE] = 'console__trace',
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].LOG] = 'console__log',
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].INFO] = 'console__info',
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].WARN] = 'console__warn',
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].ERROR] = 'console__error',
            _a[__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].FATAL] = 'console__fatal',
            _a);
        var _a;
    }
    Console.prototype.print = function (level, message, args) {
        var paragraph = document.createElement('p');
        paragraph.classList.add(this.classMap[level]);
        paragraph.innerText = message + " " + args.join(' ');
        this.element.appendChild(paragraph);
        return this;
    };
    Console.prototype.clear = function () {
        this.element.scrollTop = 0;
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        return this;
    };
    return Console;
}());
var CustomLogger = (function (_super) {
    __extends(CustomLogger, _super);
    function CustomLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tslint:disable-next-line
    CustomLogger.PARSE_MESSAGE = function (moduleName, level) {
        return "\"" + moduleName + "\" - " + __WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */][level] + " - ";
    };
    CustomLogger.CLEAR = function () {
        __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Logger */].CLEAR();
        this.console.clear();
    };
    CustomLogger.prototype.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isValid = _super.prototype.trace.apply(this, args);
        if (isValid) {
            CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].TRACE, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].TRACE), args);
        }
        return isValid;
    };
    CustomLogger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isValid = _super.prototype.log.apply(this, args);
        if (isValid) {
            CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].LOG, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].LOG), args);
        }
        return isValid;
    };
    CustomLogger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isValid = _super.prototype.info.apply(this, args);
        if (isValid) {
            CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].INFO, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].INFO), args);
        }
        return isValid;
    };
    CustomLogger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isValid = _super.prototype.warn.apply(this, args);
        if (isValid) {
            CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].WARN, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].WARN), args);
        }
        return isValid;
    };
    CustomLogger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var isValid = _super.prototype.error.apply(this, args);
        if (isValid) {
            CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].ERROR, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].ERROR), args);
        }
        return isValid;
    };
    CustomLogger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        CustomLogger.console.print(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].FATAL, this.parsePrefix(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */].FATAL), args);
        return _super.prototype.fatal.apply(this, args);
    };
    CustomLogger.console = new Console();
    return CustomLogger;
}(__WEBPACK_IMPORTED_MODULE_0__index__["b" /* Logger */]));
var table = document.getElementById('modules-table');
var triggerAllButton = document.getElementById('trigger-all');
var clearAllButton = document.getElementById('clear-all');
var addLoggerButton = document.getElementById('add-logger');
var moduleRows = {};
var modules = [];
triggerAllButton.addEventListener('click', logAll);
clearAllButton.addEventListener('click', clearAllOnClick);
addLoggerButton.addEventListener('click', createModuleOnClick);
createModule('Module A');
createModule('Module B');
createModule('Module C');
logAll();
function logAll(event) {
    var globalLevel = document.querySelector('.global-level:checked');
    var clearChexbox = document.getElementById('clear-console');
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (clearChexbox.checked) {
        CustomLogger.CLEAR();
    }
    CustomLogger.SET_GLOBAL_LEVEL(+globalLevel.value);
    modules.forEach(function (loggerName) {
        var logger = CustomLogger.CREATE(loggerName);
        var radio = moduleRows[loggerName].querySelector('input[type=radio]:checked');
        var message = document.getElementById('debug-message').value;
        logger.level(+radio.value);
        logger.trace(message);
        logger.log(message);
        logger.info(message);
        logger.warn(message);
        logger.error(message);
        logger.fatal(message);
    });
}
function clearAllOnClick(event) {
    event.preventDefault();
    event.stopPropagation();
    CustomLogger.CLEAR();
}
function createModuleOnClick(event) {
    event.preventDefault();
    event.stopPropagation();
    var loggerName = document.getElementById('logger-name').value;
    if (loggerName.length > 0) {
        createModule(loggerName);
    }
}
function createModule(loggerName) {
    if (moduleRows[loggerName] === undefined) {
        var tableRow_1 = document.createElement('tr');
        var moduleCell = document.createElement('td');
        moduleCell.innerText = loggerName;
        tableRow_1.appendChild(moduleCell);
        Object.keys(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */])
            .filter(function (key) { return Number.isNaN(+__WEBPACK_IMPORTED_MODULE_0__index__["a" /* LEVEL */][key]); })
            .forEach(function (key) {
            var radioCell = document.createElement('td');
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = loggerName.split(' ').join('_');
            radio.value = key;
            radioCell.appendChild(radio);
            tableRow_1.appendChild(radioCell);
        });
        tableRow_1.children[1].firstElementChild.checked = true;
        table.lastElementChild.appendChild(tableRow_1);
        modules.push(loggerName);
        moduleRows[loggerName] = tableRow_1;
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Logger; });
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["OFF"] = 5] = "OFF";
    LEVEL[LEVEL["ALL"] = 0] = "ALL";
    LEVEL[LEVEL["TRACE"] = 0] = "TRACE";
    LEVEL[LEVEL["LOG"] = 1] = "LOG";
    LEVEL[LEVEL["INFO"] = 2] = "INFO";
    LEVEL[LEVEL["WARN"] = 3] = "WARN";
    LEVEL[LEVEL["ERROR"] = 4] = "ERROR";
    LEVEL[LEVEL["FATAL"] = 5] = "FATAL";
})(LEVEL || (LEVEL = {}));
var modules = {};
var modulesMap = new Map();
var loggerLevel = LEVEL.ALL;
var Logger = (function () {
    function Logger(moduleName) {
        modulesMap.set(this, { moduleName: moduleName, level: LEVEL.ALL });
    }
    // tslint:disable-next-line
    Logger.PARSE_MESSAGE = function (_moduleName, _level, _logger) {
        return '';
    };
    Logger.prototype.level = function (level) {
        modulesMap.get(this).level = level;
        return this;
    };
    Logger.prototype.trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.logIfValid(LEVEL.TRACE, args);
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.logIfValid(LEVEL.LOG, args);
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.logIfValid(LEVEL.INFO, args);
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.logIfValid(LEVEL.WARN, args);
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.logIfValid(LEVEL.ERROR, args);
    };
    Logger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, [this.parsePrefix(LEVEL.FATAL)].concat(args));
        return true;
    };
    Logger.prototype.parsePrefix = function (level) {
        return this.constructor.PARSE_MESSAGE(modulesMap.get(this).moduleName, level, this);
    };
    Logger.prototype.logIfValid = function (level, args) {
        var isValid = level >= loggerLevel && level >= modulesMap.get(this).level;
        if (isValid) {
            console[LEVEL[level].toLowerCase()].apply(console, [this.parsePrefix(level)].concat(args));
        }
        return isValid;
    };
    Logger.global = modules.global = new Logger('global');
    Logger.CLEAR = function () { return console.clear(); };
    Logger.SET_GLOBAL_LEVEL = function (level) {
        if (level === void 0) { level = loggerLevel; }
        return loggerLevel = level;
    };
    Logger.CREATE = function (moduleName) {
        return modules[moduleName] || (modules[moduleName] = new this(moduleName));
    };
    return Logger;
}());



/***/ })
],[0]);
//# sourceMappingURL=main.map