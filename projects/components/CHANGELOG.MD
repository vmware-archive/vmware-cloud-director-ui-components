# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-dev.48] - 2020-10-30
1. BREAKING: Removes the old WidgetObject
2. BREAKING: Reworks the interface of the new WidgetObject to use a system of locators
        Documentation can be found at the [pull request](https://github.com/vmware/vmware-cloud-director-ui-components/pull/227)
3. BREAKING: Removed the deprecated `ButtonConfig` interface. This has been replaced by the `ActionItem` interface.
3. Remove spaces surrounding the label in FormInputComponent and FormSelectComponent
4. Add ARIA role to the ErrorBannerComponent
5. Prevent sub-menus that are opened on hover from closing when clicked
6. Add custom focus handling logic for dropdown menu

### Added


