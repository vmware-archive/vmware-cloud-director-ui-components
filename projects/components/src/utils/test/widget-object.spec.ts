/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, Input, Type } from '@angular/core';
import { HasFinder, WidgetFinder, WidgetObject } from './widget-object';

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
class ClickTrackerWidgetObject extends WidgetObject<ClickTrackerComponent> {
    static tagName = 'vcd-click-tracker';

    get clickCount(): number {
        // If we wanted to use the instance, but we want to show base functionality
        // return this.component.clickCount;
        return Number(this.getText('.click-count'));
    }

    get headerText(): string {
        // If we wanted to use the instance
        // return this.component.header;
        return this.getText('h1');
    }

    clickTrackedElement(): void {
        // Clicking requires the DOM
        this.click('p');
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
    beforeEach(async function(this: HasFinder): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [ClickTrackerComponent, fixtureRoot],
        }).compileComponents();
        this.finder = new WidgetFinder(fixtureRoot);
    });

    afterEach(function(this: HasFinder): void {
        if (this.finder) {
            this.finder.destroy();
        }
    });
}

describe('WidgetFinder', () => {
    describe('when there are multiple instances within host', () => {
        setup(HostWithTwoComponent);

        describe('find', () => {
            it('finds object by simple CSS classNames', function(this: HasFinder): void {
                const widget = this.finder.find({
                    woConstructor: ClickTrackerWidgetObject,
                    className: 'second',
                });
                expect(widget.headerText).toBe('Second');
            });

            it('throws an error if widget is not found', function(this: HasFinder): void {
                expect(() => {
                    this.finder.find({
                        woConstructor: ClickTrackerWidgetObject,
                        className: 'does-not-exist',
                    });
                }).toThrow();
            });

            it('throws an error if multiple widgets are found', function(this: HasFinder): void {
                expect(() => {
                    this.finder.find(ClickTrackerWidgetObject);
                }).toThrow();
            });
        });

        describe('findWidgets', () => {
            it('does not throw an error if no widgets are found', function(this: HasFinder): void {
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
            it('returns the first one within the fixture if no classname is specified', function(this: HasFinder): void {
                const widget = this.finder.find(ClickTrackerWidgetObject);
                expect(widget.headerText).toBe('First');
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
        this.clickTracker = new ClickTrackerWidgetObject(this.fixture);
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
        it('can find elements within itself passing a css query', function(this: HasClickTracker): void {
            expect(this.clickTracker.clickCount).toBe(0);
        });
    });

    describe('click', () => {
        it('calls detectChanges after clicking', function(this: HasClickTracker): void {
            this.clickTracker.clickTrackedElement();
            expect(this.clickTracker.clickCount).toBe(1);
        });
    });
});
