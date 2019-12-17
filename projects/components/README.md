# Components

A library of UI components used by VMware Cloud Director. VCD UI plugin developers can use these components to ensure
plugins share the VCD UX.

## To install

`npm install @vmw/vcd-ui-doc-lib` for the latest stable release or
`npm install @vmw/vcd-ui-doc-lib@next` for the upcoming release, which could contain APIs that may not be stable

## Running unit tests

Run `ng test components` to execute the unit tests via [Karma](https://karma-runner.github.io). Our unit tests make use
of a WidgetObject pattern to minimize duplication of HTML access in tests.
