# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-a11y.4] - 2020-11-18
### Fixed
- For vcd-form-with-unit component, Focus is set on input element when unlimited is unchecked
- internal: Changed implementation of responsive form inputs to use a directive so that grid classes to be used
   on form input can be changed from a single place.

## [1.0.0-a11y.3] - 2020-11-13
### Added
- Make input elements responsive so that labels and the input are on separate lines on small screens. Alllows keyboard
   users zoomed in at 200% to view the label and input instead of it being clipped.

### Fixed
- Associate label with <select> input in vcd-form-select

## [1.0.0-a11y.2] - 2020-10-28

### Added

- Enabled ARIA support for vcd-form-input so that screen readers can read validation errors, its description and whether
  it's required


