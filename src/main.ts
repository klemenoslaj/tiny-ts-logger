/**
 * Testing and demonstration of Tiny Logger
 */

import { consoleArgument, LEVEL, Logger } from './index';

class Console {
    public readonly element: HTMLElement = document.getElementById('console');
    private classMap: { [level: string]: string } = {
        [LEVEL.TRACE]: 'console__trace',
        [LEVEL.LOG]: 'console__log',
        [LEVEL.INFO]: 'console__info',
        [LEVEL.WARN]: 'console__warn',
        [LEVEL.ERROR]: 'console__error',
        [LEVEL.FATAL]: 'console__fatal'
    };

    public print(level: LEVEL, message: string, args: consoleArgument[]): this {
        const paragraph: HTMLParagraphElement = document.createElement('p');
        paragraph.classList.add(this.classMap[level]);
        paragraph.innerText = `${message} ${args.join(' ')}`;
        this.element.appendChild(paragraph);

        return this;
    }

    public clear(): this {
        this.element.scrollTop = 0;

        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }

        return this;
    }
}

class CustomLogger extends Logger {
    public static readonly console: Console = new Console();

    // tslint:disable-next-line
    public static PARSE_MESSAGE(moduleName: string, level: LEVEL): string {
        return `"${moduleName}" - ${LEVEL[level]} - `;
    }

    public static CLEAR(): void {
        Logger.CLEAR();
        this.console.clear();
    }

    public trace(...args: consoleArgument[]): boolean {
        const isValid: boolean = super.trace(...args);

        if (isValid) {
            CustomLogger.console.print(LEVEL.TRACE, this.parsePrefix(LEVEL.TRACE), args);
        }

        return isValid;
    }

    public log(...args: consoleArgument[]): boolean {
        const isValid: boolean = super.log(...args);

        if (isValid) {
            CustomLogger.console.print(LEVEL.LOG, this.parsePrefix(LEVEL.LOG), args);
        }

        return isValid;
    }

    public info(...args: consoleArgument[]): boolean {
        const isValid: boolean = super.info(...args);

        if (isValid) {
            CustomLogger.console.print(LEVEL.INFO, this.parsePrefix(LEVEL.INFO), args);
        }

        return isValid;
    }

    public warn(...args: consoleArgument[]): boolean {
        const isValid: boolean = super.warn(...args);

        if (isValid) {
            CustomLogger.console.print(LEVEL.WARN, this.parsePrefix(LEVEL.WARN), args);
        }

        return isValid;
    }

    public error(...args: consoleArgument[]): boolean {
        const isValid: boolean = super.error(...args);

        if (isValid) {
            CustomLogger.console.print(LEVEL.ERROR, this.parsePrefix(LEVEL.ERROR), args);
        }

        return isValid;
    }

    public fatal(...args: consoleArgument[]): boolean {
        CustomLogger.console.print(LEVEL.FATAL, this.parsePrefix(LEVEL.FATAL), args);

        return super.fatal(...args);
    }
}

const table: HTMLTableElement = <HTMLTableElement>document.getElementById('modules-table');
const triggerAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('trigger-all');
const clearAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('clear-all');
const addLoggerButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-logger');
const moduleRows: { [loggerName: string]: HTMLTableRowElement } = {};
const modules: string[] = [];

triggerAllButton.addEventListener('click', logAll);
clearAllButton.addEventListener('click', clearAllOnClick);
addLoggerButton.addEventListener('click', createModuleOnClick);

createModule('Module A');
createModule('Module B');
createModule('Module C');

logAll();

function logAll(event?: Event): void {
    const globalLevel: HTMLInputElement = <HTMLInputElement>document.querySelector('.global-level:checked');
    const clearChexbox: HTMLInputElement = <HTMLInputElement>document.getElementById('clear-console');

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (clearChexbox.checked) {
        CustomLogger.CLEAR();
    }

    CustomLogger.SET_GLOBAL_LEVEL(+globalLevel.value);

    modules.forEach((loggerName: string) => {
        const logger: CustomLogger = CustomLogger.CREATE(loggerName);
        const radio: HTMLInputElement = <HTMLInputElement>moduleRows[loggerName].querySelector('input[type=radio]:checked');
        const message: string = (<HTMLInputElement>document.getElementById('debug-message')).value;

        logger.level(+radio.value);

        logger.trace(message);
        logger.log(message);
        logger.info(message);
        logger.warn(message);
        logger.error(message);
        logger.fatal(message);
    });
}

function clearAllOnClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    CustomLogger.CLEAR();
}

function createModuleOnClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const loggerName: string = (<HTMLInputElement>document.getElementById('logger-name')).value;

    if (loggerName.length > 0) {
        createModule(loggerName);
    }
}

function createModule(loggerName: string): void {
    if (moduleRows[loggerName] === undefined) {
        const tableRow: HTMLTableRowElement = document.createElement('tr');
        const moduleCell: HTMLTableDataCellElement = document.createElement('td');

        moduleCell.innerText = loggerName;
        tableRow.appendChild(moduleCell);

        Object.keys(LEVEL)
            .filter((key: string) => Number.isNaN(+LEVEL[key]))
            .forEach((key: string) => {
                const radioCell: HTMLTableDataCellElement = document.createElement('td');
                const radio: HTMLButtonElement = document.createElement('input');

                radio.type = 'radio';
                radio.name = loggerName.split(' ').join('_');
                radio.value = key;

                radioCell.appendChild(radio);
                tableRow.appendChild(radioCell);
            });

        (<HTMLInputElement>tableRow.children[1].firstElementChild).checked = true;
        table.lastElementChild.appendChild(tableRow);

        modules.push(loggerName);
        moduleRows[loggerName] = tableRow;
    }
}
