# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### [Fixed]
- Fixed bug that broke the route-analyzer when two routing modules had the same base name

## [0.0.6]
### [Added]
- route objects now contain regex property to allow you to test existing URLs

## [0.0.5]
- Fixed version 0.0.4 which was using the wrong version of yargs causing errors when you
  run the script.
- No new features

## [0.0.4] BROKEN - DO NOT USE

### Added
 - Generate route objects that provide type safety to build URLs and access to the HTML tag name
   of the component being rendered for that route

### Changed
  - BREAKING: (-o  --outputFile) option has been renamed/repurposed. It is now (-o --outputDirectory)
    since we output two files.


