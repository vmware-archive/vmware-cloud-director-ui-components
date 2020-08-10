/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { FindableWidget, FindParams } from './widget-object';

/**
 * Represents an object that knows how to drive testing for a specific testing type.
 */
export interface WidgetDriver {
    /**
     * Finds a widget using the given params within this widget driver.
     */
    find<W extends WidgetDriver>(params: FindParams<FindableWidget<W>> | FindableWidget<W>): W;

    /**
     * Says if any child elements exists that use this css selector.
     */
    exists(cssSelector?: string): Promise<boolean>;

    /**
     * Says if the element is disabled.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    disabled(cssSelector?: string): Promise<boolean>;

    /**
     * Says if the element is hidden.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    hidden(cssSeletor?: string): Promise<boolean>;

    /**
     * Says if the element is visible.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    visible(cssSelector?: string): Promise<boolean>;

    /**
     * Gives the CSS classes applied to the element
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    classes(cssSelector?: string): Promise<string[]>;

    /**
     * Clicks the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    click(cssSelector?: string): Promise<void>;

    /**
     * Checks the checkbox contained in the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    check(cssSelector?: string): Promise<void>;

    /**
     * Says if the checkbox is checked within the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    getChecked(cssSelector?: string): Promise<boolean>;

    /**
     * Selects the given option within the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    select(option: string, cssSelector?: string): Promise<void>;

    /**
     * Sends a single key event to the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    sendKeyboardKey(key: string, cssSelector?: string): Promise<void>;

    /**
     * Sets the input value of the element to the given value.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     * @param shouldAppend if the value should be appended to the current input value or if the input should be cleared.
     *                     defaults to clearing the input (false).
     */
    setInputValue(value: string, shouldAppend?: boolean, cssSelector?: string): Promise<void>;

    /**
     * Gives the value of the input.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    getInputValue(cssSelector?: string): Promise<string | number | string[]>;

    /**
     * Gives the value of all inputs that match the given css selector.
     *
     * @param parentCssSelector the CSS selector of the immediate parent of the children.
     * @param cssSelector the CSS selector to filter the children by.
     */
    getInputValues(parentCssSelector?: string, cssSelector?: string): Promise<(string | number | string[])[]>;

    /**
     * Clears the input value of the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    clearInputValue(cssSelector?: string): Promise<void>;

    /**
     * Gives the text within the element.
     *
     * @param cssSelector the selector to use to find the element, if null uses the current WidgetDriver.
     */
    getText(cssSelector?: string): Promise<string>;

    /**
     * Gives the text of all elements that match the given CSS selectors.
     *
     * @param parentCssSelector the CSS selector of the immediate parent of the children.
     * @param cssSelector the CSS selector to filter the children by.
     */
    getTexts(parentCssSelector?: string, cssSelector?: string): Promise<string[]>;
}

/**
 * An object that all other WidgetObjects should extend.
 */
export class BaseWidgetObject implements WidgetDriver {
    constructor(private driver: WidgetDriver) {}

    find<W extends WidgetDriver>(params: FindParams<FindableWidget<W>> | FindableWidget<W>): W {
        return this.driver.find(params);
    }

    exists(cssSelector?: string): Promise<boolean> {
        return this.driver.exists(cssSelector);
    }

    disabled(cssSelector?: string): Promise<boolean> {
        return this.driver.disabled(cssSelector);
    }

    visible(cssSelector?: string): Promise<boolean> {
        return this.driver.visible(cssSelector);
    }

    hidden(cssSelector?: string): Promise<boolean> {
        return this.driver.hidden(cssSelector);
    }

    click(cssSelector?: string): Promise<void> {
        return this.driver.click(cssSelector);
    }

    classes(cssSelector?: string): Promise<string[]> {
        return this.driver.classes(cssSelector);
    }

    check(cssSelector?: string): Promise<void> {
        return this.driver.check(cssSelector);
    }

    getChecked(cssSelector?: string): Promise<boolean> {
        return this.driver.getChecked(cssSelector);
    }

    select(option: string, cssSelector?: string): Promise<void> {
        return this.driver.select(option, cssSelector);
    }

    sendKeyboardKey(key: string, cssSelector?: string): Promise<void> {
        return this.driver.sendKeyboardKey(key, cssSelector);
    }

    setInputValue(value: string, shouldAppend?: boolean, cssSelector?: string): Promise<void> {
        return this.driver.setInputValue(value, shouldAppend, cssSelector);
    }

    clearInputValue(cssSelector?: string): Promise<void> {
        return this.driver.clearInputValue(cssSelector);
    }

    getText(cssSelector?: string): Promise<string> {
        return this.driver.getText(cssSelector);
    }

    getTexts(parentCssSelector?: string, cssSelector?: string): Promise<string[]> {
        return this.driver.getTexts(parentCssSelector, cssSelector);
    }

    getInputValue(cssSelector?: string): Promise<string | number | string[]> {
        return this.driver.getInputValue(cssSelector);
    }

    getInputValues(parentCssSelector?: string, cssSelector?: string): Promise<(string | number | string[])[]> {
        return this.driver.getInputValues(parentCssSelector, cssSelector);
    }
}
