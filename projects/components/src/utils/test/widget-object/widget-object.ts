/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
/**
 * A function tht finds an HTML Element wrapper of some type `T`
 */
type ElementLocator<T> = (options?: FindElementOptions) => T;

/**
 * Like unknown but can be an object but also needs to be cast before it can be used (since an empty object doesn't
 * allow properties)
 *
 * These options will be passed down to the implementation when querying or running actions. For example, when
 * specifying a timeout for a cypress command. An implementation specific type should be used in their implementation of
 * the WidgetObjectElement
 */
type UnknownOptions = {};

export type FindElementOptions = {
    /** CSS selector used to query */
    cssSelector?: string;

    /** To get the nth element of a result set. */
    index?: number;

    /** To search for the element containing the given text. Ignored if {@link #index} is passed */
    text?: string;

    /** An implementation specific parent can be used to start the search */
    ancestor?: unknown;

    /** Implementation specific options. For example, timeouts in cypress */
    options?: UnknownOptions;
};

/**
 * Something that can find other WidgetObjectElements or WidgetObjects within itself
 */
interface Locator<T> {
    /**
     * Finds all descendants by CSS selector
     * @param selector - Can be a CSS query string or a FindElementOptions for more refined querying
     */
    get(selector: string | FindElementOptions): WidgetObjectElement<T>;

    /**
     * Finds the closest parent that matches the given cssSelector. Ignores the index attribute
     */
    parents(selector: string | FindElementOptions): WidgetObjectElement<T>;

    /**
     * Returns an instance of the given widget within this widget object.
     */
    findWidget<W extends BaseWidgetObject<T>>(widget: FindableWidget<T, W>, findOptions?: FindElementOptions): W;
}

/**
 * Actions that can be taken on elements from within widget objects. This
 * is a subset of the functionality from Cypress
 */
export interface ElementActions {
    /**
     * Clicks an element, it must typically be visible
     * @param options Options to be passed down to implementations
     */
    click(options?: UnknownOptions): void;

    /**
     * Types into a text field
     * @param value What to type into the field
     * @param options Options to be passed down to implementations
     */
    type(value: string, options?: UnknownOptions): void;

    /**
     * For checkboxes, makes sure a box is checked
     * @param options Options to be passed down to implementations
     */
    check(options?: UnknownOptions): void;

    /**
     * For checkboxes, makes sure a box is unchecked
     * @param options Options to be passed down to implementations
     */
    uncheck(options?: UnknownOptions): void;

    /**
     * For select elements
     * @param value The text of the dropdown to select
     * @param options Options to be passed down to implementations
     */
    select(value: string, options: UnknownOptions): void;

    /**
     * For inputs or text areas, clears the current value.
     * @param options Options to be passed down to implementations
     */
    clear(options?: UnknownOptions): void;
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
export interface WidgetObjectElement<T> extends Locator<T>, ElementActions {
    /**
     * Unwraps the value from this WidgetObjectElement and turns it into the resulting object type (T) which is what
     * should be exposed to subclasses
     */
    unwrap(): T;
}

/**
 * A wrapper around a component in UI code. Each subclass typically lives in the same folder as the
 * component itself.
 *
 * It provides two main functions:
 *   - Access to key HTML elements within it so that tests can assert something about their content
 *   - Abstracting interactions. For example, a login method that takes a username and password and
 *     enters it into both fields and then clicks the submit button.
 *
 * These widgets can be used in multiple environments by implementing two pieces:
 * - A subclass of WidgetObjectElement<T> where T is the environment's HTMLElement wrapper, such as DebugElement,
 *   Cypress.Chainable or WebElement.
 * - A Widget finder that knows how to instantiate WidgetObjects passing it the correct type of `WidgetObjectElement<T>`
 *   which you have created
 *
 * @example
 *
 * class LoginWidgetObject<T> extends BaseWidgetObject<T> {
 *      // Private accessors return WidgetObjectElement using the factory
 *      private _getUserNameInput = this.internalFactory.css('.username');
 *
 *      // Public accessors return T and can be composed from their private counterparts
 *      // Differentiate them by the underscore to make it clear one is returning the internal format
 *      public getUsernameInput = this.factory.unwrap(this._getUsernameInput);
 *
 *      // Don't need to expose this publicly, user underscore so it's clear it returns the WidgetObjectElement
 *      private _getOkButton = this.internalFactory.text('button', OK);
 *
 *      // Don't need an internal version, use the factory methods to create public methods
 *      public errorMessage = this.factory.dataUi('error-message');
 *
 *       // Sometimes there's no factory for more complex finding logic, write a custom query.
 *       // Be sure to call unwrap on the result if exposing it publicly
 *      getOkButtonContainer(): T {
 *          return this.el.getByText('button', 'Ok').parent('.button-container').unwrap();
 *      }
 *      ...
 *
 *      login(user, password) {
 *          this._getUsernameInput().type(user);
 *          this._getPasswordInput().type(password);
 *          this._getOkButton().click();
 *      }
 * }
 */
export class BaseWidgetObject<T> {
    /**
     * This is like {@link #factory} but it returns WidgetObjectElements, which can be used internally
     */
    protected internalFactory = {
        css: (cssSelector: string) => (options?: FindElementOptions) => this.el.get({ cssSelector, ...options }),
        dataUi: (name: string) => this.internalFactory.css(`[data-ui="${name}"]`),
    };

