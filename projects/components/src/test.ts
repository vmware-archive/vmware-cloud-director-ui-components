/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
/** Patches in SystemJs for use by the Angular Client */
import System from 'systemjs/dist/system';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
(window as any).SystemJs = System.registry.set('@vcd/common', System.newModule({})); // >= 9.5
// tslint:disable-next-line: ordered-imports
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Required so typescript to access karma's context
// tslint:disable-next-line:variable-name
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
