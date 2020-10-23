/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';

/**
 * A class that is able to make queries to the DOM and be instantiated by a widget finder.
 *
 * All widget locators should extend this base class.
 *
 * @example
 *
 * class LoginWidgetLocator<T> extends BaseWidgetLocator<T> {
 *      getUsernameField(): T {
 *          return this.driver.get('.username').unwrap();
 *      }
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
export class BaseWidgetLocator<T> {
    protected driver?: LocatorDriver<T>;
    constructor(driver: LocatorDriver<T>) {
        this.driver = driver;
    }
}

/**
 * Knows how to find elements of a given type T in the DOM.
 */
export interface LocatorDriver<T> {
    /**
     * Finds all child elements that match the given {@param cssSelector}.
     */
    get(cssSelector: string): LocatorDriver<T>;

    /**
     * Finds all child elements that match the given {@param cssSelector} and have text that contains the given {@param value}.
     */
    getByText(cssSelector: string, value: string): LocatorDriver<T>;

    /**
     * Finds the closest parent that matches the given {@param cssSelector}.
     */
    parents(cssSelector: string): LocatorDriver<T>;

    /**
     * Returns an instance of the given widget within this widget locator.
     */
    findWidget<W extends FindableLocator<BaseWidgetLocator<T>>>(widget: W): CorrectReturnTypes<InstanceType<W>, T>;

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
 * A locator that is findable by tagName.
 */
export interface FindableLocator<T> extends Type<T> {
    tagName: string;
}
