/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
// eslint-disable-next-line import/order
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// Required so typescript to access karma's context
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-match
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
