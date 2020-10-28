/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseWidgetObject, TaggedClass } from './widget-locator';
import { CorrectReturnTypes, LocatorDriver } from './widget-locator';

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
    findWidget<W extends TaggedClass & Type<BaseWidgetObject<TestElement>>>(
        widget: W
    ): CorrectReturnTypes<InstanceType<W>, TestElement> {
        return new AngularWidgetObjectFinder(this.testElement.fixture).find(widget, this.rootElement);
    }
}

/**
 * A wrapper around an array of DebugElements that adds convenience methods.
 * Avoid accessing the debug elements at all costs.
 */
export class TestElement {
    constructor(public elements: DebugElement[], public fixture: ComponentFixture<any>) {}

    /**
     * Gives the text of the elements concatonated with `, `.
     */
    text(): string {
        return this.elements.map((element) => element.nativeElement.textContent.trim()).join(', ');
    }

    /**
     * Gives the value of the elements concatonated with `, `.
     */
    value(): string {
        return this.elements.map((element) => element.nativeElement.value).join(', ');
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
}

/**
 * An internal type that makes the function return a TestElement.
 */
type CorrectReturnType<F> = F extends (...args: any[]) => infer R
    ? (...args: Parameters<F>) => TestElement
    : TestElement;
/**
 * Changes the class so that all functions/getters return TestElements.
 */
export type AngularifyReturnTypes<T> = {
    [P in keyof T]: CorrectReturnType<T[P]>;
};

/**
 * Knows how to find Angular objects in the DOM.
 */
export class AngularWidgetObjectFinder<H = unknown> {
    /**
     * We don't care or could possibly know the type of fixture
     */
    private fixture: ComponentFixture<H>;

    /**
     * If you need direct access to manipulate the host
     */
    public hostComponent: H;

    /**
     * @param componentConstructor The host component to be created as the root of the tests's fixture
     */
    constructor(arg: Type<H> | ComponentFixture<H>) {
        this.fixture = (arg as ComponentFixture<H>).componentRef
            ? (arg as ComponentFixture<H>)
            : TestBed.createComponent(arg as Type<H>);
        this.hostComponent = this.fixture.componentInstance;
    }

    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<T extends TaggedClass & Type<BaseWidgetObject<TestElement>>, G>(
        widgetConstructor: T,
        ancestor?: DebugElement,
        className?: string
    ): CorrectReturnTypes<InstanceType<T>, TestElement> {
        let query = widgetConstructor.tagName;
        if (className) {
            query += `.${className}`;
        }
        if (ancestor) {
            query = query;
        }

        const root = (ancestor ? ancestor : this.fixture.debugElement).query(By.css(query));
        const widget = new widgetConstructor(new AngularLocatorDriver(new TestElement([root], this.fixture), root));
        return (widget as any) as CorrectReturnTypes<InstanceType<T>, TestElement>;
    }

    /**
     * Runs a change detection cycle.
     */
    public detectChanges(): void {
        this.fixture.detectChanges();
    }
}
