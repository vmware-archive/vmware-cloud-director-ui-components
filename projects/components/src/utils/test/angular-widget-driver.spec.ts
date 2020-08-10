/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularWidgetDriver } from './angular-widget-driver';
import { AngularWidgetFinder, HasAngularFinder } from './angular-widget-finder';
import { BaseWidgetObject } from './base-widget-object';

/**
 * This is the reusable component being tested, typically goes in its own file
 */
@Component({
    selector: 'vcd-click-tracker',
    template: `
        <div>
            <h1>{{ header }}</h1>
            <p (click)="clickCount = clickCount + 1">
                Clicks: <span class="click-count">{{ clickCount }}</span>
            </p>
        </div>
    `,
})
class ClickTrackerComponent {
    @Input() header = 'Click Tracker';
    clickCount = 0;
}

/**
 * Each component being tested should have a matching widget object.
 *
 * This class could be tested mostly through the component instance but we are using the HTML to show the base class's
 * functionality
 */
class ClickTrackerWidgetObject extends BaseWidgetObject {
    static tagName = 'vcd-click-tracker';

    get clickCount(): Promise<string> {
        // If we wanted to use the instance, but we want to show base functionality
        // return this.component.clickCount;
        return this.getText('.click-count');
    }

    get headerText(): Promise<string> {
        // If we wanted to use the instance
        // return this.component.header;
        return this.getText('h1');
    }

    clickTrackedElement(): Promise<void> {
        // Clicking requires the DOM
        return this.click('p');
    }
}

/**
 * These are the host components that are typically created within the test
 */
@Component({
    template: `
        <vcd-click-tracker header="First" class="first"></vcd-click-tracker>
        <vcd-click-tracker header="Second" class="second"></vcd-click-tracker>
    `,
})
class HostWithTwoComponent {}

/**
 * This is the host component that is typically created within the test
 */
@Component({
    template: `
        <vcd-click-tracker header="First"></vcd-click-tracker>
    `,
})
class HostWithOneComponent {}

function setup(fixtureRoot: Type<unknown>): void {
    beforeEach(async function(this: HasAngularFinder): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [ClickTrackerComponent, fixtureRoot],
        }).compileComponents();
        this.finder = new AngularWidgetFinder(fixtureRoot);
        this.finder.detectChanges();
    });
}

describe('AngularWidgetFinder', () => {
    describe('when there are multiple instances within host', () => {
        setup(HostWithTwoComponent);

        describe('find', () => {
            it('finds object by simple CSS classNames', async function(this: HasAngularFinder): Promise<void> {
                const widget = this.finder.find({
                    woConstructor: ClickTrackerWidgetObject,
                    className: 'second',
                });
                expect(await widget.headerText).toBe('Second');
            });

            it('throws an error if widget is not found', function(this: HasAngularFinder): void {
                expect(() => {
                    this.finder.find({
                        woConstructor: ClickTrackerWidgetObject,
                        className: 'does-not-exist',
                    });
                }).toThrow();
            });

            it('throws an error if multiple widgets are found', function(this: HasAngularFinder): void {
                expect(() => {
                    this.finder.find(ClickTrackerWidgetObject);
                }).toThrow();
            });
        });

        describe('findWidgets', () => {
            it('does not throw an error if no widgets are found', function(this: HasAngularFinder): void {
                expect(() => {
                    this.finder.findWidgets({
                        woConstructor: ClickTrackerWidgetObject,
                        className: 'does-not-exist',
                    });
                }).not.toThrow();
            });
        });
    });

    describe('when there is a single instance within host', () => {
        setup(HostWithOneComponent);

        describe('find', () => {
            it('returns the first one within the fixture if no classname is specified', function(this: HasAngularFinder): void {
                const widget = this.finder.find(ClickTrackerWidgetObject);
                widget.headerText.then(item => item === 'First');
            });
        });
    });
});

/**
 * Test object for the tests below
 */
interface HasClickTracker {
    clickTracker: ClickTrackerWidgetObject;
    fixture: ComponentFixture<ClickTrackerComponent>;
}

/**
 * For all these tests of base class functionality, you must look at the implementation of the methods being called
 * in the concrete {@link ClickTrackerWidgetObject}
 */
describe('WidgetObject (through ClickTracerWidgetObject)', () => {
    beforeEach(async function(this: HasClickTracker): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [ClickTrackerComponent],
        }).compileComponents();

        this.fixture = TestBed.createComponent(ClickTrackerComponent);
        this.fixture.detectChanges();
        this.clickTracker = new ClickTrackerWidgetObject(new AngularWidgetDriver(this.fixture));
    });

    afterEach(function(this: HasClickTracker): void {
        if (this.fixture) {
            this.fixture.destroy();
        }
    });

    describe('constructor', () => {
        it('can be called when you create the instance directly', function(this: HasClickTracker): void {
            expect(this.clickTracker).toBeTruthy();
        });
    });

    describe('getText', () => {
        it('can find elements within itself passing a css query', async function(this: HasClickTracker): Promise<void> {
            expect(await this.clickTracker.clickCount).toEqual('0');
        });
    });

    describe('click', () => {
        it('calls detectChanges after clicking', async function(this: HasClickTracker): Promise<void> {
            await this.clickTracker.clickTrackedElement();
            expect(await this.clickTracker.clickCount).toEqual('1');
        });
    });
});
