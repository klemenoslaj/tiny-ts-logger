/**
 * Testing and demonstration of Tiny Logger
 */

import { Logger } from './logger';

const table: HTMLTableElement = <HTMLTableElement>document.getElementById('modules-table');
const triggerAllButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('trigger-all');
const addLoggerButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-logger');
const moduleRows: { [loggerName: string]: HTMLTableRowElement } = {};
const modules: string[] = [];

triggerAllButton.addEventListener('click', logAllOnClick);
addLoggerButton.addEventListener('click', createModuleOnClick);

createModule('Module A');
createModule('Module B');
createModule('Module C');

function logAllOnClick(event: Event): void {
    const globalLevel: HTMLInputElement = <HTMLInputElement>document.querySelector('.global-level:checked');
    const clearChexbox: HTMLInputElement = <HTMLInputElement>document.getElementById('clear-console');

    event.preventDefault();
    event.stopPropagation();

    if (clearChexbox.checked) {
        console.clear();
    }

    Logger.level(+globalLevel.value);

    modules.forEach((loggerName: string) => {
        const logger: Logger = Logger.create(loggerName);
        const radio: HTMLInputElement = <HTMLInputElement>moduleRows[loggerName].querySelector('input[type=radio]:checked');
        const message: string = (<HTMLInputElement>document.getElementById('debug-message')).value;

        logger.level(+radio.value);

        logger.trace(message);
        logger.debug(message);
        logger.info(message);
        logger.warn(message);
        logger.error(message);
        logger.fatal(message);
    });
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

        Object.keys(Logger.LEVEL)
            .filter((key: string) => Number.isNaN(+Logger.LEVEL[key]))
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
