/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularWidgetFinder } from './angular-widget-finder';
import { WidgetDriver } from './base-widget-object';
import { FindableWidget, FindParams } from './widget-object';

/**
 * A WidgetDriver that knows how to interface with the Angular framework.
 */
export class AngularWidgetDriver<T> implements WidgetDriver {
    constructor(
        protected fixture: ComponentFixture<any>,
        protected root: DebugElement = fixture.debugElement,
        protected component: T = fixture.componentInstance
    ) {}

    find<W extends WidgetDriver>(params: FindParams<FindableWidget<W>> | FindableWidget<W>): W {
        return new AngularWidgetFinder(this.fixture).find<W, FindableWidget<W>>(params, this.root);
    }

    async click(cssSelector?: string): Promise<void> {
        this.getDebugElement(cssSelector).nativeElement.click();
        this.fixture.detectChanges();
    }

    async classes(cssSelector?: string): Promise<string[]> {
        return Object.keys(this.getDebugElement(cssSelector).nativeElement.classes);
    }

    async check(cssSelector?: string): Promise<void> {
        const checkboxElement = this.getDebugElement(cssSelector).nativeElement;
        checkboxElement.checked = !checkboxElement.checked;
        checkboxElement.dispatchEvent(new Event('change'));
        this.fixture.detectChanges();
    }

    async getChecked(cssSelector?: string): Promise<boolean> {
        return this.getDebugElement(cssSelector).nativeElement.checked;
    }

    async select(option: string, cssSelector?: string): Promise<void> {
        const selectElement = this.getDebugElement(cssSelector).nativeElement;
        selectElement.value = option;
        selectElement.dispatchEvent(new Event('change'));
        this.fixture.detectChanges();
    }

    async sendKeyboardKey(key: string, cssSelector?: string): Promise<void> {
        const nativeElement: HTMLBaseElement = this.getDebugElement(cssSelector).nativeElement;
        nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
        nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
        this.fixture.detectChanges();
    }

    async setInputValue(value: string, shouldAppend?: boolean, cssSelector?: string): Promise<void> {
        if (!shouldAppend) {
            this.clearInputValue(cssSelector);
        }
        return this.internalSetInputValue(this.getDebugElement(cssSelector), value);
    }

    async clearInputValue(cssSelector?: string): Promise<void> {
        return this.internalSetInputValue(this.getDebugElement(cssSelector), '');
    }

    private internalSetInputValue(element: DebugElement, value: string): void {
        element.nativeElement.value = String(value);
        element.nativeElement.dispatchEvent(new Event('input'));
        this.fixture.detectChanges();
    }

    async getText(cssSelector?: string): Promise<string> {
        return this.getDebugElement(cssSelector).nativeElement.textContent.trim();
    }

    async getTexts(parentCssSelector?: string, cssSelector?: string): Promise<string[]> {
        return this.getDebugElements(parentCssSelector, cssSelector).map(elem => elem.nativeElement.textContent.trim());
    }

    async getInputValue(cssSelector?: string): Promise<string | number | string[]> {
        return this.getDebugElement(cssSelector).nativeElement.value;
    }

    async getInputValues(parentCssSelector?: string, cssSelector?: string): Promise<(string | number | string[])[]> {
        return this.getDebugElements(parentCssSelector, cssSelector).map(elem => elem.nativeElement.value);
    }

    async exists(cssSelector?: string): Promise<boolean> {
        return !!this.getDebugElement(cssSelector);
    }

    async disabled(cssSelector?: string): Promise<boolean> {
        return this.getDebugElement(cssSelector).nativeElement.disabled;
    }

    async visible(cssSelector?: string): Promise<boolean> {
        return this.exists(cssSelector);
    }

    async hidden(cssSelector?: string): Promise<boolean> {
        return !(await this.exists(cssSelector));
    }

    private getDebugElement(cssSelector?: string): DebugElement {
        return cssSelector ? this.root.query(By.css(cssSelector)) : this.root;
    }

    private getDebugElements(parentCssSelector?: string, cssSelector?: string): DebugElement[] {
        const parent = parentCssSelector ? this.root.query(By.css(parentCssSelector)) : this.root;
        const query = cssSelector ? By.css(cssSelector) : By.all();
        return parent.queryAll(query);
    }
}
