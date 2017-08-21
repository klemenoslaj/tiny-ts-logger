webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/**
 * Testing and demonstration of Tiny Logger
 */

var table = document.getElementById('modules-table');
var triggerAllButton = document.getElementById('trigger-all');
var addLoggerButton = document.getElementById('add-logger');
var moduleRows = {};
var modules = [];
triggerAllButton.addEventListener('click', logAllOnClick);
addLoggerButton.addEventListener('click', createModuleOnClick);
createModule('Module A');
createModule('Module B');
createModule('Module C');
function logAllOnClick(event) {
    var globalLevel = document.querySelector('.global-level:checked');
    var clearChexbox = document.getElementById('clear-console');
    event.preventDefault();
    event.stopPropagation();
    if (clearChexbox.checked) {
        console.clear();
    }
    __WEBPACK_IMPORTED_MODULE_0__index__["a" /* Logger */].level(+globalLevel.value);
    modules.forEach(function (loggerName) {
        var logger = __WEBPACK_IMPORTED_MODULE_0__index__["a" /* Logger */].create(loggerName);
        var radio = moduleRows[loggerName].querySelector('input[type=radio]:checked');
        var message = document.getElementById('debug-message').value;
        logger.level(+radio.value);
        logger.trace(message);
        logger.debug(message);
        logger.info(message);
        logger.warn(message);
        logger.error(message);
        logger.fatal(message);
    });
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
        Object.keys(__WEBPACK_IMPORTED_MODULE_0__index__["a" /* Logger */].LEVEL)
            .filter(function (key) { return Number.isNaN(+__WEBPACK_IMPORTED_MODULE_0__index__["a" /* Logger */].LEVEL[key]); })
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
/* unused harmony export LEVEL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["OFF"] = 5] = "OFF";
    LEVEL[LEVEL["ALL"] = 0] = "ALL";
    LEVEL[LEVEL["TRACE"] = 0] = "TRACE";
    LEVEL[LEVEL["DEBUG"] = 1] = "DEBUG";
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
        if (this.isLevelValid(LEVEL.TRACE)) {
            console.trace.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.TRACE, this)].concat(args));
        }
        return this;
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isLevelValid(LEVEL.DEBUG)) {
            console.log.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.DEBUG, this)].concat(args));
        }
        return this;
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isLevelValid(LEVEL.INFO)) {
            console.info.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.INFO, this)].concat(args));
        }
        return this;
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isLevelValid(LEVEL.WARN)) {
            console.warn.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.WARN, this)].concat(args));
        }
        return this;
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isLevelValid(LEVEL.ERROR)) {
            console.error.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.ERROR, this)].concat(args));
        }
        return this;
    };
    Logger.prototype.fatal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, [Logger.PARSE_MESSAGE(modulesMap.get(this).moduleName, LEVEL.FATAL, this)].concat(args));
        return this;
    };
    Logger.prototype.isLevelValid = function (level) {
        return level >= loggerLevel && level >= modulesMap.get(this).level;
    };
    Logger.LEVEL = LEVEL;
    Logger.global = modules.global = new Logger('global');
    Logger.level = function (level) {
        if (level === void 0) { level = loggerLevel; }
        return loggerLevel = level;
    };
    Logger.create = function (moduleName) { return modules[moduleName] || (modules[moduleName] = new Logger(moduleName)); };
    return Logger;
}());



/***/ })
],[0]);
//# sourceMappingURL=main.map