const I18N_TARGET_FOLDER = 'projects/components/src/assets';
const I18N_PROPS_FOLDER = 'projects/components/src/assets/resources/';

const fs = require('fs');
const properties = require('properties');
const mkdirp = require('mkdirp');

/**
 * This task reads i18n properties files in src/public/i18n/resources and
 * writes them out as a single object in src/public/i18n/resources_output/translations.ts.
 */
const propertiesFiles = fs.readdirSync(I18N_PROPS_FOLDER);
const outputFile = 'i18n.json';
mkdirp.sync(I18N_TARGET_FOLDER);

let outputObject = {};

// Create the translations.ts file
propertiesFiles
    .filter(function(f) {
        return f.endsWith('.properties');
    })
    .forEach(function(propertiesFile) {
        const data = fs.readFileSync(I18N_PROPS_FOLDER + '/' + propertiesFile, 'utf-8');
        const inputObject = properties.parse(data);

        if (!inputObject) {
            console.error('Corrupt properties file ' + file);
            return;
        }

        const locale = propertiesFile
            .substring(0, propertiesFile.length - '.properties'.length) // remove extension
            .replace('_', '-'); // JS uses hyphens, not underscores
        outputObject[locale] = inputObject;

        console.log(`Converted ${I18N_PROPS_FOLDER}/${propertiesFile} successfully`);
    });

const outputObjectsArrayStr = JSON.stringify(outputObject).replace(/\u2028/g, '');

fs.writeFileSync(`${I18N_TARGET_FOLDER}/${outputFile}`, outputObjectsArrayStr);
