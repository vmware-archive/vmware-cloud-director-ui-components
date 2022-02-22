/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BaseWidgetObject } from '../widget-object';
import { AngularWidgetObjectFinder } from './angular-widget-finder';
import { AngularWidgetObjectElement, TestElement } from './angular-widget-object-element';

/**
 * We should always prefer DataUi attributes when possible. They are easy to share between
 * HTML and widget objects and can easily be stripped from production code while
 * making sure that CSS hooks don't get confused with testing specific hooks
 */
const DataUi = {
    clickCount: 'click-count',
    header: 'header',
    clickReceiver: 'click-receiver',
    nameInput: 'name-input',
    button: 'button',
};

/**
 * This is the reusable component being tested, typically goes in its own file
 */
@Component({
    selector: 'vcd-click-tracker',
    template: `
        <div>
            <h1 [attr.data-ui]="DataUi.header">
                <b>hello</b>
            </h1>
            <p (click)="clickCount = clickCount + 1" [attr.data-ui]="DataUi.clickReceiver">
                Clicks: <span data-ui="click-count">{{ clickCount }}</span>
            </p>
            <button disabled [attr.data-ui]="DataUi.button">BUTTON</button>
            <button [attr.data-ui]="DataUi.button">BUTTON2</button>
            <input
                type="text"
                id="fname"
                name="fname"
                class="name"
                [attr.data-ui]="DataUi.nameInput"
                [(ngModel)]="name"
            />
        </div>
    `,
})
class ClickTrackerComponent {
    DataUi = DataUi;

    @Input() header = 'Click Tracker';
    clickCount = 0;

    name = '';
}

class HeaderWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'h1';

    /**
     * This is a bad example for a method for an h1 because an h1 widget can't know that it contains a b tag
     */
    getBoldText(): T {
        return this.el.get('b').unwrap();
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

    private _getClickCount = this.internalFactory.dataUi(DataUi.clickCount);

    getClickCount = this.factory.unwrap(this._getClickCount);

    getHeaderText = this.factory.dataUi(DataUi.header);

    getTrackerElement = this.factory.dataUi(DataUi.clickReceiver);

    _getNameInput = this.internalFactory.dataUi(DataUi.nameInput);
    getNameInput = this.factory.dataUi(DataUi.nameInput);

    getButtons = this.factory.dataUi(DataUi.button);

    getButtonByLabel = this.factory.dataUi('button');

    getTrackerElementUsingParent(): T {
        return this._getClickCount().parents(`[data-ui=${DataUi.clickReceiver}]`).unwrap();
    }

    findHeaderWidget(): HeaderWidgetObject<T> {
        return this.el.findWidget<HeaderWidgetObject<T>>(HeaderWidgetObject);
    }

    typeNameInput(value: string) {
        this._getNameInput().clear();
        this._getNameInput().type(value);
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
                const widget = this.finder.find<ClickTrackerWidgetObject<TestElement>>(ClickTrackerWidgetObject);
                expect(widget.getHeaderText().text()).toEqual('hello');
            });
        });
    });
});

describe('AngularWidgetObjectElement', () => {
    beforeEach(async function (this: HasClickTracker): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ClickTrackerComponent],
        }).compileComponents();

        this.fixture = TestBed.createComponent(ClickTrackerComponent);
        this.fixture.detectChanges();
        this.clickTracker = new ClickTrackerWidgetObject(
            new AngularWidgetObjectElement(new TestElement([this.fixture.debugElement], this.fixture))
        );
    });

    describe('get', () => {
        it('can find elements by CSS selector', function (this: HasClickTracker): void {
            expect(this.clickTracker.getClickCount().text()).toEqual('0');
        });
        it('can find an element by text', function (this: HasClickTracker): void {
            expect(this.clickTracker.getButtonByLabel({ text: 'BUTTON2' }).text()).toEqual('BUTTON2');
        });
        it('can find an element by index', function (this: HasClickTracker): void {
            expect(this.clickTracker.getButtonByLabel({ index: 0 }).text()).toEqual('BUTTON');
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
            new AngularWidgetObjectElement(new TestElement([this.fixture.debugElement], this.fixture))
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
            this.clickTracker.self().getComponentInstance().name = 'Ryan';
            this.clickTracker.self().detectChanges();
            tick();
            expect(this.clickTracker.getNameInput().value()).toEqual('Ryan');
        }));
    });

    describe('clear', () => {
        it('clears the input', fakeAsync(function (this: HasClickTracker): void {
            this.clickTracker.self().getComponentInstance().name = 'Ryan';
            this.clickTracker.self().detectChanges();
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

    describe('clear', () => {
        it('clears a given input', function (this: HasClickTracker): void {
            this.clickTracker.typeNameInput('ryan');
            expect(this.clickTracker.getNameInput().value()).toEqual('ryan');
            this.clickTracker.typeNameInput('hannah');
            expect(this.clickTracker.getNameInput().value()).toEqual('hannah');
        });
    });
});
