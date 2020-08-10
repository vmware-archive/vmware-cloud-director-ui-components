/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularWidgetDriver } from './angular-widget-driver';
import { FindableWidget, FindParams, isFindParamsObject } from './widget-object';

/**
 * Finds instances that implement {@link FindableWidget}
 * H is the host component's type
 */
export class AngularWidgetFinder<H = unknown> {
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
            root => new woConstructor(new AngularWidgetDriver(this.fixture, root, root.componentInstance))
        );
        return widgets as InstanceType<T>[];
    }

    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T, parent?: DebugElement): InstanceType<T> {
        const widgets = this.findWidgets(params, parent);
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

/**
 * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures
 */
export interface HasAngularFinder {
    finder: AngularWidgetFinder;
}
