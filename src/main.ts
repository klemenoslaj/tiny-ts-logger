/**
 * Testing and demonstration of Tiny Logger
 */

import { consoleArgument, LEVEL, Logger } from '../lib/index';

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

    public print(level: LEVEL, args: consoleArgument[]): this {
        const paragraph: HTMLParagraphElement = document.createElement('p');
        paragraph.classList.add(this.classMap[level]);
        paragraph.innerText = `${args.join(' ')}`;
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
    public static readonly global: Logger = new CustomLogger('global');
    public static readonly console: Console = new Console();

    // tslint:disable-next-line
    public static parseMessage(moduleName: string, level: LEVEL): string {
        return `[${moduleName}] - ${LEVEL[level]} - `;
    }

    public clear(): void {
        super.clear();
        CustomLogger.console.clear();
    }

    protected makeLog(level: LEVEL, args: consoleArgument[]): consoleArgument[] {
        const consoleArgs: consoleArgument[] = super.makeLog(level, args);
        CustomLogger.console.print(level, consoleArgs);

        return consoleArgs;
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
        CustomLogger.global.clear();
    }

    CustomLogger.setGlobalLevel(+globalLevel.value);

    modules.forEach((loggerName: string) => {
        const logger: CustomLogger = CustomLogger.create(loggerName);
        const radio: HTMLInputElement = <HTMLInputElement>moduleRows[loggerName].querySelector('input[type=radio]:checked');
        const message: string = (<HTMLInputElement>document.getElementById('debug-message')).value;

        logger.setLevel(+radio.value);

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

    CustomLogger.global.clear();
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
            .filter((key: string) => Number.isNaN(+LEVEL[+key]))
            .forEach((key: string) => {
                const radioCell: HTMLTableDataCellElement = document.createElement('td');
                const radio: HTMLInputElement = document.createElement('input');

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
