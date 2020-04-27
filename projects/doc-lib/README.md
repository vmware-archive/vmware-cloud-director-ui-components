# DocLib

Provides [Clarity](https://clarity.design/) based components that make it simpler to write documentation and examples in
and [Angular](https://angular.io/) showcase style application.

## Background

The components use information extracted using a built-in version of [compodoc](https://compodoc.app/) to minimize
duplication of information already in code typically associated with writing custom documentation for a library.

Though we find the generated HTML from compodoc very useful, it can be intimidating by presenting too much information.

# Features

This library is for library developers that want to write an examples application that can

-   Display source code for examples
-   Display documentation including `@Inputs` and `@Outputs` for a component
-   Allow users to run the example in [stackblitz](https://stackblitz.com/) for quicker learning.

We are using [Angular Material Docs](https://material.angular.io/components) as inspiration.

## Running unit tests

Run `npm run test:doc-lib` to execute the unit tests via [Karma](https://karma-runner.github.io). Our unit tests make use
of a WidgetObject pattern to minimize duplication of code accessing HTML in tests making the specs easier to read.

## To install

`npm install @vcd/ui-doc-lib` for the latest stable release or
`npm install @vcd/ui-doc-lib@next` for the upcoming release, which could contain APIs that may not be stable

## Using within your app

After having installed the library, you must also include Prism's CSS in your `styles.scss`, allowing you to choose
a theme to be used.