    /**
     * Helpers for creating methods to find HTML elements within the widget object. They can find two types of elements:
     *
     * - WidgetObjectElements<T> which wrap the T which is unknown to this base class into a common interface that
     *   can be be used within to WidgetObject subclasses to provide methods that can abstract interactions with
     *   the widget. For example, a `loginWidget.login(usr, pwd)` call which types into the user and password fields
     *   and then hits the submit button; These elements don't provide means to assert anything or even to read
     *   information from the widget objects elements such as their text, CSS class names, etc.
     *
     * - The generic specified by <T> which depends on the implementation such as a DebugElement in Angular, a
     *   Chainable in Cypress, or a WebElement in Selenium.
     *
     * Note that unlike Google Material's Harnesses, we do not impose a `TestElement` interface to be used from
     * different implementations where all the methods return promises. The main reason is that it allows
     * calls from different implementations to feel more natural, according to their testing environment. For example:
     *
     * - Avoids adding `await`s all over unit tests where they aren't necessarily needed. When trying this approach,
     *   it was tricky to try to convert Cypress values into Promises in a reliable way. It initially looked promising
     *   (pun intended) but turned out not to work with nested promises.
     *
     * - Allows the calls to WidgetObject methods to be more like their native objects instead of forcing them
     *   to comply with a TestElement interface we have defined. That is, Cypress has a natural way to read text at
     *   polling intervals automatically so you can still benefit from that when writing a Cypress Tests while
     *   you would need a different mechanism in your Angular unit tests where you have a DebugElement.
     *
     *   This also prevents widget object methods from querying information about the elements forcing any assertions
     *   to be run from the outside, which we believe is the correct way to structure codes since assertions are
     *   framework specific.
     *
     *   Each factory method returns an ElementLocator<WidgetObjectElement<T>> which should never be public
     *   but also has a corresponding method prefixed with _ to indicate the it returns `T` which is what should be
     *   consumed by users of the class.
     */
    protected factory = {
        /**
         * Utility to create versions of factories that return the unwrapped T
         */
        unwrap: (fun: ElementLocator<WidgetObjectElement<T>>) => {
            return (options?: FindElementOptions) => fun(options).unwrap();
        },

        css: (cssSelector: string) => this.factory.unwrap(this.internalFactory.css(cssSelector)),

        /** Utility to find by data-ui attribute which is the suggested way to tag elements in the DOM for testing  */
        dataUi: (name: string) => this.factory.unwrap(this.internalFactory.dataUi(name)),
    };

    constructor(protected el: WidgetObjectElement<T>) {}

    /**
     * Gives the element that underlies the current widget object. Use sparingly. A common use case is
     * when you want to test visibility of a widget, which must be done by assertions, which do not belong in a widget
     * object.
     */
    public self(): T {
        return this.el.unwrap();
    }
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
    new (driver: WidgetObjectElement<T>): W;
    tagName: string;
}
