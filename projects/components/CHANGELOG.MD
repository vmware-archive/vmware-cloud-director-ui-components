# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
 - Make input elements responsive so that labels and the input are on separate lines on small screens. Alllows keyboard
   users zoomed in at 200% to view the label and input instead of it being clipped.
 - internal: Changed implementation of responsive form inputs to use a directive so that grid classes to be used
   on form input can be changed from a single place.

## [1.0.0-a11y.2] - 2020-10-28

### Added

- Enabled ARIA support for vcd-form-input so that screen readers can read validation errors, its description and whether
  it's required


