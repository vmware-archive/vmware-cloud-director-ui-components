# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Accessibility: Added blank alternative text to all svgs inside clr-icon elements
- Label text is not wrapped in `vcd-select-form`
- Labels is not associated with the 'Access Level' combo box.

## [1.0.0-a11y.7] - 2020-12-8
### Fixed
- `vcd-number-with-unit` alignment issues with the unit dropdown
- Make `vcd-number-with-unit` select a default unit when the initial value is null

### Changed
- Update `ResponsiveInputDirective` to add Clarity grid classes based on the host element's width.

## [1.0.0-a11y.7] - 2020-12-2
### Fixed
- Values were not being written at times on `vcd-number-with-unit`. Make sure `writeValue` does not fully run before
  `ngOnInit` to make sure `@Input` parameters have been set

## [1.0.0-a11y.6] - 2020-12-2
### Fixed
- Underlying page scrolling when navigating the action menu using arrow keys.
- Space/Enter keys not closing the action menu after a action menu item is activated.
- Esc key not closing the action menu it is pressed on.
- Not being able to navigate using arrow keys on action menu with separators

## [1.0.0-a11y.5] - 2020-12-2

### Fixed
- Display error messages for invalid input on form controls accepting numbers.

### Added
- Enabled hints for vcd-form-checkbox
- Fixed previous bad vcdResponsiveInput commits. Module was incorrectly setup and vcdResponsiveInput had
  been added as  a class name instead of an attribute (directive)

## [1.0.0-a11y.4] - 2020-11-18
### Fixed
- For vcd-form-with-unit component, Focus is set on input element when unlimited is unchecked
- internal: Changed implementation of responsive form inputs to use a directive so that grid classes to be used
   on form input can be changed from a single place.

## [1.0.0-a11y.3] - 2020-11-13
### Added
- Make input elements responsive so that labels and the input are on separate lines on small screens. Allows keyboard
   users zoomed in at 200% to view the label and input instead of it being clipped.

### Fixed
- Associate label with <select> input in vcd-form-select

## [1.0.0-a11y.2] - 2020-10-28

### Added

- Enabled ARIA support for vcd-form-input so that screen readers can read validation errors, its description and whether
  it's required


