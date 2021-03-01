/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Injector, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseWidgetObject, FindableWidget, FindElementOptions, WidgetObjectElement } from '../widget-object';
import { AngularWidgetObjectFinder, FindAngularWidgetOptions } from './angular-widget-finder';

/**
 * Angular implementation of the Widget Object's internal HTML Element wrapper
 * Its `unwrap` method returns a DebugElementWrapper, which wraps Angular's DebugElement so that it can be considered
 * a collection and to simplify access to its attributes
 */
export class AngularWidgetObjectElement implements WidgetObjectElement<TestElement> {
    constructor(private testElement: TestElement) {}

    /**
     * @inheritdoc
     */
    get(selector: string | FindElementOptions): AngularWidgetObjectElement {
        const cssSelector = typeof selector === 'string' ? selector : selector.cssSelector;
        const elements = this.testElement.elements;
        let matches = [].concat(...elements.map((element) => element.queryAll(By.css(cssSelector))));
        if (typeof selector !== 'string') {
            if (typeof selector.index === 'number') {
                matches = [matches[selector.index]];
            } else if (selector.text) {
                matches = matches.filter((el) => el.nativeElement.textContent.includes(selector.text));
            }
        }
        return new AngularWidgetObjectElement(new TestElement(matches, this.testElement.fixture));
    }
    /**
     * @inheritdoc
     */
    getByText(cssSelector: string, value: string): AngularWidgetObjectElement {
        const elements = this.testElement.elements;
        let nextElements = [].concat(...elements.map((element) => element.queryAll(By.css(cssSelector))));
        nextElements = nextElements.filter((el) => el.nativeElement.textContent.includes(value));
        return new AngularWidgetObjectElement(new TestElement(nextElements, this.testElement.fixture));
    }

    /**
     * @inheritdoc
     */
    parents(cssSelector: string): AngularWidgetObjectElement {
        return new AngularWidgetObjectElement(
            new TestElement(
                this.testElement.elements.map((el) => this.findParent(cssSelector, el.parent)),
                this.testElement.fixture
            )
        );
    }

    /**
     * @inheritdoc
     */
    click(): void {
        this.testElement.click();
    }

    /**
     * @inheritdoc
     */
    check(options?: unknown): void {}

    /**
     * @inheritdoc
     */
    uncheck(options?: unknown): void {}

    /**
     * @inheritdoc
     */
    select(value: string, options?: unknown): void {}

    type(value: string): void {
        const inputEl = this.testElement.elements[0].nativeElement as HTMLInputElement;
        inputEl.value = String(value);
        inputEl.dispatchEvent(new Event('change'));
        inputEl.dispatchEvent(new Event('input'));
    }

    /**
     * Looks up the chain of debug elements until it finds a parent that matches the CSS selector.
     * Checks the given element.
     */
    private findParent(cssSelector: string, debugElement: DebugElement): DebugElement {
        if (!debugElement) {
            return;
        }
        if (debugElement.nativeElement.matches(cssSelector)) {
            return debugElement;
        }
        return this.findParent(cssSelector, debugElement.parent);
    }

    /**
     * @inheritdoc
     */
    unwrap(): TestElement {
        return this.testElement;
    }

    /**
     * @inheritdoc
     */
    findWidget<W extends BaseWidgetObject<TestElement>>(
        widgetCtor: FindableWidget<TestElement, W>,
        findOptions: FindAngularWidgetOptions
    ): W {
        return new AngularWidgetObjectFinder(this.testElement.fixture).find(widgetCtor, {
            ...findOptions,
            ancestor: this.testElement.elements[0],
        });
    }
}

/**
 * A wrapper around an array of DebugElements that adds convenience methods.
 * Avoid accessing the debug elements at all costs.
 *
 * Can be used in a `for ... of ...` loop to inspect all the sub elements within this TestElement.
 *
 * @example
 * for (const el of testElement) {
 *     expect(el.enabled()).toBeTruthy()
 * }
 */
export class TestElement implements Iterable<TestElement> {
    constructor(public elements: DebugElement[], public fixture: ComponentFixture<any>) {}

    private get firstNativeElement(): HTMLElement {
        return this.firstDebugElement.nativeElement;
    }

    private get firstDebugElement(): DebugElement {
        return this.elements[0];
    }

    private forEach(cb: (item: DebugElement, index, array: DebugElement[]) => void): void {
        this.elements.forEach(cb);
    }

    /**
     * Gives the text of the first element.
     */
    text(): string {
        return this.firstNativeElement.textContent.trim();
    }

