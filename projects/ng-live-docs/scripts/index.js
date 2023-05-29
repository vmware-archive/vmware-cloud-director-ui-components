#!/usr/bin/env node
const spawn = require('cross-spawn');
const fs = require('fs');

// ARGS
const tsConfigFile = process.argv[2];
const entryPoint = process.argv[3];
const outputFile = process.argv[4];

const UTF8 = 'utf8';
const compodocTempFile = './documentation/documentation.json';

// Run compodoc in with the passed in config
const compodoc = spawn.sync('npx', ['compodoc', '-p', `${tsConfigFile}`, '-e', 'json']);
outputFromExec(compodoc, 'compodoc');
const compodocData = JSON.parse(fs.readFileSync(compodocTempFile, UTF8));

// Run create-module-data on the entry point
const moduleDataExec = spawn.sync('node', [`${__dirname}/create-module-data`, entryPoint]);
outputFromExec(moduleDataExec, 'create-modules');
const modulesData = JSON.parse(moduleDataExec.stdout.toString());

// Merge Data
const improvedModules = compodocData.modules.map((module) => ({
    ...module,
    ...modulesData[module.name],
}));

const out = {
    ...compodocData,
    modules: improvedModules,
};

// Writing to output file
try {
    fs.writeFileSync(outputFile, JSON.stringify(out, undefined, 2), { mode: 0o755, encoding: UTF8 });
} catch (err) {
    // An error occurred
    console.error(err);
}

function outputFromExec(exec, name) {
    if (exec.status) {
        console.log(`Error running ${name}: ${exec.stderr.toString()}`);
    }
}

try {
    fs.unlinkSync(compodocTempFile);
    fs.rmdirSync(compodocTempFile.slice(0, compodocTempFile.lastIndexOf('/')));
} catch (e) {
    console.log(`An error occurred while trying to delete a temporary compodoc file: ${compodocTempFile}`);
}
