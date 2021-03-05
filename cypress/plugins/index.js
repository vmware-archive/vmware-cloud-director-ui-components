/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const path = require('path');
const fs = require('fs');

const downloadDirectory = path.join(__dirname, '..', 'downloads');

const findFile = (filename) => {
    const fileName = `${downloadDirectory}/${filename}`;
    return fs.existsSync(fileName);
};

const hasFile = (filename, ms) => {
    const delay = 10;
    return new Promise((resolve, reject) => {
        if (ms < 0) {
            return reject(new Error(`Could not find file ${downloadDirectory}/${filename}`));
        }
        const found = findFile(filename);

        if (found) {
            try {
                var data = fs.readFileSync(`${downloadDirectory}/${filename}`, 'utf8');
                return resolve(data);
            } catch (e) {
                return reject(new Error(`Could not read file ${downloadDirectory}/${filename}`));
            }
        }
        setTimeout(() => {
            hasFile(filename, ms - delay).then(resolve, reject);
        }, 10);
    });
};

module.exports = (on, config) => {
    on('before:browser:launch', (browser, options) => {
        if (browser.family === 'chromium') {
            options.preferences.default['download'] = {
                default_directory: downloadDirectory,
            };
            return options;
        }
        if (browser.family === 'firefox') {
            options.preferences['browser.download.dir'] = downloadDirectory;
            options.preferences['browser.download.folderList'] = 2;
            options.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv';
            return options;
        }
    });

    on('task', {
        fileIsDownloaded(filename, ms = 4000) {
            return hasFile(filename, ms);
        },
    });

    return config;
};
