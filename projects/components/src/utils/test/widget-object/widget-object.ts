/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

type ElementLocator<T> = (options?: unknown) => T;

/**
 * A class that is able to make queries to the DOM and be instantiated by a widget finder.
 * Widget objects should be used only to find elements in the DOM. You should not attempt to take
 * actions on these elements in a given widget object.
 *
 * All widget objects should extend this base class.
 *
 * @example
 *
 * class LoginWidgetObject<T> extends BaseWidgetObject<T> {
 *      getUsernameField = this.locatorForChild('.username');
 *
 *      getOkButton(): T {
 *          return this.driver.getByText('button', 'Ok').unwrap();
 *      }
 *
 *      getOkButtonContainer(): T {
 *          return this.driver.getByText('button', 'Ok').parent('.button-container').unwrap();
 *      }
 * }
 */
export class BaseWidgetObject<T> {
    protected locatorDriver?: LocatorDriver<T>;
    constructor(driver: LocatorDriver<T>) {
        this.locatorDriver = driver;
    }

    /**
     * Returns an element locator that will find a child with the given cssSelector when called.
     */
    protected locatorForCssSelectors ? = (cssSelector: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.get(cssSelector, options).unwrap();
    };

    /**
     * Returns an element locator that will find a parent with the given cssSelector when called.
     */
    protected locatorForAncestors ? = (cssSelector: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.parents(cssSelector, options).unwrap();
    };

    /**
     * Returns an element locator that will find a child with the given cssSelector and text when called.
     */
    protected locatorForText ? = (cssSelector: string, text: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.getByText(cssSelector, text, options).unwrap();
    };
}

/**
 * Knows how to find elements of a given type T in the DOM.
 */
export interface LocatorDriver<T> {
    /**
     * Finds all child elements that match the given cssSelector.
     */
    get(cssSelector: string, options?: unknown): LocatorDriver<T>;

    /**
     * Finds all child elements that match the given cssSelector and have text that contains the given value.
     */
    getByText(cssSelector: string, value: string, options?: unknown): LocatorDriver<T>;

    /**
     * Finds the closest parent that matches the given cssSelector.
     */
    parents(cssSelector: string, options?: unknown): LocatorDriver<T>;

    /**
     * Returns an instance of the given widget within this widget object.
     */
    findWidget<W extends BaseWidgetObject<T>, C extends FindableWidget<T, W>>(
        widget: C,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<C>, T>;

    /**
     * Unwraps the value from this query and turns it into the resulting object type.
     */
    unwrap(): T;
}

type ConvertGenericOnly<CR, R> = unknown extends CR ? R : CorrectReturnTypes<CR, R>;

/**
 * Changes the class so that all functions/getters return R.
 */
export type CorrectReturnTypes<T, R> = {
    [P in keyof T]: T[P] extends (...args: any[]) => infer CR
        ? (...args: Parameters<T[P]>) => ConvertGenericOnly<CR, R>
        : ConvertGenericOnly<T[P], R>;
};

/**
 * The interface that all WidgetObject classes must satisfy. This means that they must extend BaseWidgetObject and
 * have a static tagName.
 */
export interface FindableWidget<T, W extends BaseWidgetObject<T>> {
    new (driver: LocatorDriver<T>): W;
    tagName: string;
}
