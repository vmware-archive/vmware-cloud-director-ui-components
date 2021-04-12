/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaseWidgetObject, FindableWidget, FindElementOptions } from '../widget-object';
import { AngularWidgetObjectElement, TestElement } from './angular-widget-object-element';

/**
 * Knows how to find and instantiate Angular Widgets objects.
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
     * @param arg The host component to be created as the root of the tests's fixture or its creator, in which
     * case, it will be created.
     */
    constructor(arg: Type<H> | ComponentFixture<H>) {
        this.fixture = (arg as ComponentFixture<H>).componentRef
            ? (arg as ComponentFixture<H>)
            : TestBed.createComponent(arg as Type<H>);
        this.hostComponent = this.fixture.componentInstance;
    }

    /**
     * Finds a single widget object
     *
     * @param widgetConstructor - The constructor of the widget to use
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<W extends BaseWidgetObject<TestElement>>(
        widgetConstructor: FindableWidget<TestElement, W>,
        findOptions: FindElementOptions<TestElement> = {}
    ): W {
        const { ancestor } = findOptions;

        const ancestorWidget = new AngularWidgetObjectElement(
            new TestElement([ancestor ? ancestor : this.fixture.debugElement], this.fixture)
        );
        let query = widgetConstructor.tagName;
        if (findOptions?.cssSelector) {
            query = query + findOptions.cssSelector;
        }
        const parentQuery: FindElementOptions<TestElement> = {
            cssSelector: query,
            dataUiSelector: findOptions?.dataUiSelector,
            text: findOptions?.text,
            index: findOptions?.index,
            options: findOptions?.options,
        };

        const element = ancestorWidget.get(parentQuery).unwrap();
        if (!element.length()) {
            throw new Error(`Could not find the widget using the query`);
        }
        if (element.length() > 1) {
            throw new Error(`Found ${element.length} elements matching the given query`);
        }

        const widget = new widgetConstructor(
            new AngularWidgetObjectElement(new TestElement(element.elements, this.fixture))
        );
        return widget;
    }

    /**
     * Runs a change detection cycle.
     */
    public detectChanges(): void {
        this.fixture.detectChanges();
    }
}
