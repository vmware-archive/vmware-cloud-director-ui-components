/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetFinder, WidgetObject } from '../utils/test/widget-object';
import { DomUtil } from './dom-util';

describe('DomUtil', () => {
    describe('scrollToElement', () => {
        // scrollToElement uses smooth scrolling, so we should give the browser some time to do it
        const SMOOTH_SCROLLING_TIMEOUT = 100;

        interface Test {
            finder: WidgetFinder<TestHostComponent>;
            widgetObject: TestHostWidgetObject;
        }

        beforeEach(async function (this: Test): Promise<void> {
            await TestBed.configureTestingModule({
                imports: [NoopAnimationsModule],
                declarations: [TestHostComponent],
            }).compileComponents();
            this.finder = new WidgetFinder(TestHostComponent);
            this.finder.detectChanges();
            this.widgetObject = this.finder.find(TestHostWidgetObject);
        });

        it('does not throw if no inputs are provided', () => {
            expect(DomUtil.scrollToElement.bind(DomUtil, null, null)).not.toThrow();
        });

        it('does not throw if the ElementRef is not valid', () => {
            expect(DomUtil.scrollToElement.bind(DomUtil, new ElementRef(null), null)).not.toThrow();
        });

        it('scrolls view to element defined by selector', function (this: Test, done): void {
            // Last element should be hidden
            expect(this.widgetObject.containerBottom).toBeLessThan(this.widgetObject.lastElementTop);
            DomUtil.scrollToElement(this.widgetObject.containerRef, TestHostComponent.LAST_ELEMENT_CSS);
            setTimeout(() => {
                // Last element should be visible now
                expect(this.widgetObject.containerBottom).toBeGreaterThan(this.widgetObject.lastElementTop);
                done();
            }, SMOOTH_SCROLLING_TIMEOUT);
        });

        it('scrolls view to the element ref when no selector is provided', function (this: Test, done): void {
            // Last element should be hidden
            expect(this.widgetObject.containerBottom).toBeLessThan(this.widgetObject.lastElementTop);
            DomUtil.scrollToElement(this.widgetObject.lastElementRef);
            setTimeout(() => {
                // Last element should be visible now
                expect(this.widgetObject.containerBottom).toBeGreaterThan(this.widgetObject.lastElementTop);
                done();
            }, SMOOTH_SCROLLING_TIMEOUT);
        });

        it('does not scrolls the view if the element is already visible', function (this: Test, done): void {
            const top = this.widgetObject.thirdElementTop;
            // Third element should be visible
            expect(this.widgetObject.containerBottom).toBeGreaterThan(top);
            DomUtil.scrollToElement(this.widgetObject.containerRef, TestHostComponent.THIRD_ELEMENT_CSS);
            setTimeout(() => {
                // Third element should not have been scrolled at all
                expect(this.widgetObject.thirdElementTop).toBe(top);
                done();
            }, SMOOTH_SCROLLING_TIMEOUT);
        });

        it('does not scrolls the view if element defined by selector does not exist', function (this: Test, done): void {
            const top = this.widgetObject.thirdElementTop;
            DomUtil.scrollToElement(this.widgetObject.containerRef, '.not-existing');
            setTimeout(() => {
                expect(this.widgetObject.thirdElementTop).toBe(top);
                done();
            }, SMOOTH_SCROLLING_TIMEOUT);
        });
    });
});

@Component({
    template: `
        <section>
            <div class="container">
                <div *ngFor="let el of elements; let i = index" class="element element-{{ i + 1 }}">{{ i + 1 }}</div>
            </div>
        </section>
    `,
    styles: [
        `
            .container {
                height: 100px;
                overflow: auto;
            }
            .element {
                height: 20px;
            }
        `,
    ],
})
export class TestHostComponent {
    private static ELEMENTS_COUNT = 7;
    public static THIRD_ELEMENT_CSS = `.element-3`;
    public static LAST_ELEMENT_CSS = `.element-${TestHostComponent.ELEMENTS_COUNT}`;
    public elements = Array(TestHostComponent.ELEMENTS_COUNT);
}

export class TestHostWidgetObject extends WidgetObject<TestHostComponent> {
    static tagName = `section`;

    private get container(): HTMLElement {
        return this.findElement('.container').nativeElement;
    }

    private get lastElement(): HTMLElement {
        return this.findElement(TestHostComponent.LAST_ELEMENT_CSS).nativeElement;
    }

    private get thirdElement(): HTMLElement {
        return this.findElement(TestHostComponent.THIRD_ELEMENT_CSS).nativeElement;
    }

    public get containerRef(): ElementRef {
        return new ElementRef(this.container);
    }

    public get containerBottom(): number {
        return this.container.getBoundingClientRect().bottom;
    }

    public get lastElementRef(): ElementRef {
        return new ElementRef(this.lastElement);
    }

    public get lastElementTop(): number {
        return this.lastElement.getBoundingClientRect().top;
    }

    public get thirdElementTop(): number {
        return this.thirdElement.getBoundingClientRect().top;
    }
}
