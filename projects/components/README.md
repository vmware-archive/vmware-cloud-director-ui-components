# Components

A library of UI components used by VMware Cloud Director. VCD UI plugin developers can use these components to ensure
plugins share the VCD UX. This library also provides a file title i18n.json that contains all the default
translations for the strings in our components. This file is intended for usage with [@vcd/i18n](../../projects/i18n/READme.md).

## To install

`npm install @vcd/ui-components` for the latest stable release or
`npm install @vcd/ui-components@next` for the upcoming release, which could contain APIs that may not be stable

## Running unit tests

Run `npm run test:components` to execute the unit tests via [Karma](https://karma-runner.github.io). Our unit tests make use
of a WidgetObject pattern to minimize duplication of HTML access in tests.
