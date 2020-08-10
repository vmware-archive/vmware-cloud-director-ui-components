/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.
 *
 * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that
 * queries the internals of a component from a test.
 *
 * ## Subclass Rules
 *
 * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage
 * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.
 *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can
 * assert code on its own.
 *
 * `T` is the type of the JS/TS object being wrapped
 *
 * It is recommended that files for implementations be named with a `.wo.ts` extension
 */
export abstract class WidgetObject<T> {
    /**
     *
     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you
     * need to find a widget within the tree, you should use {@link find}.
     *
     * @param component The component instance being managed. Whenever possible, we should access the component's API.
     * @param root The root element (host) for the component instance. We typically prefer to interact with the
     * component but there are times when we must check the DOM.
     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that
     * requires re-rendering of the DOM.
     */
    constructor(
        protected fixture: ComponentFixture<any>,
        protected root: DebugElement = fixture.debugElement,
        public component: T = fixture.componentInstance
    ) {}

    detectChanges(): void {
        this.fixture.detectChanges();
    }

    /**
     * Finds first element within this widget matching the given selector
     * @param selector What to search for
     * @param parent Where to start the search; defaults to the root of this component
     */
    protected findElement(selector: string | Type<unknown>, parent: DebugElement = this.root): DebugElement {
        const query = typeof selector === 'string' ? By.css(selector) : By.directive(selector);
        return parent.query(query);
    }

    /**
     * Same as {@link findElement} but returns all elements
     */
    protected findElements(selector: string | Type<unknown>, parent: DebugElement = this.root): DebugElement[] {
        const query = typeof selector === 'string' ? By.css(selector) : By.directive(selector);
        return parent.queryAll(query);
    }

    /**
     * Clicks an element and detects changes so the DOM is immediately updated
     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will
     * receive the click event
     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.
     */
    protected click(cssSelector?: string, parent: DebugElement = this.root): void {
        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;
        nativeElement.click();
        this.detectChanges();
    }

    /**
     * Sends a keyboard event defined by the key to an element and detects changes so the DOM is immediately updated.
     * The keyboard event consists of keydow
     * @param key the key, for example Enter, Escape, ArrowUp etc.
     * @param cssSelector Pass this in if you want trigger the event on a specific element.
     *        If not passed in, the event will be triggered on the entire node
     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.
     */
    protected sendKeyboardEvent(key: string, cssSelector?: string, parent: DebugElement = this.root): void {
        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;
        nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
        this.detectChanges();
    }

    /**
     * Sets the value of an input element or textarea element
     * @param value the value that the element should display
     * @param cssSelector Pass this in if you want trigger the event on a specific element.
     *        If not passed in, the event will be triggered on the entire node
     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.
     */
    protected setInputValue(value: string | number, cssSelector?: string, parent: DebugElement = this.root): void {
        const nativeElement: HTMLInputElement | HTMLTextAreaElement = parent.query(By.css(cssSelector)).nativeElement;
        nativeElement.value = String(value);
        nativeElement.dispatchEvent(new Event('input'));
        this.detectChanges();
    }

    /**
     * Returns text content of this widget
     * If the element cannot be found, gives empty string.
     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.
     * @param parent Where to start the search; defaults to the root of this component
     */

    protected getText(cssSelector: string, parent: DebugElement = this.root): string {
        const element = this.findElement(cssSelector, parent);
        return element ? this.getNodeText(element) : '';
    }

    /**
     * Same as {@link getText} but return the text for all matching nodes
     */
    protected getTexts(cssSelector: string): string[] {
        return this.findElements(cssSelector).map(el => this.getNodeText(el));
    }

    protected getNodeText(el: DebugElement): string {
        // The || '' is because textContent could technically be null when passed in the document
        // element object. We know that cannot be pased in here, so we ignore it for coverage
        // but we still need the line there to make strictNullChecks work
        return el.nativeElement.textContent.trim() || /* istanbul ignore next */ '';
    }
}

/**
 * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}
 *
 * ## Note
 * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this
 * interface represents a constructor for a {@link WidgetObject}, not an instance.
 */
export interface FindableWidget<T> extends Type<T> {
    tagName: string;
}

/**
 * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}
 */
export interface FindParams<T> {
    /**
     * The constructor of the widget to be found
     */
    woConstructor: T;
    /**
     * If provided, search starts from this container. It defaults to the fixture's root debugElement
     */
    ancestor?: DebugElement;
    /**
     * Optional CSS class name that can be used when there could be multiple instances of the object within the
     * fixture tree
     */
    className?: string;
}

/**
 * Finds instances that implement {@link FindableWidget}
 * H is the host component's type
 */
export class WidgetFinder<H = unknown> {
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
    constructor(componentConstructor: Type<H>) {
        this.fixture = TestBed.createComponent(componentConstructor);
        this.hostComponent = this.fixture.componentInstance;
    }

    /**
     * Finds widgets within a fixture
     * @return A Potentially empty list of widgets matching the given specs
     */
    public findWidgets<C, T extends FindableWidget<C>>(
        params: FindParams<T> | T,
        parent?: DebugElement
    ): InstanceType<T>[] {
        const defaults = { ancestor: this.fixture.debugElement, className: '' };
        const { woConstructor, ancestor, className } = isFindParamsObject(params)
            ? { ...defaults, ...params }
            : { ...defaults, woConstructor: params };

        let query = woConstructor.tagName;
        if (className) {
            query += `.${className}`;
        }
        const componentRoots = (parent ? parent : ancestor).queryAll(By.css(query));
        const widgets = componentRoots.map(
            // Typescript is not able to infer it correctly as the subclass but we know for sure
            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>
        );
        return widgets;
    }

    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {
        const widgets = this.findWidgets(params);
        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;
        if (widgets.length === 0) {
            throw Error(`Did not find a <${tagName}>`);
        }
        if (widgets.length > 1) {
            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);
        }
        return widgets[0] as InstanceType<T>;
    }

    public detectChanges(): void {
        this.fixture.detectChanges();
    }
}

export function isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {
    return !!(params as FindParams<T>).woConstructor;
}
/**
 * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures
 */
export interface HasFinder<T = unknown> {
    finder: WidgetFinder<T>;
}
