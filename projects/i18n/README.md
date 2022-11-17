# I18n

The library of translation utilities provided to internationalize VMware Cloud Director. VCD UI plugin developers can
install this library to translate their app and have a reduced bundle size.

## To install

`npm install @vcd/i18n` for the latest stable release or
`npm install @vcd/i18n@next` for the upcoming release, which could contain APIs that may not be stable

## Usage

In your App Module, import the `I18nModule.forRoot` or `I18nModule.forChild`. Use `forRoot` if you want to use a translation
service singleton that does not change depending on route loaded, but use `forChild` if you want a translation service that is
only loaded for the current non-lazy route.

I.E.:

```
imports: [
    ...
    I18nModule.forRoot(),
    ...
]
```

Then, in the constructor of your App Module, inject the `TranslationService` and call `registerTranslations`. If you wish
to load translations as imported Typescript files, pass the relevant `TranslationSet`. If you wish to load via HTTP, pass no arguments.

Example:

```
constructor(translationService: TranslationService) {
    translationService.registerTranslations(TRANSLATIONS);
}
```

With the setup done, in any component files, you can now inject the `TranslationService` and use it to translate keys, or you
can use the `TranslationPipe` in any HTML files to translate strings:

```
<span class="title">{{ 'app.title' | translate }}</span>
```

## Build

Run `nx build i18n` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `nx test i18n` to execute the unit tests via [Karma](https://karma-runner.github.io).
