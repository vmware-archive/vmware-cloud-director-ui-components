/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetDriver } from './base-widget-object';
import { CypressWidgetFinder } from './cypress-widget-finder';
import { FindableWidget, FindParams } from './widget-object';

declare const Cypress;

/**
 * Given some Cypress Chainable, returns a promise that will resolve when that Chainable completes
 * and rejects when it fails.
 */
export function promisify<T>(chain): Promise<T> {
    return new Cypress.Promise((resolve, reject) => {
        // We must subscribe to failures and bail. Without this, the Cypress runner would never stop

        // // unsubscribe from test failure on both success and failure. This cleanup is essential
        function resolvePromise(value): any {
            resolve(value);
            Cypress.off('fail', rejectPromise);
        }
        function rejectPromise(error): any {
            reject(error);
            Cypress.off('fail', rejectPromise);
        }
        Cypress.on('fail', rejectPromise);

        chain.then(resolvePromise);
    });
}

// If we load the 'cypress' module into this file, it also loads Chai which clashes with Jasmine - our testing framework of choice.
// As such, this class isn't very type safe

/**
 * A WidgetDriver that knows how to interface with the Cypress framework.
 */
export class CypressWidgetDriver implements WidgetDriver {
    constructor(private element) {}

    find<W extends WidgetDriver>(params: FindParams<FindableWidget<W>> | FindableWidget<W>): W {
        return new CypressWidgetFinder().find<W, FindableWidget<W>>(params, this.element);
    }

    exists(cssSelector?: string): Promise<boolean> {
        return promisify(this.getElement(cssSelector));
    }

    visible(cssSelector?: string): Promise<boolean> {
        return this.assert('be.visible', cssSelector);
    }

    hidden(cssSelector?: string): Promise<boolean> {
        return this.assert('not.be.visible', cssSelector);
    }

    disabled(cssSelector?: string): Promise<boolean> {
        return this.assert('be.disabled', cssSelector);
    }

    classes(cssSelector?: string): Promise<string[]> {
        return promisify(this.getElement(cssSelector).invoke('classes'));
    }

    click(cssSelector?: string): Promise<void> {
        return promisify(this.getElement(cssSelector).click());
    }

    check(cssSelector?: string): Promise<void> {
        return promisify(this.getElement(cssSelector).check());
    }

    getChecked(cssSelector?: string): Promise<boolean> {
        return this.assert('be.checked', cssSelector);
    }

    select(option: string, cssSelector?: string): Promise<void> {
        return promisify(this.getElement(cssSelector).select(option));
    }

    sendKeyboardKey(key: string, cssSelector?: string): Promise<void> {
        const element = this.getElement(cssSelector);
        return promisify(element.invoke('keydown', key).then(() => element.invoke('keyup', key)));
    }

    async setInputValue(value: string, shouldAppend?: boolean, cssSelector?: string): Promise<void> {
        if (!shouldAppend) {
            await this.clearInputValue(cssSelector);
        }
        await promisify(this.getElement(cssSelector).type(value));
    }

    clearInputValue(cssSelector?: string): Promise<void> {
        return promisify(this.getElement(cssSelector).clear());
    }

    getText(cssSelector?: string): Promise<string> {
        return promisify(this.getElement(cssSelector).invoke('text')).then((text: string) => text.trim());
    }

    getTexts(parentCssSelector?: string, cssSelector?: string): Promise<string[]> {
        return promisify(this.getElements(parentCssSelector, cssSelector).invoke('text')).then((texts: string[]) =>
            texts.map(text => text.trim())
        );
    }

    getInputValue(cssSelector?: string): Promise<string | number | string[]> {
        return promisify(this.getElement(cssSelector).invoke('val'));
    }

    getInputValues(parentCssSelector?: string, cssSelector?: string): Promise<(string | number | string[])[]> {
        return promisify(this.getElements(parentCssSelector, cssSelector).val());
    }

    // tslint:disable-next-line: typedef
    private getElement(cssSelector?: string) {
        return cssSelector ? this.element.get(cssSelector) : this.element;
    }

    // tslint:disable-next-line: typedef
    private getElements(parentCssSelector?: string, cssSelector?: string) {
        return this.getElement(parentCssSelector).children(cssSelector);
    }

    private assert(expectation: string, cssSelector?: string): Promise<boolean> {
        return promisify(this.getElement(cssSelector).should(expectation));
    }
}
