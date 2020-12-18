/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AngularWidgetObjectFinder } from './angular-widget-finder';
import { AngularLocatorDriver, TestElement } from './angular-widget-object';
import { BaseWidgetObject } from './widget-object';

/**
 * This is the reusable component being tested, typically goes in its own file
 */
@Component({
    selector: 'vcd-click-tracker',
    template: `
        <div>
            <h1>
                <b>hello</b>
            </h1>
            <p (click)="clickCount = clickCount + 1">
                Clicks: <span class="click-count">{{ clickCount }}</span>
            </p>
            <button ng-disabled="{{ true }}">BUTTON</button>
            <button>BUTTON2</button>
            <input type="text" id="fname" name="fname" class="name" [(ngModel)]="name" />
        </div>
    `,
})
class ClickTrackerComponent {
    @Input() header = 'Click Tracker';
    clickCount = 0;

    name = '';
}

class HeaderWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'h1';

    getBoldText(): T {
        return this.locatorDriver.get('b').unwrap();
    }
}

/**
 * Each component being tested should have a matching widget object.
 *
 * This class could be tested mostly through the component instance but we are using the HTML to show the base class's
 * functionality
 */
class ClickTrackerWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-click-tracker';

    getClickCount = this.locatorForCssSelectors('.click-count');

    getHeaderText = this.locatorForCssSelectors('h1');

    getTrackerElement = this.locatorForCssSelectors('p');

    getNameInput = this.locatorForCssSelectors('.name');

    getButton = this.locatorForText('button', 'BUTTON');

    getButtons = this.locatorForCssSelectors('button');

    getTrackerElementUsingParent(): T {
        return this.locatorDriver.get('span').parents('p').unwrap();
    }

    findHeaderWidget(): HeaderWidgetObject<T> {
        return this.locatorDriver.findWidget(HeaderWidgetObject);
    }

    getSelf(): T {
        return this.locatorDriver.unwrap();
    }
}

/**
 * This is the host component that is typically created within the test
 */
@Component({
    template: `<vcd-click-tracker header="First"></vcd-click-tracker> `,
})
class HostComponent {}

interface HasAngularFinder {
    finder: AngularWidgetObjectFinder;
}

/**
 * Test object for the tests below
 */
interface HasClickTracker {
    clickTracker: ClickTrackerWidgetObject<TestElement>;
    fixture: ComponentFixture<ClickTrackerComponent>;
}

function setup(fixtureRoot: Type<unknown>): void {
    beforeEach(async function (this: HasAngularFinder): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ClickTrackerComponent, fixtureRoot],
        }).compileComponents();
        this.finder = new AngularWidgetObjectFinder(fixtureRoot);
        this.finder.detectChanges();
    });
}

describe('AngularWidgetFinder', () => {
    describe('when there is a single instance within host', () => {
        setup(HostComponent);

        describe('find', () => {
            it('returns the first one within the fixture if no classname is specified', function (this: HasAngularFinder): void {
                const widget = this.finder.find(ClickTrackerWidgetObject);
                expect(widget.getHeaderText().text()).toEqual('hello');
            });
        });
    });
});

describe('AngularLocatorDriver', () => {
    beforeEach(async function (this: HasClickTracker): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ClickTrackerComponent],
        }).compileComponents();

        this.fixture = TestBed.createComponent(ClickTrackerComponent);
        this.fixture.detectChanges();
        this.clickTracker = new ClickTrackerWidgetObject(
            new AngularLocatorDriver(
                new TestElement([this.fixture.debugElement], this.fixture),
                this.fixture.debugElement
            )
        );
    });

    describe('get', () => {
        it('can find elements by CSS selector', function (this: HasClickTracker): void {
            expect(this.clickTracker.getClickCount().text()).toEqual('0');
        });
    });

    describe('findWidget', () => {
        it('can find widgets within widgets', function (this: HasClickTracker): void {
            expect(this.clickTracker.findHeaderWidget().getBoldText().text()).toEqual('hello');
        });
    });

    describe('parents', () => {
        it('can find a parent by css selector', function (this: HasClickTracker): void {
            this.clickTracker.getTrackerElementUsingParent().click();
            expect(this.clickTracker.getClickCount().text()).toEqual('1');
        });
    });

    describe('getByText', () => {
        it('can find an element by text', function (this: HasClickTracker): void {
            expect(this.clickTracker.getButton().text()).toEqual('BUTTON');
        });
    });
});

/**
 * For all these tests of base class functionality, you must look at the implementation of the methods being called
 * in the concrete {@link ClickTrackerWidgetObject}
 */
describe('TestElement', () => {
    beforeEach(async function (this: HasClickTracker): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ClickTrackerComponent],
        }).compileComponents();

        this.fixture = TestBed.createComponent(ClickTrackerComponent);
        this.fixture.detectChanges();
        this.clickTracker = new ClickTrackerWidgetObject(
            new AngularLocatorDriver(
                new TestElement([this.fixture.debugElement], this.fixture),
                this.fixture.debugElement
            )
        );
    });

    describe('text', () => {
        it('can find elements within itself passing a css query', function (this: HasClickTracker): void {
            expect(this.clickTracker.getClickCount().text()).toEqual('0');
        });
    });

    describe('click', () => {
        it('calls detectChanges after clicking', function (this: HasClickTracker): void {
            this.clickTracker.getTrackerElement().click();
            expect(this.clickTracker.getClickCount().text()).toEqual('1');
        });
    });

    describe('value', () => {
        it('gives the value from an input', fakeAsync(function (this: HasClickTracker): void {
            this.clickTracker.getSelf().getComponentInstance().name = 'Ryan';
            this.clickTracker.getSelf().detectChanges();
            tick();
            expect(this.clickTracker.getNameInput().value()).toEqual('Ryan');
        }));
    });

    describe('clear', () => {
        it('clears the input', fakeAsync(function (this: HasClickTracker): void {
            this.clickTracker.getSelf().getComponentInstance().name = 'Ryan';
            this.clickTracker.getSelf().detectChanges();
            tick();
            expect(this.clickTracker.getNameInput().value()).toEqual('Ryan');
            this.clickTracker.getNameInput().clear();
            expect(this.clickTracker.getNameInput().value()).toEqual('');
        }));
    });

    describe('length', () => {
        it('says how many elements are in this TestElement', function (this: HasClickTracker): void {
            expect(this.clickTracker.getButtons().length()).toEqual(2);
        });
    });

    describe('toArray', () => {
        it('turns the TestElement to an array of TestElements', function (this: HasClickTracker): void {
            expect(
                this.clickTracker
                    .getButtons()
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['BUTTON', 'BUTTON2']);
        });
    });

    describe('classes', () => {
        it('gives the classes of an input', function (this: HasClickTracker): void {
            expect(this.clickTracker.getNameInput().classes()).toContain('name');
        });
    });
});
