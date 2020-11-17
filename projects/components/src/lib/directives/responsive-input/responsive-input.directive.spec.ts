/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsiveInputDirectiveModule } from './responsive-input.module';

interface Test {
    fixture: ComponentFixture<TestHostComponent>;
}

describe('ResponsiveInputDirective', () => {
    beforeEach(async function (this: Test): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [ResponsiveInputDirectiveModule],
        }).compileComponents();
        this.fixture = TestBed.createComponent(TestHostComponent);
    });

    it('adds clr-row to input wrapper', function (this: Test): void {
        this.fixture.detectChanges();
        const helper = new TestHelper(this.fixture);
        expect(helper.rootHasClass('clr-row')).toBe(true, 'clr-row was not added to form control');
    });

    it('adds clr-col-12 and clr-col-md-2 to label', function (this: Test): void {
        this.fixture.detectChanges();
        const helper = new TestHelper(this.fixture);
        expect(helper.labelHasClass('clr-col-12')).toBe(true, 'clr-col-12 was not added to control label');
        expect(helper.labelHasClass('clr-col-md-2')).toBe(true, 'clr-md-2 was not added to control label');
    });

    it('adds clr-col-12 and clr-col-md-10 to input', function (this: Test): void {
        this.fixture.detectChanges();
        const helper = new TestHelper(this.fixture);
        expect(helper.inputHasClass('clr-col-12')).toBe(true, 'clr-col-12 was not added to control label');
        expect(helper.inputHasClass('clr-col-md-10')).toBe(true, 'clr-md-10 was not added to control label');
    });

    it('does not throw an error if label is missing', function (this: Test): void {
        this.fixture.componentInstance.showLabel = false;
        expect(() => this.fixture.detectChanges()).not.toThrow();
    });

    it('does not throw an error if input container is missing', function (this: Test): void {
        this.fixture.componentInstance.showInput = false;
        expect(() => this.fixture.detectChanges()).not.toThrow();
    });
});

class TestHelper {
    private root: DebugElement = this.fixture.debugElement.query(By.css('.clr-form-control'));
    constructor(private fixture: ComponentFixture<TestHostComponent>) {}

    rootHasClass(className: string): boolean {
        return className in this.root.classes;
    }
    labelHasClass(className: string): boolean {
        const label = this.root.query(By.css('.clr-control-label'));
        return className in label.classes;
    }
    inputHasClass(className: string): boolean {
        const label = this.root.query(By.css('.clr-control-container'));
        return className in label.classes;
    }
}
@Component({
    template: `
        <div class="clr-form-control" vcdResponsiveInput>
            <label *ngIf="showLabel" class="clr-control-label">Label</label>
            <div *ngIf="showInput" class="clr-control-container">input here</div>
        </div>
    `,
})
export class TestHostComponent {
    @Input()
    showLabel = true;
    @Input()
    showInput = true;
}
