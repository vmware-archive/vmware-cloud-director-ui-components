/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
/**
 * Patches in SystemJs for use by the VCD Angular Client. This package is @vcd/angular-client.
 * This project requires that you use system JS to provide a module that gives injection tokens. We need
 * to mock this module.
 */
import System from 'systemjs/dist/system';
// Provides the @vcd/common module so loading the VcdApiClient does not throw an error.
(window as any).SystemJs = System.registry.set('@vcd/common', System.newModule({})); // >= 9.5
import 'zone.js';
import 'zone.js/testing';
// eslint-disable-next-line sort-imports
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
});