    /**
     * Gives the value of the first element.
     */
    value(): string {
        return (this.firstNativeElement as HTMLInputElement).value;
    }

    /**
     * Says if this element is enabled.
     */
    enabled(): boolean {
        return !(this.firstNativeElement as HTMLInputElement).disabled;
    }

    /**
     * Clicks all of the elements contained.
     */
    click(): void {
        this.forEach((element) => element.nativeElement.click());
        this.fixture.detectChanges();
    }

    /**
     * Blurs all the contained elements.
     */
    blur(): void {
        this.forEach((el) => el.nativeElement.dispatchEvent(new Event('blur')));
        this.fixture.detectChanges();
    }

    /**
     * Clears the input on all the contained elements.
     */
    clear(): void {
        this.forEach((el) => (el.nativeElement.value = ''));
        this.fixture.detectChanges();
    }

    /**
     * Says how many elements are contained in this TestElement.
     */
    length(): number {
        return this.elements.length;
    }

    /**
     * Runs change detection with the component fixture.
     */
    detectChanges(): void {
        this.fixture.detectChanges();
    }

    /**
     * Gives the elements contained within this TestElement where each element is its own TestElement
     */
    toArray(): TestElement[] {
        return this.elements.map((el) => new TestElement([el], this.fixture));
    }

    /**
     * Maps over each element of this collection
     */
    map<U>(callbackfn: (el: TestElement, index: number, array: TestElement[]) => U): U[] {
        return this.toArray().map(callbackfn);
    }

    /**
     * Send a keyboard event of type {@param eventType} with properties {@param eventProperties} on this element.
     * Setting the event properties is done with `Object.defineProperty` on the created event. This allows setting
     * properties like `which` that is deprecated and cannot be set with the native approach of creating keyboard event.
     * @param eventType The keyboard event type like 'keyup', 'keydown', 'keypress'
     * @param eventProperties properties of the event like `code`, `key` etc.
     */
    sendKeyboardEvent(eventType: string, eventProperties: { [name: string]: unknown }): void {
        const event = new KeyboardEvent(eventType, { bubbles: true });
        Object.keys(eventProperties).forEach((key) => {
            Object.defineProperty(event, key, { value: eventProperties[key] });
        });
        this.firstNativeElement.dispatchEvent(event);
        this.detectChanges();
    }

    /**
     * To simulate a mouse hover event on the test element
     */
    mouseOver(): void {
        this.firstNativeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        this.detectChanges();
    }

    /**
     * To simulate a mouse out event on the test element
     */
    mouseOut(): void {
        this.firstNativeElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        this.detectChanges();
    }

    /**
     * Returns classes of first element as a string array
     */
    classes(): string[] {
        return Object.keys(this.firstDebugElement.classes);
    }

    /**
     * Returns style property value of the first element
     * @param key specified CSS property
     */
    getStylePropertyValue(key: string): string {
        return this.firstNativeElement.style.getPropertyValue(key);
    }

    /**
     * Returns componentInstance of the first element
     */
    getComponentInstance(): any {
        return this.firstDebugElement.componentInstance;
    }

    /**
     * Returns injector of the first element
     */
    getInjector(): Injector {
        return this.firstDebugElement.injector;
    }

    /**
     * Finds the first parent element that matches the CSS selector
     */
    private findParents(debugEl: DebugElement, cssSelector: string): DebugElement {
        if (!debugEl) {
            return null;
        }
        return debugEl.nativeElement.matches(cssSelector) ? debugEl : this.findParents(debugEl.parent, cssSelector);
    }

    /**
     * Returns the first parent element that matches css selector
     */
    parents(cssSelector: string): TestElement {
        const result = this.findParents(this.firstDebugElement.parent, cssSelector);
        return new TestElement(result ? [result] : [], this.fixture);
    }

    /**
     * Returns componentInstance after query directive
     */
    queryDirective(type: Type<any>): any {
        return this.firstDebugElement.query(By.directive(type)).componentInstance;
    }

    /**
     * Returns children of the first element that matches css selector
     */
    queryElements(cssSelector: string): TestElement {
        const result = this.firstDebugElement.queryAll(By.css(cssSelector));
        return new TestElement(result ? result : [], this.fixture);
    }

    /**
     * Allows a TestElement to be used in a `for ... of ...` loop.
     */
    [Symbol.iterator](): Iterator<TestElement, any, undefined> {
        let counter = 0;
        return {
            next: () => {
                counter += 1;
                return {
                    done: counter === this.elements.length,
                    value: new TestElement([this.elements[counter]], this.fixture),
                };
            },
        };
    }
}
