# VMware Cloud Director UI Common Components

- [VMware Cloud Director UI Common Components](#vmware-cloud-director-ui-common-components)
  - [Repo Structure](#repo-structure)
      - [Online Examples](#online-examples)
    - [Component Library (./projects/components) `@vcd/ui-components`](#component-library-projectscomponents-vcdui-components)
    - [Internalization Library (./projects/i18n) `@vcd/i18n`](#internalization-library-projectsi18n-vcdi18n)
    - [NG Live docs (./projects/ng-live-docs) `@vmw/ng-live-docs`.](#ng-live-docs-projectsng-live-docs-vmwng-live-docs)
    - [Route Analyzer (./projects/route-analyzer) `@vcd/route-analyzer`.](#route-analyzer-projectsroute-analyzer-vcdroute-analyzer)
  - [Peer Dependencies](#peer-dependencies)
  - [Code scaffolding](#code-scaffolding)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests (Examples App)](#running-end-to-end-tests-examples-app)
  - [Cloning the repo](#cloning-the-repo)
  - [Versioning](#versioning)
  - [Publishing](#publishing)
  - [Further help](#further-help)


## Repo Structure

This [monorepo](https://angular.io/guide/file-structure#multiple-projects) uses [NX](https://nx.dev/). You
can install nx globally but we suggest you always use `npx nx` from inside the project. That ensures you're
using our NX version.
To test, build, or run any of its projects, run `nx test|build|lint {project}` where `project` can be:

-   `components`
-   `i18n`
-   `ng-live-docs`
-   `route-analyzer`

#### Online Examples

The examples application is deployed using [GitHub Actions](.github/workflows/ci-cd.yml). Visit
[our examples site](https://vmware.github.io/vmware-cloud-director-ui-components/) for live examples with source
code that you can edit/run on stackblitz.

To serve the examples applications, run `nx serve`, making sure you have run `npm ci` after fetching latest.

### Component Library (./projects/components) `@vcd/ui-components`

Reusable components for vcd-ui and its plugin developers. See its [README](projects/components/README.md)
for further details.

### Internalization Library (./projects/i18n) `@vcd/i18n`

Translation code for vcd-ui and its plugin developers. See its [README](projects/i18n/README.md)
for further details.

### NG Live docs (./projects/ng-live-docs) `@vmw/ng-live-docs`.

Enables Angular based UI component libraries to embed editable code snippets in their application. It was created
since storybook didn't support Angular when this was created.

See https://vmware.github.io/vmware-cloud-director-ui-components/dataExporter for an example and its
[README](projects/ng-live-docs/README.md) for further details.

### Route Analyzer (./projects/route-analyzer) `@vcd/route-analyzer`.

Route Analyzer statically analyzes angular source code and generates a json file with all the available routes,
including the ones from lazy loaded modules. See its [README](projects/route-analyzer/README.md)
for further details.

## Peer Dependencies

The component library depends on [Clarity](https://clarity.design/) and [Angular](https://angular.io/)
which must be installed from your application's `package.json`. See [package.json](package.json) for version
information.

## Code scaffolding

To generate a new component, service or directive, run `nx g component|service|direct --project=components`.

## Running unit tests

Run `nx test {project}`. If you want to debug karma unit tests, you can pass `--watch=true --browsers=Chrome`. Notice
that route analyzer uses jest. [IntelliJ](https://www.jetbrains.com/help/idea/running-unit-tests-on-jest.html) and
[VS Code](https://gist.github.com/jherax/231b2dda7f9cce20e13f4590594fdb70) both have tools to debug node applications
from its IDE.

## Running end-to-end tests (Examples App)

Run `npm run e2e` to execute the end-to-end tests with Cypress

## Cloning the repo

We typically use `git clone https://github.com/vmware/vmware-cloud-director-ui-components ./vcd-ui-common` to avoid
the extremely long folder name.

## Versioning

For all official releases, versioning should be semantic as per [NPM's documentation](https://docs.npmjs.com/about-semantic-versioning).

For all development, nightly builds, the version should be created using `npm version prerelease --preid=dev`.

## Publishing

See [ci-cd.yml](.github/workflows/ci-cd.yml)

We recommend that a separate PR be created when publishing a new version of the library. To publish a new version
of `@vcd/ui-components` or `@vcd/route-analyzer` or `@vcd/i18n` or `@vmw/ng-live-docs`, you must add the following
anywhere in your commit message:

-   `[publish lib-name]` to publish an `@next` release
-   `[publish lib-name@latest]` to publish an `@latest` release

Where lib-name is one of the following:

-   `@vcd/ui-components`
-   `@vcd/route-analyzer`
-   `@vcd/i18n`
-   `@vmw/ng-live-docs`

Be sure to update the corresponding package.json files:

-   [projects/components/package.json](./projects/components/package.json)
-   [projects/i18n/package.json](./projects/i18n/package.json).
-   [projects/route-analyzer/package.json](./projects/route-analyzer/package.json).
-   [projects/ng-live-docs/package.json](./projects/ng-live-docs/package.json).

Note that `@latest` releases are only to be created when we release a version of VCD. Most releases, except for the
final release that is used by a release of VCD, should be `@next`.

Be sure to always update the [CHANGELOG](projects/components/CHANGELOG.MD) for the project you're updating.

Merging the PR will publish the mentioned packages when it's pushed to master

## Further help

To get further help, please file issues on GitHub.

To get more help on NX, use `nx --help` or go check out the
[NX for Angular instructions](https://nx.dev/recipes/adopting-nx/migration-angular).
