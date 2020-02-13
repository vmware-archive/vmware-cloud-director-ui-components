#!/usr/bin/env node
const fs = require('fs');

/**
 * The translations that the Core Components library provides as defaults.
 */
const defaultTranslations = JSON.parse(fs.readFileSync(process.argv[2]).toString());
/**
 * Your translations that you would like to merge with the defaults.
 */
const providedTranslations = JSON.parse(fs.readFileSync(process.argv[3]).toString());
/**
 * The location of the output file.
 */
const outputFile = process.argv[4];
/**
 * If your provided translations are for one specific language, what that language is.
 */
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
