/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Injector, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularWidgetObjectFinder } from './angular-widget-finder';
import { BaseWidgetObject, FindableWidget } from './widget-object';
import { CorrectReturnTypes, LocatorDriver } from './widget-object';

/**
 * Knows how to find Angular TestElements in the DOM.
 */
export class AngularLocatorDriver implements LocatorDriver<TestElement> {
    constructor(private testElement: TestElement, private rootElement: DebugElement) {}

    /**
     * @inheritdoc
     */
    get(cssSelector: string): AngularLocatorDriver {
        const elements = this.testElement.elements;
        const nextElements = [].concat(...elements.map((element) => element.queryAll(By.css(cssSelector))));
        return new AngularLocatorDriver(new TestElement(nextElements, this.testElement.fixture), this.rootElement);
    }

    /**
     * @inheritdoc
     */
    getByText(cssSelector: string, value: string): AngularLocatorDriver {
        const elements = this.testElement.elements;
        let nextElements: DebugElement[] = [].concat(
            ...elements.map((element) => element.queryAll(By.css(cssSelector)))
        );
        nextElements = nextElements.filter((el) => el.nativeElement.textContent.includes(value));
        return new AngularLocatorDriver(new TestElement(nextElements, this.testElement.fixture), this.rootElement);
    }

    /**
     * @inheritdoc
     */
    parents(cssSelector: string): AngularLocatorDriver {
        return new AngularLocatorDriver(
            new TestElement(
                this.testElement.elements.map((el) => this.findParent(cssSelector, el.parent)),
                this.testElement.fixture
            ),
            this.rootElement
        );
    }

    /**
     * Looks up the chain of debug elements until it finds a parent that matches the CSS selector.
     * Checks the given element.
     */
    private findParent(cssSelector: string, debugElement: DebugElement): DebugElement {
        if (!debugElement) {
            return undefined;
        } else if (debugElement.nativeElement.matches(cssSelector)) {
            return debugElement;
        } else {
            return this.findParent(cssSelector, debugElement.parent);
        }
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
    findWidget<W extends BaseWidgetObject<TestElement>, C extends FindableWidget<TestElement, W>>(
        widget: C,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<C>, TestElement> {
        return new AngularWidgetObjectFinder(this.testElement.fixture).find(widget, this.rootElement, cssSelector);
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

    /**
     * Gives the text of the first element.
     */
    text(): string {
        return this.elements[0].nativeElement.textContent.trim();
    }

    /**
     * Gives the value of the first element.
     */
    value(): string {
        return this.elements[0].nativeElement.value;
    }

    /**
     * Says if this element is enabled.
     */
    enabled(): boolean {
        return !this.elements[0].nativeElement.disabled;
    }

    /**
     * Clicks all of the elements contained.
     */
    click(): void {
        this.elements.map((element) => element.nativeElement.click());
        this.fixture.detectChanges();
    }

    /**
     * Blurs all the contained elements.
     */
    blur(): void {
        this.elements.map((el) => el.nativeElement.dispatchEvent(new Event('blur')));
        this.fixture.detectChanges();
    }

    /**
     * Clears the input on all the contained elements.
     */
    clear(): void {
        this.elements.map((el) => (el.nativeElement.value = ''));
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
     * Send a keyboard event of type {@param eventType} with properties {@param eventProperties} on this element.
     * Setting the event properties is done with `Object.defineProperty` on the created event. This allows setting
     * properties like `which` that is deprecated and cannot be set with the native approach of creating keyboard event.
     * @param eventType The keyboard event type like 'keyup', 'keydown', 'keypress'
     * @param eventProperties properties of the event like `code`, `key` etc.
     */
    sendKeyboardEvent(eventType: string, eventProperties: { [name: string]: unknown }): void {
        const element = this.elements[0].nativeElement as HTMLElement;
        const event = new KeyboardEvent(eventType, { bubbles: true });
        Object.keys(eventProperties).forEach((key) => {
            Object.defineProperty(event, key, { value: eventProperties[key] });
        });
        element.dispatchEvent(event);
        this.detectChanges();
    }

    /**
     * Returns classes of first element as a string array
     */
    classes(): string[] {
        return Object.keys(this.elements[0].classes);
    }

    /**
     * Returns style property value of the first element
     * @param key specified CSS property
     */
    getStylePropertyValue(key: string): string {
        return this.elements[0].nativeElement.style.getPropertyValue(key);
    }

    /**
     * Returns componentInstance of the first element
     */
    getComponentInstance(): any {
        return this.elements[0].componentInstance;
    }

    /**
     * Returns injector of the first element
     */
    getInjector(): Injector {
        return this.elements[0].injector;
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
        const result = this.findParents(this.elements[0].parent, cssSelector);
        return new TestElement(result ? [result] : [], this.fixture);
    }

    /**
     * Returns componentInstance after query directive
     */
    queryDirective(type: Type<any>): any {
        return this.elements[0].query(By.directive(type)).componentInstance;
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
