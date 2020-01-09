/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleViewerComponent } from './example-viewer.component';

describe(ExampleViewerComponent.name, () => {
    let component: ExampleViewerComponent;
    let fixture: ComponentFixture<ExampleViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExampleViewerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExampleViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
