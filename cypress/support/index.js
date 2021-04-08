// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Load system JS registery
import System from 'systemjs/dist/system';
// Provides the @vcd/common module so loading the VcdApiClient does not throw an error.
window.SystemJs = System.registry.set('@vcd/common', System.newModule({})); // >= 9.5
// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
