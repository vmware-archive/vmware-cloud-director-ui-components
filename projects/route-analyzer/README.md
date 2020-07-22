# Route Analyzer

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.9.

## Code scaffolding

The project consists of 2 major parts

1. Angular library that basically contains AppRoute interface definition. `AppRoute[]` is the structure of the output of the CLI
1. CLI tool to analyze the angular source code starting from a given entry point.

## Build

Run `npm run build:route-analyzer`
Alternatively you can run:

1. `ng build route-analyzer` to build the angular library
1. `tsc -p projects/route-analyzer/tsconfig.cli.json` to build the CLI

## Installation

npm i @vcd/route-analyzer

## Running the CLI

After the package is installed you can run:

1. for local installation:
   `npx route-analyzer -e entry-file-path -o output file`
1. for global installation:
   `route-analyzer -e entry-file-path -o output file`

If you do not want to install it but rather run it after downloading the source code then
you have to install the dependencies in the monorepo first.
Then you have the following 2 options:

1. Install ts-node and run from the source code directly:
   `ts-node -O '{"module":"commonjs"}' projects/route-analyzer/src/cli.ts -e entry-file-path -o output file`

2. Or build the project
   `npm run build:route-analyzer`
   and then run it from the dist folder
   `node dist/route-analyzer/cli.js -e entry-file-path -o output file`
