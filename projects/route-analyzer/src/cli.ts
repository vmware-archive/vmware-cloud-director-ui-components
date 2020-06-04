#!/usr/bin/env node

/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
const ts = require('typescript');
const fs = require('fs');

const yargs = require('yargs');
const argv = yargs
    .option('entryFile', {
        alias: 'e',
        description: 'Entry file of your angular application',
        type: 'string',
    })
    .option('outputFile', {
        alias: 'o',
        description: 'Entry file of your angular application',
        type: 'string',
    })
    .help()
    .demandOption(['e', 'o'])
    .alias('help', 'h').argv;

import * as routeAnalyzer from './lib/route-analyzer';
const getRoutesByEntryPoint = routeAnalyzer.getRoutesByEntryPoint;

const UTF8 = 'utf8';

const appRoutes = getRoutesByEntryPoint([argv.entryFile], {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
});

try {
    fs.writeFileSync(argv.outputFile, JSON.stringify(appRoutes, undefined, 2), { mode: 0o755, encoding: UTF8 });
} catch (err) {
    console.error(err);
}
