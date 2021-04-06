# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `clear` is now a method in a widget object.

### Fixed
- Allows findWidget in the widget object to use all given findOption.
## [2.0.0-dev.7]
### Changed
- The availability property of action items now accepts observables so that their visibility can be updated from
asynchronous responses  

## [2.0.0-dev.6]
### Changed
- Quick search now performs much better with many providers.
### Fixes
- A bug where using a two-way binding on selection results in an infinite loop.
- Styles on quick search remove the header on a lot of modals.

## [2.0.0-dev.5]
### Added
- The ability to group providers in sections in quick search.
- The ability to add filters to quick search.
- Helper text below the quick search input.
- The ability to pin the quick search modal on the right side of the screen.

## [2.0.0-dev.4]

### Changed
- Formalizes @vcd/bindings as a peerDependency.

### Fixes
- Fixes a build error from importing modules from barrels.

## [2.0.0-dev.3]
### Changed
- BREAKING: Renames LocatorDriver to WidgetObjectElement and its field name to `this.el`
- BREAKING: Removed WidgetObject base protected methods to create element locators with a factory

## [2.0.0-dev.2]
### Fixes
- Makes it so the page size warning is only displayed when all are not shown.
- Fixes an error that was thrown in the sharing modal with the users groups orgs directive.

### Changed
- BREAKING: Renamed `HasHref` to `HasId`. Entities given to the Sharing Modal are now required to have an ID property instead of a HREF.

### Added
- The UsersGroupsOrgsSharingModalDirective now provides a default for `makeSearch` and `entityRenderer`.
- BREAKING: Adds @vcd/angular-client as a dependency.
- Adds a `self` method to `BaseWidgetObject`.

## [2.0.0-dev.1]
### Fixed
- Vapp Add action bug which exposed the bug with quick search showing grouped actions with empty children in the search result

## [1.0.0-dev.58]
- Upgrades to Angular 10 and Clarity 4.

## [1.0.0-dev.57]
### Added
- Add `actionsUpdate` emitter to `ActionMenuComponent`
- Add `hideWhenEmpty` flag to `QuickSearchProvider` to control section display when there is no data
- Add `mainActionMenu` property to `DatagridComponent`
- Add `SharingModalComponent` to share entities with individuals in a tabbed modal
- Add `UsersGroupsOrgsSharingModalDirective` to share entities with users, groups, and orgs
### Fixed
- BREAKING: Fixes the `//@ ts-ignore problem with the Widget Object finder`. Now, you need to supply the type of the widget object as a type parameter to any of the `findWidget` or Widget Finder calls. This is because the type is too complicated for the method to infer.
- Fixed datagrid returning new `datagridSelection` reference even if there were no real changes

## [1.0.0-dev.56]
### Changed
- BREAKING: Removed the calculateActionAvailability input which was acting as a switch to toggle the action availability
calculation by ActionMenuComponent

## [1.0.0-dev.55] - 2020-12-16
- Merged a11y branch, changes described below

### Added
- Ability to disable the responsive input directive on form controls so
  they can be used in vertical forms.
- Enabled hints for vcd-form-checkbox
- Fixed previous bad vcdResponsiveInput commits. Module was incorrectly setup and vcdResponsiveInput had
    been added as  a class name instead of an attribute (directive)
- Make input elements responsive so that labels and the input are on separate lines on small screens. Allows keyboard
   users zoomed in at 200% to view the label and input instead of it being clipped.
- Enabled ARIA support for vcd-form-input so that screen readers can read validation errors, its description and whether
  it's required

### Fixed
- Accessibility: Added blank alternative text to all svgs inside clr-icon elements
- Label text is not wrapped in `vcd-select-form`
- Labels is not associated with the 'Access Level' combo box.
- Fixed the text wrap inside signposts for all form components
- Fixed number-with-unit asterisk was not showing when the input was required
- `vcd-number-with-unit` alignment issues with the unit dropdown
- Make `vcd-number-with-unit` select a default unit when the initial value is null
- Values were not being written at times on `vcd-number-with-unit`. Make sure `writeValue` does not fully run before
  `ngOnInit` to make sure `@Input` parameters have been set
- Underlying page scrolling when navigating the action menu using arrow keys.
- Space/Enter keys not closing the action menu after a action menu item is activated.
- Esc key not closing the action menu it is pressed on.
- Not being able to navigate using arrow keys on action menu with separators
- Display error messages for invalid input on form controls accepting numbers.
- For vcd-form-with-unit component, Focus is set on input element when unlimited is unchecked
- internal: Changed implementation of responsive form inputs to use a directive so that grid classes to be used
   on form input can be changed from a single place.
- Associate label with `<select>` input in vcd-form-select

### Changed
- Make the signpost trigger on the form-checkbox consistent with the other form components
- Update `ResponsiveInputDirective` to add Clarity grid classes based on the host element's width.

## [1.0.0-dev.57]
### Added
- A convenience method called `updateDisplayedActions` to action menu to re-trigger the calculation of visible actions

## [1.0.0-dev.54]
### Changed
- QuickSearchProvider now takes a boolean argument in its constructor to debounce calling the search functionality
by 300 milliseconds

## [1.0.0-dev.53] - 2020-12-16
### Fixed
- Allows boolean to be set to disable an action item

## [1.0.0-dev.52] - 2020-12-16
### Fixed
- Fix Quick Search 'Content Projection' live examples opening on Stackblitz
### Changed
1. Enabled `TestElement` to query children elements by css selector
### Removed
1. Removed functions in `ClrDatagridWidget` that are specific to VcdDatagrid

## [1.0.0-dev.51] - 2020-12-4
### Added
1. INTERNAL: Update `ng-live-docs` to 0.0.8 to enable `@vmw/ng-live-docs:add-example` schematic.
### Changed
1. BREAKING: Rewrote `VcdDatagridWidget` and `ClrDatagridWidget` with new Widget Object.
2. Added convenience methods to the `TestElement`.
3. INTERNAL: Rewrote `datagrid.component` unit tests using new widget object.
4. INTERNAL: Rewrote helper method about creating datagrid filter unit test with new Widget Object.
### Removed
1. BREAKING: Removed `WithGridBoldRenderer`. The functionality of `WithGridBoldRenderer` has been implemented in `ClrDatagridWidget`.
### Deprecated
1. Marked `WidgetFinder` as deprecated.

## [1.0.0-dev.50] - 2020-12-2
### Fixed
- Underlying page scrolling when navigating the action menu using arrow keys.
- Space/Enter keys not closing the action menu after a action menu item is activated.
- Esc key not closing the action menu it is pressed on.
- Not being able to navigate using arrow keys on action menu with separators

## [1.0.0-dev.49] - 2020-11-10
1. BREAKING: Fixes an error in the type clash with Jasmine and Chai in the Widget Object
2. Fix arrow navigation of disabled menu items.
3. INTERNAL: Replace DropdownItem with ActionMenuItem


## [1.0.0-dev.48] - 2020-10-30
1. BREAKING: Removes the old WidgetObject
2. BREAKING: Reworks the interface of the new WidgetObject to use a system of locators
        Documentation can be found at the [pull request](https://github.com/vmware/vmware-cloud-director-ui-components/pull/227)
3. BREAKING: Removed the deprecated `ButtonConfig` interface. This has been replaced by the `ActionItem` interface.
3. Remove spaces surrounding the label in FormInputComponent and FormSelectComponent
4. Add ARIA role to the ErrorBannerComponent
5. Prevent sub-menus that are opened on hover from closing when clicked
6. Add custom focus handling logic for dropdown menu
