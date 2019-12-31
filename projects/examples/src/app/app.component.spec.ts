/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '../../../components/src/lib/components.module';
import { DataExporterModule } from '../../../components/src/data-exporter/data-exporter.module';
import { DocLibModule } from '../../../doc-lib/src/lib/doc-lib.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ClarityModule, DataExporterModule, DocLibModule],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
