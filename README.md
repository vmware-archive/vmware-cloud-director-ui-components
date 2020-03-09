# VMware Cloud Director UI Common Components

## Repo Structure

This [monorepo](https://angular.io/guide/file-structure#multiple-projects) contains three separate but related projects:

### Component Library (./projects/components) `@vcd/ui-components`

Reusable components for vcd-ui and its plugin developers. See its [README](projects/components/README.md)
for further details

### Documentation Library (./projects/doc-lib) `@vmw/vcd-ui-doc`

Reusable components that allow showcasing a component by displaying

-   Runnable examples
-   Source Code
-   API / Description
-   Live / editable examples

See [README](projects/components/README.md)
for further details

### Examples App (./projects/examples)

The application that showcases `@vcd/ui-components` using `@vcd/ui-doc-lib`.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if
you change any of the source files. This is where you'll see changes made in [components](./projects/components) and
[doc-lib](./projects/doc-lib)

## Peer Dependencies

The component and doc-lib libraries depend on [Clarity](https://clarity.design/) and [Angular](https://angular.io/)
which must must be installed from your application's `package.json`. See [package.json](package.json) for version
information.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build components` or `ng build doc-lib`. The build artifacts will be stored in the `dist/` directory. Use the
`--prod` flag for a production build.

## Running unit tests

Run `ng test components` or `ng test doc-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests (Examples App)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Cloning the repo

We typically use `git clone https://github.com/vmware/vmware-cloud-director-ui-components ./vcd-ui-common` to avoid
the extremely long folder name.

## Publishing

Publishing happens through the CI/CD pipeline. See [package.json](.github/workflows/ci-cd.yml)

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20. We attempt to
keep the project following CLI guidelines so we can benefit from ng update.

## Further help

To get further help, please file issues on github.

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
