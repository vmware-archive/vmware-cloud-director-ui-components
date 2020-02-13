/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BOOTSTRAP_DETAILS } from '@vcd/i18n';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic([
    {
        provide: BOOTSTRAP_DETAILS,
        useValue: {
            locale: 'en',
        },
    },
])
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
