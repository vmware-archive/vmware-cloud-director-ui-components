#!/usr/bin/env node
const fs = require('fs');

const defaultTranslations = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const providedTranslations = JSON.parse(fs.readFileSync(process.argv[3]).toString());
const outputFile = process.argv[4];
const language = process.argv[5];
function mergeLanguage(defaultLanguageTranslations = {}, providedLanguageTranslations) {
    for (const translation in providedLanguageTranslations) {
        defaultLanguageTranslations[translation] = providedLanguageTranslations[translation];
    }
    return defaultLanguageTranslations;
}

if (language) {
    defaultTranslations[language] = mergeLanguage(defaultTranslations[language], providedTranslations);
} else {
    for (const language in providedTranslations) {
        defaultTranslations[language] = mergeLanguage(defaultTranslations[language], providedTranslations[language]);
    }
    output = defaultTranslations;
}

fs.writeFileSync(outputFile, JSON.stringify(defaultTranslations));
