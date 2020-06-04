# Route Analyzer

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.9.

## Code scaffolding

It contains of 2 major parts

1. Angular library that basically contains AppRoute interface definition. `AppRoute[]` is the structure of the output of the CLI
1. CLI tool to analyze the angular source code starting from a given entry point.

## Build

Run `npm run build:route-analyzer`
Alternatively you can run:

1. `ng build route-analyzer` to build the angular library
1. `tsc -p projects/route-analyzer/tsconfig.cli.json` to build the CLI

## Running the CLI

`node route-analyzer/cli.js -e entry-file-path -o output file`

It also creates a link in the bin folder so alternatively after insalling the library you can do
`npx route-analyzer -e entry-file-path -o output file`
