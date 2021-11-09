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

### Example TypeScript output

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

## Public API

1. `AppRoute` interface definition which is structure of the route tree so you can easily work with the JSON
1. CLI tool to analyze the angular source code starting from a given entry point.

## Build

Run `npm run build:route-analyzer`
Alternatively you can run:

1. `ng build route-analyzer` to build the angular library
1. `tsc -p projects/route-analyzer/tsconfig.cli.json` to build the CLI

## Testing

### To run unit tests

```bash
npm run test:route-analyzer
```

### Testing script on existing ng application

```bash
# Make the current dist available to global node_modules
cd dist/route-analyzer
npm link
# Go to ng application folder and link to @vcd/route-analyzer that was just made available globally
cd /path/to/your/project/using/route-analyzer
npm link @vcd/route-analyzer
# You must re-run this last link step after rebuilding route-analyzer
```

## Installation

npm i @vcd/route-analyzer

## Running the CLI

After the package is installed you can run:

```bash
route-analyzer -e /entry/file/path -o /path/to/folder
```

If you installed it locally, you can use `npx` to run it from your project. For additional options, pass `-h` for help.
