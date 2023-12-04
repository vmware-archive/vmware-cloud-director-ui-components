/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { IconsModule } from '../../../icons';
import { WidgetObject } from '../../../utils/test/widget-object';
import { ALTERNATIVE_TEXT } from './alternative-text.directive';
import { AlternativeTextModule } from './alternative-text.module';

interface TestContext {
    widget: ComponentTestWidget;
    fixture: ComponentFixture<TestHostComponent>;
}

@Component({
    template: `
        <cds-icon shape="home" [vcdAlternativeText]="altText">
            <svg></svg>
        </cds-icon>
        <cds-icon shape="check">
            <svg></svg>
        </cds-icon>
        <cds-icon shape="times" [vcdAlternativeText]="'Times icon'">
            <svg alt="pre-set text"></svg>
        </cds-icon>
    `,
})
export class TestHostComponent {
    altText = 'Home';
}

class ComponentTestWidget extends WidgetObject<TestHostComponent> {
    public getAlternativeText(shape: string): string {
        return this.findElement(`cds-icon[shape="${shape}"] svg`).nativeElement.getAttribute(ALTERNATIVE_TEXT);
    }
}

describe('AlternativeTextDirective', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClarityModule, AlternativeTextModule, IconsModule],
            declarations: [TestHostComponent],
        }).compileComponents();
    });

    beforeEach(function (this: TestContext): void {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.widget = new ComponentTestWidget(this.fixture);
        this.widget.detectChanges();
    });

    it('sets the "alt" attribute', function (this: TestContext): void {
        expect(this.widget.getAlternativeText('home')).toBe(this.widget.component.altText);
    });

    it('sets the "alt" attribute to blank when no value is set', function (this: TestContext): void {
        expect(this.widget.getAlternativeText('check')).toBe('');
    });

    it('does not set the "alt" attribute when there is one already', function (this: TestContext): void {
        expect(this.widget.getAlternativeText('times')).toBe('pre-set text');
    });
});
