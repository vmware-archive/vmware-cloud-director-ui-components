/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FindableWidget } from './widget-object';

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
 */
export abstract class WidgetObject<T> {
    /**
     *
     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you
     * need to find a widget within the tree, you should use {@link findWidget}.
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

    destroy(): void {
        this.fixture.destroy();
        this.fixture.debugElement.nativeElement.remove();
    }

    /**
     * Finds first element within this widget matching the given selector
     * @param cssSelector What to search for
     * @param parent Where to start the search; defaults to the root of this component
     */
    protected findElement(cssSelector?: string, parent: DebugElement = this.root): DebugElement {
        if (!cssSelector) {
            return parent;
        }
        return parent.query(By.css(cssSelector));
    }

    protected findElements(cssSelector?: string, parent: DebugElement = this.root): DebugElement[] {
        if (!cssSelector) {
            throw Error(`A css selector of desired elements is expected`);
        }
        return parent.queryAll(By.css(cssSelector));
    }

    /**
     * Clicks an element and detects changes so the DOM is immediately updated
     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will
     * receive the click event
     */
    protected click(cssSelector?: string): void {
        const nativeElement: HTMLBaseElement = this.findElement(cssSelector).nativeElement;
        nativeElement.click();
        this.detectChanges();
    }

    /**
     * Returns text content of this widget
     * @param val Pass this in if you want to retrieve text for a specific element within this widget.
     */
    protected getText(val?: Element | DebugElement | string): string {
        let nativeElement;
        if (typeof val === 'string') {
            nativeElement = this.findElement(val).nativeElement;
        } else {
            nativeElement = (val as DebugElement).nativeElement || val;
        }
        return nativeElement.textContent.trim() || '';
    }
}

/**
 * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}
 *
 * ## Note
 * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this
 * interface represents a constructor for a {@link WidgetObject}, not an instance.
 */
export interface FindableWidget<T> extends Type<WidgetObject<T>> {
    tagName: string;
}

/**
 * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}
 */
interface FindParams<T> {
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
 */
export class WidgetFinder {
    // We don't care or could possibly know the type of fixture
    private fixture: ComponentFixture<unknown>;

    /**
     * @param componentConstructor The host component to be created as the root of the tests's fixture
     */
    constructor(componentConstructor: Type<unknown>) {
        this.fixture = TestBed.createComponent(componentConstructor);
    }

    /**
     * Finds widgets within a fixture
     * @return A Potentially empty list of widgets matching the given specs
     */
    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T>): InstanceType<T>[] {
        const { woConstructor, ancestor = this.fixture.debugElement, className = '' } = params;

        let query = woConstructor.tagName;
        if (className) {
            query += `.${className}`;
        }
        const componentRoots = ancestor.queryAll(By.css(query));
        const widgets = componentRoots.map(
            // Typescript is not able to infer it correctly as the subclass but we know for sure
            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>
        );
        widgets.forEach(widget => widget.detectChanges());
        return widgets;
    }

    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<C, T extends FindableWidget<C>>(params: FindParams<T>): InstanceType<T> {
        const widgets = this.findWidgets(params);
        if (widgets.length === 0) {
            throw Error(`Did not find a <${params.woConstructor.tagName}>`);
        }
        if (widgets.length > 1) {
            throw Error(`Expected to find a single <${params.woConstructor.tagName}> but found ${widgets.length}`);
        }
        return widgets[0];
    }

    destroy(): void {
        this.fixture.destroy();
    }
}

/**
 * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures
 */
export interface HasFinder {
    finder: WidgetFinder;
}
