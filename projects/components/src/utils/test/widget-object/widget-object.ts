/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
/**
 * A function tht finds a locator
 */
type ElementLocator<T> = (options?: unknown) => T;

export type FindWidgetOptions = {
    ancestor?: unknown;
    cssSelector?: string;
};
/**
 * Something that can find other WidgetObjectElement or WidgetObjects within itself
 */
interface Locator<T> {
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
    findWidget<W extends BaseWidgetObject<T>>(widget: FindableWidget<T, W>, findOptions?: FindWidgetOptions): W;
}

/**
 * Actions that can be taken on elements from within widget objects. This
 * is a subset of the functionality from Cypress
 */
export interface ElementActions {
    click(options?: unknown): void;

    type(value: string, options?: unknown): void;

    check(options?: unknown): void;

    uncheck(options?: unknown): void;

    select(value: string, options?: unknown): void;
}

/**
 * A wrappper around a component in UI code. Each subclass typically lives in the same folder as the
 * component itself.
 *
 * It provides two main functions:
 *   - Access to key HTML elements within it so that tests can assert something about their content
 *   - Abstracting interactions. For example, a login method that takes a username and password and
 *     enters it into both fields and then clicks the submit button.
 * @example
 *
 * class LoginWidgetObject<T> extends BaseWidgetObject<T> {
 *      getUsernameInput = this.locatorForChild('.username');
 *
 *      getOkButton(): T {
 *          return this.okButton.unwrap();
 *      }
 *
 *      private get okButton() {
 *          return this.driver.getByText('button', 'Ok');
 *      }
 *
 *      getOkButtonContainer(): T {
 *          return this.driver.getByText('button', 'Ok').parent('.button-container').unwrap();
 *      }
 *
 *      login(user, password) {
 *          this.getUsernameInput().type(user);
 *          this.getPasswordInput().type(password);
 *          this.getOkButton().click();
 *      }
 * }
 */
export class BaseWidgetObject<T> {
    constructor(protected locatorDriver: LocatorDriver<T>) {}

    /**
     * Gives the element that underlies the current widget object.
     */
    public self(): T {
        return this.locatorDriver.unwrap();
    }

    /**
     * Returns an element locator that will find a child with the given cssSelector when called.
     */
    protected locatorForCssSelectors? = (cssSelector: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.get(cssSelector, options).unwrap();
    };

    /**
     * Returns an element locator that will find a parent with the given cssSelector when called.
     */
    protected locatorForAncestors? = (cssSelector: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.parents(cssSelector, options).unwrap();
    };

    /**
     * Returns an element locator that will find a child with the given cssSelector and text when called.
     */
    protected locatorForText? = (cssSelector: string, text: string): ElementLocator<T> => {
        return (options?: unknown) => this.locatorDriver.getByText(cssSelector, text, options).unwrap();
    };
}

/**
 * Wraps an HTMLElement for internal use from a WidgetObject.
 *
 * It can query for other `WidgetObjectElement`s and it can interact with the element itself.
 *
 * This does not provide an interface to read information from the elements because we should not be running assertions
 * from the widget object.
 *
 * `T` is the type of the external interface for an HTMLELement. For example, DebugElement in Angular or Cy
 *
 */
export interface LocatorDriver<T> extends Locator<T>, ElementActions {
    /**
     * Unwraps the value from this WidgetObjectElement and turns it into the resulting object type (T) which is what
     * should be exposed to subclasses
     */
    unwrap(): T;
}

/**
 * The interface that all WidgetObject classes must satisfy. This means that they must:
 *  - extend BaseWidgetObject
 *  - have a static tagName.
 *
 *  T is the type of element returned by its accessors, e.g., Cypress or DebugElement
 *  W is the type of component to be found
 */
export interface FindableWidget<T, W extends BaseWidgetObject<T>> {
    new (driver: LocatorDriver<T>): W;
    tagName: string;
}
