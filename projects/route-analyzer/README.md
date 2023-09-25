# Route Analyzer

Analyzes an angular project and builds a list of all routes, including dynamic routes. Two files are generated:

## Routes JSON

JSON containing a tree structure for all routes defined in your application.

### Example output of app-routes.json

Note that `data` is included in the output since it's often used to contain
information that is used to determine access to a route or to update `document.title`

Also note that a `tagName` property will be output within the data attribute. This is useful
for automated tests that would like to be sure all routes in an application at least
load the expected component.

```JSON
[
  {
    "path": "plugins",
    "component": "PluginContainerComponent",
    "children": []
  },
  {
    "path": "monitor",
    "children": [
      {
        "path": "",
        "redirectTo": "tasks"
      },
      {
        "path": "tasks",
        "component": "AllTasksComponent",
        "data": {
          "title": "nav.tasks",
          "tagName": "vcd-all-tasks",
          "actions": [
            {
              "xml": {
                "response": {
                  "dtoType": "TaskType",
                  "queryResultDtoType": "QueryResultTaskRecordsType"
                }
              },
              "queryType": "task"
            }
          ]
        }
      },
      {
        "path": "events",
        "component": "AllEventsComponent",
        "data": {
          "title": "nav.events",
          "tagName": "vcd-all-events",
          "actions": [
            {
              "queryType": "AuditTrailEvents"
            }
          ]
        }
      },
```

### Example Usage:

-   Allow the user to search for pages without having to click through menus

## Routes Typescript

A flat list of objects containing a route builder function and the
HTML tagName associated with the component that will be rendered by that
route. Objects are exported as separate objects like the example below

### Example output

```typescript
export const administration_accessControl_users_userId_general = {
    route(userId: string) {
        return `/administration/access-control/users/${userId}/general`;
    },
    tagName: 'vcd-user-general-details',
};

export const administration_identityProviders_oidcSettings = {
    route() {
        return `/administration/identity-providers/oidcSettings`;
    },
    tagName: 'vcd-oidc',
};
```

### Example usage

-   Calling `router.navigateByUrl(users_userId.route(someId))` within your application
-   E2e testing going directly to deep URLs instead of clicking a menu hierarchy
-   Smoke e2e tests by automating navigation to all pages in application.

```typescript
// Note that importing `*` may cause tree shakers not to be able to tree shake content
// Only use `import *` when you need to iterate over all routes
import * as allRoutes from './path/to/app-routes.ts';

// Visit route functions that don't take parameters
const topLevelRoutes = Object.values(allRoutes).filter((e) => e.route.length === 0);
for (const entry of topLevelRoutes) {
    cy.visit(entry.route());
    cy.get(entry.tagName).should('exist');
}
```

### Benefits

-   Compilation errors if routes change
-   No hard coding or joining path segments from application.

## Segments Typescript

A list of strings representing each segment found in the application. Each
string is prepended with `segment_`.

### Example output

If we use `/administration/access-control/users/:userId/general` as an example route, the following
variables will be generated

```typescript
export const segment_administration = 'administration';
export const segment_accessControl = 'access-control';
export const segment_users = 'users';
export const segment_userId = ':userId';
export const segment_general = 'general';
```

### Example usage

#### Do not use variables in your route definitions

Your route definitions are the source of truth, just define them using regular strings.
It will be easier to read your routes.

```typescript
const routes = [
    {
        path: CLOUD_RESOURCES.ORGANIZATIONS,
        component: OrganizationsListTenantComponent,
    },
    {
        path: `${CLOUD_RESOURCES.ORGANIZATIONS}/:${CLOUD_RESOURCES.ORGANIZATION_ID}`,
        loadChildren: () => import('@my/org-details.module').then((m) => m.OrgDetailsModule),
    },
];
```

Becomes

```typescript
const routes = [
    {
        path: 'organizations',
        component: OrgListComponent,
    },
    {
        path: 'organizations/:orgId',
        loadChildren: () => import('@my/org-details.module').then((m) => m.OrgDetailsModule),
    },
];
```

And you use it from places where you need relative links or when reading router attributes

```typescript
constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
        let date = params[segment_orgId];
    });
}
```

```typescript
router.navigate(`../${segments_general}`);
```

### Benefits

-   Partial string value checking through compilation if segments change
    -   Not fail-proof since the segments aren't scoped to whole routes. That
        means you won't get an error if the same segment still exists somewhere else in your route definitions
-   Leave your route definitions easier to read if you had been previously using manually
    maintained constants for your route.
    -   At the expense of being forced to duplicate strings in route definitions

## Public API

1. `AppRoute` interface definition which is structure of the route tree so you can easily work with the JSON
1. CLI tool to analyze the angular source code starting from a given entry point.

## Build

Run `npm run build:route-analyzer`

### Testing script on existing ng application

When making changes to this library, you will want to run it on a host application to test your changes. We avoid using
the `npm link` approach because it runs slightly differently from when using links because of [node module resolution and
symlinks](https://nodejs.org/api/cli.html#--preserve-symlinks) that are created. That is, it may work in development
because it was using a different version of a dependency, the one in vcd-ui-common, instead of the one in the target
application.

Instead, we prefer to use a local file npm install. It may take a few more seconds after every change, but it behaves
more closely to an actual installation from npm.

There are two steps required:

#### Link Application to vcd-ui-common's dist folder

Modify your application's package.json to use the file protocol to point to the dist folder

```json
"devDependencies": [{
        "@vcd/route-analyzer": "file:/path/to/my/vcduicommon/dist/route-analyzer"
}]
```

#### Install in test application

```bash
cd /path/to/your/project/using/route-analyzer
npm i @vcd/route-analyzer
# You must re-run this after building route-analyzer
```

## Unit Testing

### To run unit tests

```bash
npm run test:route-analyzer
```

## Installation

```bash
npm i @vcd/route-analyzer
```

## Running the CLI

After the package is installed you can run:

```bash
route-analyzer -e /entry/file/path -o /path/to/folder
```

If you installed it locally, you can use `npx` to run it from your project. For additional options, pass `-h` for help.
