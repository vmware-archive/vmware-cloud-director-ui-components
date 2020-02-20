var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
        /***/ "../../dist/components/fesm2015/vcd-ui-components.js": 
        /*!*******************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/dist/components/fesm2015/vcd-ui-components.js ***!
          \*******************************************************************************************************************/
        /*! exports provided: BoldTextRendererComponent, CliptextComponent, CliptextModule, ComponentsModule, DataExporterComponent, DataExporterModule, DatagridComponent, DatagridModule, GridColumnHideable, GridColumnSortDirection, GridSelectionType, Position, RendererSpec, ɵa, ɵb, ɵc, ɵd, ɵe, ɵf */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoldTextRendererComponent", function () { return BoldTextRendererComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextComponent", function () { return CliptextComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextModule", function () { return CliptextModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function () { return ComponentsModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterComponent", function () { return DataExporterComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterModule", function () { return DataExporterModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridComponent", function () { return DatagridComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridModule", function () { return DatagridModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridColumnHideable", function () { return GridColumnHideable; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridColumnSortDirection", function () { return GridColumnSortDirection; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridSelectionType", function () { return GridSelectionType; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function () { return Position; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererSpec", function () { return RendererSpec; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function () { return CsvExporterService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function () { return PipesModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function () { return NestedPropertyPipe; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function () { return ComponentRendererOutletDirective; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function () { return BoldTextRendererComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function () { return FunctionRendererPipe; });
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/i18n */ "../../dist/i18n/fesm2015/vcd-i18n.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm2015/animations.js");
            /**
             * @fileoverview added by tsickle
             * Generated from: data-exporter/csv-exporter.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Encodes a data set to be downloaded as a CSV
             */
            var CsvExporterService = /** @class */ (function () {
                function CsvExporterService() {
                }
                /**
                 * Creates a string that can be used to create a Blob for a CSV
                 * @param {?} rows 2D array of data. First row is the names for the fields
                 * @return {?}
                 */
                CsvExporterService.prototype.createCsv = function (rows) {
                    return rows.map(( /**
                     * @param {?} row
                     * @return {?}
                     */function (/**
                     * @param {?} row
                     * @return {?}
                     */ row) { return processRow(row); })).join('\n');
                };
                /**
                 * Does a client side download
                 * @param {?} csvFile The string contents of a CSV file to be downloaded
                 * @param {?} filename The name of the file to be downloaded
                 * @return {?}
                 */
                CsvExporterService.prototype.downloadCsvFile = function (csvFile, filename) {
                    /** @type {?} */
                    var mimeType = 'text/csv;charset=utf-8;';
                    /** @type {?} */
                    var blob = new Blob([csvFile], { type: mimeType });
                    // Jan 1, 2020 - Chrome and IE support this
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(blob, filename);
                    }
                    else {
                        /** @type {?} */
                        var link = document.createElement('a');
                        /** @type {?} */
                        var url = URL.createObjectURL(blob);
                        link.setAttribute('href', url);
                        link.setAttribute('download', filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                };
                return CsvExporterService;
            }());
            CsvExporterService.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                            providedIn: 'root',
                        },] }
            ];
            /** @nocollapse */ CsvExporterService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function CsvExporterService_Factory() { return new CsvExporterService(); }, token: CsvExporterService, providedIn: "root" });
            /**
             * Returns a string
             * @param {?} row A list of cells to be turned into a CSV string, separated by commas
             * @return {?}
             */
            function processRow(row) {
                return row.map(( /**
                 * @param {?} cell
                 * @return {?}
                 */function (/**
                 * @param {?} cell
                 * @return {?}
                 */ cell) { return encodeValue(cell); })).join(',');
            }
            /**
             * Returns a cell's cellValue encoded against spaces, quotes, and CSV injection character
             * @param {?} cellValue Cell cellValue to be encoded
             * @return {?}
             */
            function encodeValue(cellValue) {
                /** @type {?} */
                var innerValue = cellValue == null ? '' : cellValue.toString();
                if (cellValue instanceof Date) {
                    innerValue = cellValue.toLocaleString();
                }
                // Double quotes are doubled
                /** @type {?} */
                var result = innerValue.replace(/"/g, '""');
                // TODO: See https://jira.eng.vmware.com/browse/VDUCC-59
                // result = escapeAgainstCsvInjection(result);
                // Add quotes around the whole thing if it contains new lines
                if (result.search(/[",\n]/g) >= 0) {
                    result = "\"" + result + "\"";
                }
                // Escape against
                return result;
            }
            /**
             * @fileoverview added by tsickle
             * Generated from: data-exporter/data-exporter.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * A dialog to export data
             *
             *  - Allows the UI to select columns to be exported
             *  - Provides a progress indicator
             *  - Converts the data that is fetched by the caller into a CSV
             */
            var DataExporterComponent = /** @class */ (function () {
                /**
                 * @param {?} csvExporterService
                 */
                function DataExporterComponent(csvExporterService) {
                    this.csvExporterService = csvExporterService;
                    /**
                     * List of columns that can be exported, user may deselect some before sending the download request
                     */
                    this.columns = [];
                    /**
                     * The name of the file to be downloaded
                     */
                    this.fileName = 'data-export.csv';
                    /**
                     * Whether a box to select/deselect all rows is available
                     */
                    this.showSelectAll = true;
                    this._open = false;
                    /**
                     * Fires when {\@link _open} changes. Its parameter indicates the new state.
                     */
                    this.openChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                    /**
                     * Called when the export is ready to be created
                     */
                    this.dataExportRequest = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                    this._isRequestPending = false;
                    this._progress = 0;
                }
                Object.defineProperty(DataExporterComponent.prototype, "open", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._open;
                    },
                    /**
                     * Whether the dialog is open
                     * @param {?} value
                     * @return {?}
                     */
                    set: function (value) {
                        this._open = value;
                        this.openChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "isRequestPending", {
                    /**
                     * True between the time {\@link dataExportRequest} fires and {\@link DataExportRequestEvent.exportData} is called
                     * or an error is thrown
                     * @return {?}
                     */
                    get: function () {
                        return this._isRequestPending;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "progress", {
                    /**
                     * Number between 0-1, used for displaying the progress bar.
                     * @return {?}
                     */
                    get: function () {
                        return this._progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @return {?}
                 */
                DataExporterComponent.prototype.onClickExport = function () {
                    var _this = this;
                    this._isRequestPending = true;
                    this.dataExportRequest.emit({
                        exportData: this.exportData.bind(this),
                        updateProgress: this.updateProgress.bind(this),
                        selectedColumns: this.columns.filter(( /**
                         * @param {?} col
                         * @return {?}
                         */function (/**
                         * @param {?} col
                         * @return {?}
                         */ col) { return _this.formGroup.controls[col.fieldName].value; })),
                    });
                };
                /**
                 * @return {?}
                 */
                DataExporterComponent.prototype.onClickCheckAll = function () {
                    for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                        var column = _a[_i];
                        this.formGroup.controls[column.fieldName].setValue(true);
                    }
                };
                Object.defineProperty(DataExporterComponent.prototype, "isSelectAllEnabled", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            if (!this.formGroup.controls[column.fieldName].value) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "isExportEnabled", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        if (this.isRequestPending) {
                            return false;
                        }
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            if (this.formGroup.controls[column.fieldName].value) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @return {?}
                 */
                DataExporterComponent.prototype.ngOnInit = function () {
                    /** @type {?} */
                    var controls = this.columns.reduce(( /**
                     * @param {?} previousValue
                     * @param {?} currentValue
                     * @return {?}
                     */function (previousValue, currentValue) {
                        previousValue[currentValue.fieldName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](true);
                        return previousValue;
                    }), {});
                    this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](controls);
                };
                /**
                 * @private
                 * @param {?} records
                 * @return {?}
                 */
                DataExporterComponent.prototype.exportData = function (records) {
                    var _this = this;
                    if (!this.open) {
                        return;
                    }
                    this.open = false;
                    this._isRequestPending = false;
                    /** @type {?} */
                    var rows = [
                        // First row is the display names
                        Object.keys(records[0]).map(( /**
                         * @param {?} fieldName
                         * @return {?}
                         */function (/**
                         * @param {?} fieldName
                         * @return {?}
                         */ fieldName) { return _this.getDisplayNameForField(fieldName); }))
                    ].concat(records.map(( /**
                     * @param {?} rec
                     * @return {?}
                     */function (/**
                     * @param {?} rec
                     * @return {?}
                     */ rec) { return Object.keys(rec).map(( /**
                     * @param {?} key
                     * @return {?}
                     */function (/**
                     * @param {?} key
                     * @return {?}
                     */ key) { return rec[key]; })); })));
                    /** @type {?} */
                    var csvFile = this.csvExporterService.createCsv(rows);
                    this.csvExporterService.downloadCsvFile(csvFile, this.fileName);
                };
                /**
                 * @private
                 * @param {?} progress
                 * @return {?}
                 */
                DataExporterComponent.prototype.updateProgress = function (progress) {
                    this._progress = progress;
                };
                /**
                 * @private
                 * @param {?} fieldName
                 * @return {?}
                 */
                DataExporterComponent.prototype.getDisplayNameForField = function (fieldName) {
                    for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                        var column = _a[_i];
                        if (column.fieldName === fieldName) {
                            return column.displayName;
                        }
                    }
                    return fieldName;
                };
                return DataExporterComponent;
            }());
            DataExporterComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-data-exporter',
                            template: "<clr-modal [clrModalOpen]=\"open\" (clrModalOpenChange)=\"openChange.emit($event)\" [clrModalSize]=\"'sm'\" #modal>\n    <h3 class=\"modal-title\">{{ dialogHeader || ('data-exporter.title' | translate) }}</h3>\n    <div class=\"modal-body\">\n        <button\n            *ngIf=\"showSelectAll\"\n            class=\"btn btn-sm btn-link select-all\"\n            type=\"button\"\n            (click)=\"onClickCheckAll()\"\n            [disabled]=\"!isSelectAllEnabled\"\n        >\n            {{ selectAllText || ('select.all' | translate) }}\n        </button>\n        <ul class=\"list-unstyled column-selection\" [formGroup]=\"formGroup\">\n            <li *ngFor=\"let col of columns\">\n                <clr-checkbox-wrapper>\n                    <input type=\"checkbox\" clrCheckbox [formControlName]=\"col.fieldName\" />\n                    <label>{{ col.displayName }}</label>\n                </clr-checkbox-wrapper>\n            </li>\n        </ul>\n        <div class=\"progress\" [ngClass]=\"{ loop: progress == -1, pending: isRequestPending }\">\n            <progress max=\"100\" value=\"{{ progress * 100 }}\"></progress>\n        </div>\n    </div>\n    <hr />\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-outline cancel\" (click)=\"open = false\">\n            {{ cancelText || ('cancel' | translate) }}\n        </button>\n        <button type=\"button\" class=\"btn btn-primary export\" [disabled]=\"!isExportEnabled\" (click)=\"onClickExport()\">\n            {{ exportText || ('export' | translate) }}\n        </button>\n    </div>\n</clr-modal>\n",
                            styles: ["div.progress{visibility:hidden}div.progress.pending{visibility:visible}button.select-all{margin:0;padding:0}"]
                        }] }
            ];
            /** @nocollapse */
            DataExporterComponent.ctorParameters = function () { return [
                { type: CsvExporterService }
            ]; };
            DataExporterComponent.propDecorators = {
                columns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                fileName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                dialogHeader: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                cancelText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                selectAllText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                exportText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                showSelectAll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                open: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                openChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
                dataExportRequest: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: data-exporter/data-exporter.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var DataExporterModule = /** @class */ (function () {
                function DataExporterModule() {
                }
                return DataExporterModule;
            }());
            DataExporterModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            declarations: [DataExporterComponent],
                            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"], _vcd_i18n__WEBPACK_IMPORTED_MODULE_2__["I18nModule"]],
                            exports: [DataExporterComponent],
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/interfaces/datagrid-column.interface.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /** @enum {string} */
            var GridColumnHideable = {
                /**
                 * Does not show up in column toggle box
                 */
                Never: "NEVER",
                /**
                 * Shows up in column toggle box, column is visible
                 */
                Shown: "SHOWN",
                /**
                 * Shows up in column toggle box, column is hidden
                 */
                Hidden: "HIDDEN",
            };
            /** @enum {string} */
            var GridColumnSortDirection = {
                Asc: "ASCENDING",
                Desc: "DESCENDING",
                None: "NONE",
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/datagrid.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @enum {string} */
            var GridSelectionType = {
                /**
                 * For selecting multiple rows
                 */
                Multi: "MULTI",
                /**
                 * For selecting only one row at a time
                 */
                Single: "SINGLE",
                /**
                 * Disables the selection
                 */
                None: "NONE",
            };
            /**
             * Component used for saving the time required for developing a data grid. It takes different properties required for
             * rendering as Inputs and Outputs.
             *
             * Example usage in a component:
             * In the component view, different properties required for the grid are wired as Inputs and Outputs.
             * <vcd-datagrid
             *    (onGridRefresh)="fetchData()"
             *    [columns]="columns"
             *    [gridData]="gridData">
             *  </vcd-datagrid>
             *
             * @template R
             */
            var DatagridComponent = /** @class */ (function () {
                function DatagridComponent() {
                    this.GridColumnHideable = GridColumnHideable;
                    this._selectionType = GridSelectionType.None;
                    /**
                     * The CSS class to use for the Clarity datagrid.
                     */
                    this.clrDatagridCssClass = '';
                    /**
                     * The text placed next to the pagination number dropdown.
                     */
                    this.paginationDropdownText = '';
                    /**
                     * The pagination information that the user should supply.
                     */
                    this.pagination = {
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50, 100],
                    };
                    /**
                     * Loading indicator on the grid
                     */
                    this.isLoading = false;
                    /**
                     * The value of the single selection.
                     */
                    this.singleSelected = undefined;
                    /**
                     * The value of the multi selection.
                     */
                    this.multiSelection = [];
                    /**
                     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change
                     * {\@link #GridState} is the type of value emitted
                     */
                    this.gridRefresh = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
                    /**
                     * Returns an identifier for the given record at the given index.
                     *
                     * If the record has a href, defaults to that. Else, defaults to index.
                     */
                    this.trackBy = ( /**
                     * @param {?} index
                     * @param {?} record
                     * @return {?}
                     */function (index, record) {
                        return record && (record.href || index);
                        // tslint:disable-next-line: semicolon
                    });
                }
                Object.defineProperty(DatagridComponent.prototype, "columns", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._columns;
                    },
                    /**
                     * Sets the configuration of columns on the grid and updates the {\@link columnsConfig} array
                     * @param {?} cols
                     * @return {?}
                     */
                    set: function (cols) {
                        this._columns = cols;
                        this.getColumnsConfig();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DatagridComponent.prototype, "gridData", {
                    /**
                     * Set from the caller component using this grid. The input is set upon fetching data by the caller
                     * @param {?} result
                     * @return {?}
                     */
                    set: function (result) {
                        this.isLoading = false;
                        this.items = result.items;
                        this.totalItems = result.totalItems;
                        this.updateSelectedItems();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DatagridComponent.prototype, "selectionType", {
                    /**
                     * Type of row selection on the grid
                     * @param {?} selectionType
                     * @return {?}
                     */
                    set: function (selectionType) {
                        this._selectionType = selectionType;
                        this.clearSelectionInformation();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Gives the correct string to display for the pagination.
                 *
                 * @param {?} firstItem the index of the first item displayed.
                 * @param {?} lastItem the index of the last item displayed.
                 * @param {?} totalItems the total number of items that could be displayed.
                 * @return {?}
                 */
                DatagridComponent.prototype.paginationCallback = function (firstItem, lastItem, totalItems) {
                    return firstItem + " - " + lastItem + " of " + totalItems + " rows";
                };
                /**
                 * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
                 * @param {?} row
                 * @param {?} index
                 * @return {?}
                 */
                DatagridComponent.prototype.clrDatarowCssClassGetter = function (row, index) {
                    return '';
                };
                /**
                 * @return {?}
                 */
                DatagridComponent.prototype.ngOnInit = function () {
                    this.isLoading = true;
                    this.clearSelectionInformation();
                };
                /**
                 * @private
                 * @return {?}
                 */
                DatagridComponent.prototype.updateSelectedItems = function () {
                    var _this = this;
                    if (this._selectionType === GridSelectionType.Single) {
                        // Tries to find the currently selected item. If it isn't found, clears the selection.
                        /** @type {?} */
                        var found = this.items.find(( /**
                         * @param {?} item
                         * @param {?} itemIndex
                         * @return {?}
                         */function (item, itemIndex) { return _this.trackBy(itemIndex, item) ===
                            _this.trackBy(_this.items.indexOf(_this.datagrid.selection.currentSingle), _this.datagrid.selection.currentSingle); }));
                        if (!found) {
                            this.datagrid.selection.currentSingle = undefined;
                        }
                    }
                    else if (this._selectionType === GridSelectionType.Multi) {
                        // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.
                        if (this.datagrid.selection.current) {
                            this.datagrid.selection.current = this.datagrid.selection.current.filter(( /**
                             * @param {?} selected
                             * @param {?} selectedIndex
                             * @return {?}
                             */function (selected, selectedIndex) {
                                /** @type {?} */
                                var found = _this.items.find(( /**
                                 * @param {?} item
                                 * @param {?} itemIndex
                                 * @return {?}
                                 */function (item, itemIndex) { return _this.trackBy(itemIndex, item) === _this.trackBy(selectedIndex, selected); }));
                                return found;
                            }));
                        }
                    }
                };
                /**
                 * @private
                 * @return {?}
                 */
                DatagridComponent.prototype.clearSelectionInformation = function () {
                    if (!this.datagrid) {
                        return;
                    }
                    if (this._selectionType === GridSelectionType.Single) {
                        this.datagrid.selected = undefined;
                        this.datagrid.singleSelected = this.singleSelected;
                    }
                    else if (this._selectionType === GridSelectionType.Multi) {
                        this.datagrid.singleSelected = undefined;
                        this.datagrid.selected = this.multiSelection;
                    }
                    else if (this._selectionType === GridSelectionType.None) {
                        this.datagrid.selected = [];
                        this.datagrid.singleSelected = undefined;
                        this.datagrid.selected = undefined;
                    }
                };
                /**
                 * Returns the items selected in the VCD datagrid.
                 * @return {?}
                 */
                DatagridComponent.prototype.getDatagridSelection = function () {
                    if (this.datagrid.selection.currentSingle) {
                        return [this.datagrid.selection.currentSingle];
                    }
                    if (this.datagrid.selection.current) {
                        return this.datagrid.selection.current;
                    }
                    return [];
                };
                /**
                 * Called when the {\@param state} of the Clarity datagrid changes.
                 * @param {?} state
                 * @return {?}
                 */
                DatagridComponent.prototype.gridStateChanged = function (state) {
                    // Update pagination information.
                    /** @type {?} */
                    var pagination = {
                        pageNumber: state.page ? state.page.current : 1,
                        itemsPerPage: state.page ? state.page.size : 10,
                    };
                    // Update the sorting information.
                    /** @type {?} */
                    var toEmit = {
                        pagination: pagination,
                    };
                    if (state.sort && typeof state.sort.by === 'string') {
                        toEmit.sortColumn = {
                            name: state.sort.by,
                            reverse: state.sort.reverse,
                        };
                    }
                    this.gridRefresh.emit(toEmit);
                };
                /**
                 * Resets the pagination to page 1.
                 * @return {?}
                 */
                DatagridComponent.prototype.resetToPageOne = function () {
                    this.paginationComponent.currentPage = 1;
                };
                /**
                 * @param {?} column
                 * @return {?}
                 */
                DatagridComponent.prototype.isColumnHideable = function (column) {
                    return column && column.hideable && column.hideable !== GridColumnHideable.Never;
                };
                /**
                 * Says if the number of items matches the page size.
                 * @return {?}
                 */
                DatagridComponent.prototype.sameItemsAsPageSize = function () {
                    return this.pagination.pageSize === this.items.length;
                };
                /**
                 * Updates the pagination data and makes the callback.
                 * @param {?} paginationData
                 * @return {?}
                 */
                DatagridComponent.prototype.paginationCallbackWrapper = function (paginationData) {
                    return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);
                };
                /**
                 * Defines the {\@property columnsConfig} by adding extra property required for differentiating different kinds
                 * of renderers which is required in the HTML template.
                 * @private
                 * @return {?}
                 */
                DatagridComponent.prototype.getColumnsConfig = function () {
                    this.columnsConfig = this.columns.map(( /**
                     * @param {?} column
                     * @return {?}
                     */function (/**
                     * @param {?} column
                     * @return {?}
                     */ column) {
                        /** @type {?} */
                        var columnConfig = Object.assign({}, column);
                        if (column.renderer instanceof Function) {
                            columnConfig.fieldRenderer = ( /** @type {?} */(column.renderer));
                        }
                        else if ((( /** @type {?} */(column.renderer))).config) {
                            columnConfig.fieldColumnRendererSpec = ( /** @type {?} */(column.renderer));
                        }
                        else {
                            columnConfig.fieldName = ( /** @type {?} */(column.renderer));
                        }
                        return columnConfig;
                    }));
                };
                return DatagridComponent;
            }());
            DatagridComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-datagrid',
                            template: "<clr-datagrid [clrDgLoading]=\"isLoading\" [ngClass]=\"this.clrDatagridCssClass\" (clrDgRefresh)=\"gridStateChanged($event)\">\n    <clr-dg-column\n        *ngFor=\"let column of columnsConfig\"\n        [clrDgField]=\"column.queryFieldName\"\n        (clrDgSortOrderChange)=\"resetToPageOne()\"\n    >\n        <ng-container *ngIf=\"isColumnHideable(column); else notHideable\">\n            <ng-container *clrDgHideableColumn=\"{ hidden: column.hideable === GridColumnHideable.Hidden }\">{{\n                column.displayName\n            }}</ng-container>\n        </ng-container>\n        <ng-template #notHideable>{{ column.displayName }}</ng-template>\n    </clr-dg-column>\n\n    <clr-dg-row\n        *ngFor=\"let restItem of items; let i = index\"\n        [ngForTrackBy]=\"trackBy\"\n        [ngClass]=\"this.clrDatarowCssClassGetter(restItem, i)\"\n        [clrDgItem]=\"restItem\"\n    >\n        <clr-dg-cell *ngFor=\"let column of columnsConfig\">\n            <!-- Default renderer -->\n            <ng-container *ngIf=\"column.fieldName\">{{ restItem | nestedProperty: column.fieldName }}</ng-container>\n\n            <!-- Renderer is a function -->\n            <ng-container *ngIf=\"column.fieldRenderer\">{{\n                restItem | functionRenderer: column.fieldRenderer\n            }}</ng-container>\n\n            <!-- Renderer is a componentRenderer -->\n            <ng-template\n                *ngIf=\"column.fieldColumnRendererSpec\"\n                [vcdComponentRendererOutlet]=\"{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }\"\n            >\n            </ng-template>\n        </clr-dg-cell>\n        <ng-container ngProjectAs=\"clr-dg-row-detail\" *ngIf=\"detailTemplate !== undefined\">\n            <clr-dg-row-detail *clrIfExpanded>\n                <ng-content *ngTemplateOutlet=\"detailTemplate; context: { record: restItem }\"> </ng-content>\n            </clr-dg-row-detail>\n        </ng-container>\n    </clr-dg-row>\n    <clr-dg-row *ngIf=\"sameItemsAsPageSize()\"> </clr-dg-row>\n\n    <clr-dg-footer>\n        <clr-dg-pagination #paginationData [clrDgTotalItems]=\"totalItems\" [(clrDgPageSize)]=\"this.pagination.pageSize\">\n            <clr-dg-page-size [clrPageSizeOptions]=\"this.pagination.pageSizeOptions\">{{\n                paginationDropdownText\n            }}</clr-dg-page-size>\n            {{ paginationCallbackWrapper(paginationData) }}\n        </clr-dg-pagination>\n    </clr-dg-footer>\n</clr-datagrid>\n"
                        }] }
            ];
            DatagridComponent.propDecorators = {
                columns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                gridData: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                selectionType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                detailTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"], { static: false },] }],
                clrDatagridCssClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                paginationDropdownText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                pagination: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                gridRefresh: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
                numericFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrDatagridFilter"], { static: false },] }],
                datagrid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrDatagrid"], { static: true },] }],
                paginationComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrDatagridPagination"], { static: false },] }],
                trackBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                paginationCallback: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                clrDatarowCssClassGetter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/directives/component-renderer-outlet.directive.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Component that acts as a host element for dynamic rendering of component constructors.
             * It takes {\@link ComponentRendererSpec} as input and also 'context' as input that serves as argument for
             * {\@link ComponentRenderer.config} method. Attaches the component to be rendered to the view container of host element
             * and updates it's configuration whenever changed.
             *
             * Example usage:
             * <ng-template
             *      [vcdComponentRendererOutlet]="{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }"
             * ></ng-template>
             *
             * @template R, T
             */
            var ComponentRendererOutletDirective = /** @class */ (function () {
                /**
                 * @param {?} viewContainerRef
                 * @param {?} cfr
                 */
                function ComponentRendererOutletDirective(viewContainerRef, cfr) {
                    this.viewContainerRef = viewContainerRef;
                    this.cfr = cfr;
                }
                Object.defineProperty(ComponentRendererOutletDirective.prototype, "vcdComponentRendererOutlet", {
                    /**
                     * @param {?} renderer
                     * @return {?}
                     */
                    set: function (renderer) {
                        if (this.componentType !== renderer.rendererSpec.type) {
                            // Cache the componentType to avoid redundant detaching and attaching of component to this host
                            this.componentType = renderer.rendererSpec.type;
                            this.componentRef = this.attachRenderer();
                        }
                        this.assignValue(renderer.rendererSpec.config, renderer.context);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Attaches the passed component type to the view of this directive host
                 * @private
                 * @return {?}
                 */
                ComponentRendererOutletDirective.prototype.attachRenderer = function () {
                    if (this.componentRef) {
                        this.detachRenderer();
                    }
                    /** @type {?} */
                    var componentFactory = this.cfr.resolveComponentFactory(this.componentType);
                    return this.viewContainerRef.createComponent(componentFactory);
                };
                /**
                 * Updates the configuration of instantiated component
                 * @private
                 * @param {?} config
                 * @param {?} context
                 * @return {?}
                 */
                ComponentRendererOutletDirective.prototype.assignValue = function (config, context) {
                    if (!this.componentRef || !this.componentRef.instance) {
                        return;
                    }
                    this.componentRef.instance.config = config instanceof Function ? config(context) : config;
                };
                /**
                 * @private
                 * @return {?}
                 */
                ComponentRendererOutletDirective.prototype.detachRenderer = function () {
                    this.viewContainerRef.remove();
                    this.componentRef = null;
                };
                return ComponentRendererOutletDirective;
            }());
            ComponentRendererOutletDirective.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                            selector: '[vcdComponentRendererOutlet]',
                        },] }
            ];
            /** @nocollapse */
            ComponentRendererOutletDirective.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }
            ]; };
            ComponentRendererOutletDirective.propDecorators = {
                vcdComponentRendererOutlet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: common/pipes/nested-property.pipe.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var OBJECT_PROPERTY_SEPARATOR = '.';
            /**
             * Used for extracting the value of nested property of an object.
             *
             * Example:
             * const obj = {
             *     a: {
             *         b: {
             *             c: 'c'
             *         }
             *     }
             * }
             *
             * Invoking `{{ obj | nestedProperty: 'a.b.c' }}` in a template produces c
             */
            var NestedPropertyPipe = /** @class */ (function () {
                /**
                 * @param {?} localeId
                 */
                function NestedPropertyPipe(localeId) {
                    this.localeId = localeId;
                }
                /**
                 * @template T
                 * @param {?} item
                 * @param {?} property
                 * @return {?}
                 */
                NestedPropertyPipe.prototype.transform = function (item, property) {
                    if (!item || !property) {
                        return null;
                    }
                    /** @type {?} */
                    var splitProperty = property.split(OBJECT_PROPERTY_SEPARATOR);
                    /** @type {?} */
                    var returnValue;
                    if (splitProperty.length > 1) {
                        /** @type {?} */
                        var value = item;
                        for (var _i = 0, splitProperty_1 = splitProperty; _i < splitProperty_1.length; _i++) {
                            var nestedProp = splitProperty_1[_i];
                            if (isNullOrUndefined(value) || isNullOrUndefined(value[nestedProp])) {
                                return null;
                            }
                            value = value[nestedProp];
                        }
                        returnValue = value;
                    }
                    else {
                        if (isNullOrUndefined(item[property])) {
                            return null;
                        }
                        returnValue = item[property];
                    }
                    if (typeof returnValue === 'number') {
                        return new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DecimalPipe"](this.localeId).transform(returnValue);
                    }
                    return returnValue instanceof Date ? new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"](this.localeId).transform(returnValue) : returnValue;
                };
                return NestedPropertyPipe;
            }());
            NestedPropertyPipe.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                            name: 'nestedProperty',
                            pure: true,
                        },] }
            ];
            /** @nocollapse */
            NestedPropertyPipe.ctorParameters = function () { return [
                { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"],] }] }
            ]; };
            /**
             * Utility method for covering the 'null' and 'undefined' checks as 'value == null' is equivalent to 'value === null || value === undefined'
             * @param {?} value
             * @return {?}
             */
            function isNullOrUndefined(value) {
                return value == null;
            }
            /**
             * @fileoverview added by tsickle
             * Generated from: common/pipes/pipes.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations = [NestedPropertyPipe];
            var PipesModule = /** @class */ (function () {
                function PipesModule() {
                }
                return PipesModule;
            }());
            PipesModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            declarations: declarations,
                            exports: declarations.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/pipes/function-renderer.pipe.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Used for executing the functions of column cells which use functions to calculate their values from different
             * properties of an object
             */
            var FunctionRendererPipe = /** @class */ (function () {
                function FunctionRendererPipe() {
                }
                /**
                 * @param {?} item
                 * @param {?} renderer
                 * @return {?}
                 */
                FunctionRendererPipe.prototype.transform = function (item, renderer) {
                    if (!item || !renderer) {
                        return null;
                    }
                    return renderer(item);
                };
                return FunctionRendererPipe;
            }());
            FunctionRendererPipe.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                            name: 'functionRenderer',
                            pure: true,
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/renderers/bold-text-renderer.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * A {\@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template
             *
             * \@example Example usage with RendererSpec:
             *     columns: GridColumn<MockRecord>[] = [
             *       {
             *         displayName: 'Component Renderer',
             *         renderer: RendererSpec(
             *           BoldTextRendererComponent,
             *           (record: MockRecord) => ({text: record.name})
             *         )
             *       }
             *     ];
             */
            var BoldTextRendererComponent = /** @class */ (function () {
                function BoldTextRendererComponent() {
                }
                return BoldTextRendererComponent;
            }());
            BoldTextRendererComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            template: "\n        <strong>{{ config.text }}</strong>\n    "
                        }] }
            ];
            BoldTextRendererComponent.propDecorators = {
                config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/datagrid.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var directives = [DatagridComponent, ComponentRendererOutletDirective];
            /** @type {?} */
            var pipes = [FunctionRendererPipe];
            /** @type {?} */
            var renderers = [BoldTextRendererComponent];
            var DatagridModule = /** @class */ (function () {
                function DatagridModule() {
                }
                return DatagridModule;
            }());
            DatagridModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"], PipesModule, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"]],
                            declarations: directives.concat(renderers, pipes),
                            providers: [],
                            exports: [DatagridComponent].concat(renderers),
                            entryComponents: renderers.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: datagrid/interfaces/component-renderer.interface.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Utility function to enforce type safety on output of the config function. The output is used as value context
             * inside ComponentRenderer's template
             *
             * Example usage:
             * const gridColumn = {
             *   renderer: RendererSpec<SomeRecord, IconRendererConfiguration>(IconComponentRendererCtor, (r: SomeRecord) => v)
             * }
             *
             * In the above example, this method helps in making sure that the value "v" returned by the config function is of
             * IconRendererConfiguration type
             * @template R, C
             * @param {?} componentRendererSpec
             * @return {?}
             */
            function RendererSpec(componentRendererSpec) {
                return componentRendererSpec;
            }
            /**
             * @fileoverview added by tsickle
             * Generated from: cliptext/cliptext.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @enum {string} */
            var Position = {
                TOP: "TOP",
                BOTTOM: "BOTTOM",
                BEFORE: "BEFORE",
                AFTER: "AFTER",
            };
            /**
             * Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user
             * the ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility
             * should be taken into account.
             *
             * Example: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content
             * on multiple lines or show as much text as it can fit in one line, showing ellipses ('...') at the end to denote that
             * there is still more content and on hover over to display the full content.
             *
             * The current implementation is based on clarity tooltip component, where the tooltip is available only
             * if clipping has occurred.
             */
            var CliptextComponent = /** @class */ (function () {
                /**
                 * @param {?} changeDetector
                 */
                function CliptextComponent(changeDetector) {
                    this.changeDetector = changeDetector;
                    this._inline = false;
                    this._size = 'md';
                    this._tooltipPosition = 'top-right';
                }
                Object.defineProperty(CliptextComponent.prototype, "position", {
                    /**
                     * Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.
                     * Some of the reasons to avoid it are:
                     *  - Clarity will introduce smart positioning '[NG] Smart Popover Component #2923'
                     *  - Future versions may go with different implementation so position may become irrelevant
                     * @param {?} position
                     * @return {?}
                     */
                    set: function (position) {
                        switch (position) {
                            // Since we use only LTR languages, the mapping is:
                            // BEFORE->left, AFTER->right, default->'top-right'
                            // If we introduce RTL languages the mapping should be:
                            // BEFORE->right, AFTER->left, default->'top-left'
                            case Position.TOP:
                                this._tooltipPosition = 'top-right';
                                break;
                            case Position.BOTTOM:
                                this._tooltipPosition = 'bottom-right';
                                break;
                            case Position.BEFORE:
                                this._tooltipPosition = 'left';
                                break;
                            case Position.AFTER:
                                this._tooltipPosition = 'right';
                                break;
                            default:
                                this._tooltipPosition = 'top-right';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "inlineWidth", {
                    /**
                     * Whether the tooltip should take up a block, or be inline within text
                     *
                     * If its value is falsy (default), it will be displayed as a block (take up the parent's width).
                     * Otherwise, it should be a CSS string to be used as its max-width;
                     * @param {?} width
                     * @return {?}
                     */
                    set: function (width) {
                        this._inline = width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "isInline", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return !!this._inline;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "maxWidth", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._inline || '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "size", {
                    /**
                     * Same as Clarity tooltip sizes (xs, sm, md, lg) but currently only the default one (md) is used
                     * @return {?}
                     */
                    get: function () {
                        return this._size;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipPosition", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._tooltipPosition;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipText", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._tooltipText;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipContent", {
                    /**
                     * @param {?} tooltipContent
                     * @return {?}
                     */
                    set: function (tooltipContent) {
                        if (!tooltipContent) {
                            return;
                        }
                        if (!this.isOverflowing()) {
                            this.clrIfOpen.open = false;
                        }
                        else {
                            // Check if the tooltip text has changed
                            /** @type {?} */
                            var tooltipText = this.cliptextContainer.nativeElement.textContent;
                            if (this._tooltipText !== tooltipText) {
                                this._tooltipText = tooltipText;
                                // Re-trigger open so that clarity tooltip is positioned correctly
                                this.clrIfOpen.open = false;
                                this.clrIfOpen.open = true;
                                this.changeDetector.detectChanges();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @return {?}
                 */
                CliptextComponent.prototype.ngAfterViewInit = function () {
                    this._tooltipText = this.cliptextContainer.nativeElement.textContent;
                };
                /**
                 * @private
                 * @return {?}
                 */
                CliptextComponent.prototype.isOverflowing = function () {
                    return isTextOverflowing(this.cliptextContainer.nativeElement);
                    // Text overflows when the content element's width is less than its scrollWidth.
                    /**
                     * @param {?} el
                     * @return {?}
                     */
                    function isTextOverflowing(el) {
                        return Math.ceil(el.getBoundingClientRect().width) < el.scrollWidth;
                    }
                };
                return CliptextComponent;
            }());
            CliptextComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-cliptext',
                            template: "<clr-tooltip>\n    <div #cliptextContainer clrTooltipTrigger class=\"cliptext-container text-truncate\" [ngClass]=\"{ inline: isInline }\">\n        <ng-content></ng-content>\n    </div>\n    <clr-tooltip-content aria-hidden=\"true\" *clrIfOpen [clrPosition]=\"tooltipPosition\" [clrSize]=\"size\">\n        <span>{{ tooltipText }}</span>\n    </clr-tooltip-content>\n</clr-tooltip>\n",
                            styles: [":host(.inline){display:inline-block;vertical-align:middle}clr-tooltip{display:block}clr-tooltip .text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
                        }] }
            ];
            /** @nocollapse */
            CliptextComponent.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
            ]; };
            CliptextComponent.propDecorators = {
                position: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                inlineWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                isInline: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.inline',] }],
                maxWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['style.maxWidth',] }],
                cliptextContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['cliptextContainer', { static: true },] }],
                clrIfOpen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrIfOpen"], { static: true },] }],
                tooltipContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrTooltipContent"], { static: false },] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: cliptext/cliptext.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var CliptextModule = /** @class */ (function () {
                function CliptextModule() {
                }
                return CliptextModule;
            }());
            CliptextModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            declarations: [CliptextComponent],
                            exports: [CliptextComponent],
                            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"]],
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: components.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var ComponentsModule = /** @class */ (function () {
                function ComponentsModule() {
                }
                return ComponentsModule;
            }());
            ComponentsModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [DataExporterModule, DatagridModule, CliptextModule],
                            exports: [DataExporterModule, DatagridModule, CliptextModule],
                        },] }
            ];
            //# sourceMappingURL=vcd-ui-components.js.map
            /***/ 
        }),
        /***/ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js": 
        /*!*************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/dist/doc-lib/fesm2015/vcd-ui-doc-lib.js ***!
          \*************************************************************************************************************/
        /*! exports provided: ApiViewerComponent, DOCUMENTATION_DATA, DocLibModule, Documentation, DocumentationContainerComponent, DocumentationRetrieverService, ExampleViewerComponent, OverviewViewerComponent, PrismHighlightService, STACKBLITZ_DATA, STACKBLITZ_INFO, SourceCodeViewerComponent, StackBlitzWriterService, getCompoDocRetrieverService, getStackBlitzWriter, ɵa, ɵb, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiViewerComponent", function () { return ApiViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_DATA", function () { return DOCUMENTATION_DATA; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocLibModule", function () { return DocLibModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Documentation", function () { return Documentation; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentationContainerComponent", function () { return DocumentationContainerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentationRetrieverService", function () { return DocumentationRetrieverService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleViewerComponent", function () { return ExampleViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewViewerComponent", function () { return OverviewViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrismHighlightService", function () { return PrismHighlightService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STACKBLITZ_DATA", function () { return STACKBLITZ_DATA; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STACKBLITZ_INFO", function () { return STACKBLITZ_INFO; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceCodeViewerComponent", function () { return SourceCodeViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackBlitzWriterService", function () { return StackBlitzWriterService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCompoDocRetrieverService", function () { return getCompoDocRetrieverService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStackBlitzWriter", function () { return getStackBlitzWriter; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function () { return CompoDocRetrieverService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function () { return DocumentationContainerModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function () { return OverviewViewerModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function () { return OverviewViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function () { return ApiViewerModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function () { return ApiViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function () { return ExampleViewerModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function () { return SourceCodeViewerModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function () { return SourceCodeViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function () { return HighlightService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function () { return ExampleViewerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function () { return DocumentationContainerComponent; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function () { return PrismHighlightService; });
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ "../../node_modules/prismjs/prism.js");
            /* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */ var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/components/prism-typescript */ "../../node_modules/prismjs/components/prism-typescript.js");
            /* harmony import */ var prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(prismjs_components_prism_typescript__WEBPACK_IMPORTED_MODULE_3__);
            /* harmony import */ var prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/components/prism-scss */ "../../node_modules/prismjs/components/prism-scss.js");
            /* harmony import */ var prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(prismjs_components_prism_scss__WEBPACK_IMPORTED_MODULE_4__);
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _stackblitz_sdk__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @stackblitz/sdk */ "../../node_modules/@stackblitz/sdk/bundles/sdk.m.js");
            /**
             * @fileoverview added by tsickle
             * Generated from: documentation-retriever.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Service exposing methods for retrieving the documentation for a given component.
             * @abstract
             */
            var DocumentationRetrieverService = /** @class */ (function () {
                function DocumentationRetrieverService() {
                }
                return DocumentationRetrieverService;
            }());
            /**
             * @fileoverview added by tsickle
             * Generated from: documentation-container/documentation-container.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var DocumentationContainerComponent = /** @class */ (function () {
                /**
                 * @param {?} route
                 */
                function DocumentationContainerComponent(route) {
                    this.route = route;
                }
                /**
                 * @return {?}
                 */
                DocumentationContainerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.data.subscribe(( /**
                     * @param {?} data
                     * @return {?}
                     */function (data) {
                        _this.documentationEntry = data.documentationEntry;
                    }));
                };
                return DocumentationContainerComponent;
            }());
            DocumentationContainerComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-documentation-container',
                            template: "<clr-tabs>\n    <clr-tab>\n        <button clrTabLink>Documentation</button>\n        <clr-tab-content>\n            <vcd-overview-viewer [component]=\"documentationEntry?.component\"> </vcd-overview-viewer>\n        </clr-tab-content>\n    </clr-tab>\n\n    <clr-tab>\n        <button clrTabLink>API</button>\n        <clr-tab-content>\n            <vcd-api-viewer [component]=\"documentationEntry?.component\"> </vcd-api-viewer>\n        </clr-tab-content>\n    </clr-tab>\n\n    <clr-tab>\n        <button clrTabLink>Examples</button>\n        <clr-tab-content>\n            <vcd-example-viewer\n                *ngFor=\"let exampleDescriptor of documentationEntry?.examples\"\n                [exampleEntry]=\"exampleDescriptor\"\n            >\n            </vcd-example-viewer>\n        </clr-tab-content>\n    </clr-tab>\n</clr-tabs>\n",
                            styles: ["vcd-example-viewer{margin-top:1rem;display:block}"]
                        }] }
            ];
            /** @nocollapse */
            DocumentationContainerComponent.ctorParameters = function () { return [
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
            ]; };
            /**
             * @fileoverview added by tsickle
             * Generated from: documentation.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * To register a documentation entry as value for corresponding component
             * @type {?}
             */
            var documentationEntryMap = new Map();
            /**
             * Used in {\@link Documentation.registerDocumentationEntry} method to check if the input is a valid {\@link DocumentationEntry}
             * @param {?} documentationParams
             * @return {?}
             */
            function validateDocumentationMetadata(documentationParams) {
                if (!documentationParams.urlSegment) {
                    throw new Error('urlSegment should be specified and not empty');
                }
                /** @type {?} */
                var documentationEntry = Documentation.getAllEntries().find(( /**
                 * @param {?} entry
                 * @return {?}
                 */function (/**
                 * @param {?} entry
                 * @return {?}
                 */ entry) { return entry.urlSegment === documentationParams.urlSegment; }));
                if (documentationEntry) {
                    throw new Error("The specified urlSegment '" + documentationParams.urlSegment + "' for '" + documentationParams.displayName + "'" +
                        ("was already defined for '" + documentationEntry.displayName + "'"));
                }
                if (!documentationParams.displayName) {
                    throw new Error('displayName should be specified and not empty');
                }
            }
            /** @type {?} */
            var Documentation = {
                /**
                 * Returns all the documentation entries registered into the framework
                 * @return {?}
                 */
                getAllEntries: function () {
                    return Array.from(documentationEntryMap.values());
                },
                /**
                 * Returns angular routes used when displaying the documentation/examples for the components.
                 * @return {?}
                 */
                getRoutes: function () {
                    return Documentation.getAllEntries().map(( /**
                     * @param {?} documentationEntry
                     * @return {?}
                     */function (documentationEntry) { return ({
                        path: documentationEntry.urlSegment,
                        component: DocumentationContainerComponent,
                        data: { documentationEntry: documentationEntry },
                    }); }));
                },
                /**
                 * Used for manual registration of documentation entry with a corresponding component.
                 * @param {?} documentationEntry
                 * @return {?}
                 */
                registerDocumentationEntry: function (documentationEntry) {
                    validateDocumentationMetadata(documentationEntry);
                    documentationEntryMap.set(documentationEntry.component, documentationEntry);
                },
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: compodoc/compodoc-retriever.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * This service retrieves specific properties from compodoc generated documentation
             */
            var CompoDocRetrieverService = /** @class */ (function () {
                /**
                 * @param {?} documentationJson
                 */
                function CompoDocRetrieverService(documentationJson) {
                    this.documentationJson = documentationJson;
                }
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getOverview = function (component) {
                    return this.getComponent(component).description;
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getTypescriptSourceCode = function (component) {
                    return this.getComponent(component).sourceCode;
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getHtmlSourceCode = function (component) {
                    return this.getComponent(component).templateData;
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getCssSourceCode = function (component) {
                    /** @type {?} */
                    var styleUrlsData = this.getComponent(component).styleUrlsData;
                    if (!styleUrlsData) {
                        return;
                    }
                    return styleUrlsData.map(( /**
                     * @param {?} styleUrl
                     * @return {?}
                     */function (/**
                     * @param {?} styleUrl
                     * @return {?}
                     */ styleUrl) { return styleUrl.data; })).join('\n\n\n');
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getComponent = function (component) {
                    for (var _i = 0, _a = this.documentationJson; _i < _a.length; _i++) {
                        var documentationJson = _a[_i];
                        /** @type {?} */
                        var compodocComponent = documentationJson.components.find(( /**
                         * @param {?} c
                         * @return {?}
                         */function (/**
                         * @param {?} c
                         * @return {?}
                         */ c) { return c.name === component.name; }));
                        if (compodocComponent) {
                            return compodocComponent;
                        }
                    }
                    return ( /** @type {?} */({ styleUrlsData: [] }));
                };
                /**
                 * @param {?} moduleName
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getModule = function (moduleName) {
                    for (var _i = 0, _a = this.documentationJson; _i < _a.length; _i++) {
                        var documentationJson = _a[_i];
                        /** @type {?} */
                        var compodocComponent = documentationJson.modules.find(( /**
                         * @param {?} module
                         * @return {?}
                         */function (/**
                         * @param {?} module
                         * @return {?}
                         */ module) { return module.name === moduleName; }));
                        if (compodocComponent) {
                            return compodocComponent;
                        }
                    }
                    return null;
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getInputParameters = function (component) {
                    /** @type {?} */
                    var comp = this.getComponent(component);
                    return comp.inputsClass || [];
                };
                /**
                 * @param {?} component
                 * @return {?}
                 */
                CompoDocRetrieverService.prototype.getOutputParameters = function (component) {
                    /** @type {?} */
                    var comp = this.getComponent(component);
                    return comp.outputsClass || [];
                };
                return CompoDocRetrieverService;
            }());
            /**
             * @fileoverview added by tsickle
             * Generated from: highlight/highlight.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * @abstract
             */
            var HighlightService = /** @class */ (function () {
                function HighlightService() {
                }
                return HighlightService;
            }());
            HighlightService.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] }
            ];
            /** @nocollapse */ HighlightService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function HighlightService_Factory() { return new HighlightService(); }, token: HighlightService, providedIn: "root" });
            /**
             * @fileoverview added by tsickle
             * Generated from: highlight/prism/prism-highlight.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var PrismHighlightService = /** @class */ (function (_super) {
                __extends(PrismHighlightService, _super);
                function PrismHighlightService() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * @param {?} code
                 * @return {?}
                 */
                PrismHighlightService.prototype.highlightTypescript = function (code) {
                    return this.highlight(code, prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages.typescript);
                };
                /**
                 * @param {?} code
                 * @return {?}
                 */
                PrismHighlightService.prototype.highlightHtml = function (code) {
                    return this.highlight(code, prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages.html);
                };
                /**
                 * @param {?} code
                 * @return {?}
                 */
                PrismHighlightService.prototype.highlightScss = function (code) {
                    return this.highlight(code, prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages.scss);
                };
                /**
                 * @private
                 * @param {?} code
                 * @param {?} lang
                 * @return {?}
                 */
                PrismHighlightService.prototype.highlight = function (code, lang) {
                    return prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.highlight(code || '', lang);
                };
                return PrismHighlightService;
            }(HighlightService));
            PrismHighlightService.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: overview-viewer/overview-viewer.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var OverviewViewerComponent = /** @class */ (function () {
                /**
                 * @param {?} documentationRetriever
                 */
                function OverviewViewerComponent(documentationRetriever) {
                    this.documentationRetriever = documentationRetriever;
                    this.isNoOverviewMessageShown = true;
                }
                Object.defineProperty(OverviewViewerComponent.prototype, "component", {
                    /**
                     * @param {?} component
                     * @return {?}
                     */
                    set: function (component) {
                        if (!component) {
                            return;
                        }
                        // TODO: externalize string literals
                        this.overview =
                            this.documentationRetriever.getOverview(component) ||
                                (this.isNoOverviewMessageShown ? 'No Documentation found' : '');
                    },
                    enumerable: true,
                    configurable: true
                });
                return OverviewViewerComponent;
            }());
            OverviewViewerComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-overview-viewer',
                            template: "<div [innerHTML]=\"overview\"></div>\n",
                            styles: [""]
                        }] }
            ];
            /** @nocollapse */
            OverviewViewerComponent.ctorParameters = function () { return [
                { type: DocumentationRetrieverService }
            ]; };
            OverviewViewerComponent.propDecorators = {
                isNoOverviewMessageShown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                component: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: overview-viewer/overview-viewer.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations = [OverviewViewerComponent];
            var OverviewViewerModule = /** @class */ (function () {
                function OverviewViewerModule() {
                }
                return OverviewViewerModule;
            }());
            OverviewViewerModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"]],
                            declarations: declarations.slice(),
                            exports: declarations.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: stack-blitz-writer.service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var STACKBLITZ_INFO = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('StackBlitz Template information');
            /** @type {?} */
            var APP_MODULE = 'src/app/app.module.ts';
            /** @type {?} */
            var APP_COMPONENT_HTML = 'src/app/app.component.html';
            /**
             *
             * Given an existing stackblitz containing a few placeholders, it modifies that stackblitz adding a new component
             * to app.component.html and its module to app.module.ts
             *
             * import { NgModule } from "\@angular/core";
             * import { BrowserModule } from "\@angular/platform-browser";
             * import { BrowserAnimationsModule } from "\@angular/platform-browser/animations";
             * import { FormsModule } from "\@angular/forms";
             * import { ClarityModule } from "\@clr/angular";
             * import { AppComponent } from "./app.component";
             * //__EXAMPLE_MODULE_IMPORT_LINE;
             *
             * \@NgModule({
             *   imports: [
             *     BrowserModule,
             *     BrowserAnimationsModule,
             *     ClarityModule,
             *     FormsModule,
             *     //__EXAMPLE_NG_MODULE_IMPORTS_ENTRY
             *   ],
             *   declarations: [AppComponent],
             *   bootstrap: [AppComponent]
             * })
             * export class AppModule {}
             */
            var StackBlitzWriterService = /** @class */ (function () {
                /**
                 * @param {?} stackBlitzInfo
                 * @param {?} docRetriever
                 */
                function StackBlitzWriterService(stackBlitzInfo, docRetriever) {
                    this.stackBlitzInfo = stackBlitzInfo;
                    this.docRetriever = docRetriever;
                    this.template = null;
                    this.fetchSbTemplate();
                }
                /**
                 * @param {?} entry The example to be displayed in StackBlitz
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.openStackBlitz = function (entry) {
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_7__["__awaiter"])(this, void 0, void 0, function () {
                        var exampleComponent, exampleModule, moduleName, _a, templateFiles, dependencies, _b, mergedFiles, openFile, project, openOptions;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    exampleComponent = this.docRetriever.getComponent(entry.component);
                                    if (this.stackBlitzInfo.moduleFinder) {
                                        moduleName = this.stackBlitzInfo.moduleFinder(exampleComponent.name);
                                        exampleModule = this.docRetriever.getModule(moduleName);
                                    }
                                    return [4 /*yield*/, this.fetchSbTemplate()];
                                case 1:
                                    _a = _c.sent(), templateFiles = _a[0], dependencies = _a[1];
                                    _b = this.createPatch(templateFiles, exampleComponent, exampleModule), mergedFiles = _b[0], openFile = _b[1];
                                    project = {
                                        title: this.stackBlitzInfo.projectName,
                                        description: entry.title,
                                        template: 'angular-cli',
                                        dependencies: dependencies,
                                        files: mergedFiles,
                                    };
                                    openOptions = {
                                        openFile: openFile,
                                        newWindow: true,
                                    };
                                    return [2 /*return*/, _stackblitz_sdk__WEBPACK_IMPORTED_MODULE_8__["default"].openProject(project, openOptions)];
                            }
                        });
                    });
                };
                /**
                 * @private
                 * @param {?} templateFs
                 * @param {?} exampleComponent
                 * @param {?=} module
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.createPatch = function (templateFs, exampleComponent, module) {
                    var _a;
                    /** @type {?} */
                    var componentTsFile = this.getFileName(exampleComponent.file);
                    /** @type {?} */
                    var changedFiles = (_a = {},
                        _a[APP_MODULE] = this.mergeAppModule(module, templateFs),
                        _a[APP_COMPONENT_HTML] = this.mergeAppHtml(exampleComponent, templateFs),
                        _a[componentTsFile] = exampleComponent.sourceCode,
                        _a[this.getFileName(module.path)] = module.sourceCode,
                        _a);
                    /** @type {?} */
                    var defaultFile = componentTsFile;
                    if (exampleComponent.templateUrl && exampleComponent.templateUrl.length > 0) {
                        /** @type {?} */
                        var fileName = removeLeadingDotSlash(exampleComponent.templateUrl[0]);
                        /** @type {?} */
                        var htmlFile = this.getFileName(fileName);
                        changedFiles[htmlFile] = exampleComponent.templateData;
                        // If HTML is provided, use that as the default file
                        defaultFile = htmlFile;
                    }
                    if (exampleComponent.styleUrlsData && exampleComponent.styleUrlsData.length > 0) {
                        /** @type {?} */
                        var styleData = exampleComponent.styleUrlsData[0];
                        /** @type {?} */
                        var fileName = removeLeadingDotSlash(styleData.styleUrl);
                        changedFiles[this.getFileName(fileName)] = styleData.data;
                    }
                    /** @type {?} */
                    var mergedFs = Object.assign({}, templateFs, changedFiles);
                    return [mergedFs, defaultFile];
                    /**
                     * @param {?} fileName a fileName path that may start with ./
                     * @return {?} A filename, without ./ in the front
                     */
                    function removeLeadingDotSlash(fileName) {
                        if (fileName.startsWith('./')) {
                            fileName = fileName.slice(2);
                        }
                        return fileName;
                    }
                };
                /**
                 * Fetches an existing Stackblitz's files and dependencies by embedding it on the page and removing it when finished.
                 * The result is cached for future calls.
                 * @private
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.fetchSbTemplate = function () {
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_7__["__awaiter"])(this, void 0, void 0, function () {
                        var iframeContainer, iframeContainerParent, vm, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (this.template) {
                                        return [2 /*return*/, Promise.resolve(this.template)];
                                    }
                                    iframeContainer = document.createElement('div');
                                    iframeContainerParent = document.createElement('div');
                                    iframeContainerParent.appendChild(iframeContainer);
                                    iframeContainerParent.style.visibility = 'hidden';
                                    iframeContainerParent.style.position = 'absolute';
                                    document.body.appendChild(iframeContainerParent);
                                    return [4 /*yield*/, _stackblitz_sdk__WEBPACK_IMPORTED_MODULE_8__["default"].embedProjectId(iframeContainer, this.stackBlitzInfo.projectName, { view: 'editor' })];
                                case 1:
                                    vm = _c.sent();
                                    _a = this;
                                    return [4 /*yield*/, vm.getFsSnapshot()];
                                case 2:
                                    _b = [_c.sent()];
                                    return [4 /*yield*/, vm.getDependencies()];
                                case 3:
                                    _a.template = _b.concat([_c.sent()]);
                                    document.body.removeChild(iframeContainerParent);
                                    return [2 /*return*/, Promise.resolve(this.template)];
                            }
                        });
                    });
                };
                /**
                 * Returns just the filename part of a path prefixed by 'src/app/'
                 * @private
                 * @param {?} path Path to be shortened to just its filename and put under src/app
                 * @param {?=} prefix A new path to be inserted before the filename
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.getFileName = function (path, prefix) {
                    if (prefix === void 0) { prefix = 'src/app/'; }
                    return prefix + path.slice(path.lastIndexOf('/') + 1);
                };
                /**
                 * @private
                 * @param {?} module
                 * @param {?} fileSystem
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.mergeAppModule = function (module, fileSystem) {
                    /** @type {?} */
                    var moduleFileName = this.getFileName(module.path, '').replace(/\.ts$/, '');
                    /** @type {?} */
                    var moduleName = module.name;
                    return fileSystem[APP_MODULE].replace('//__EXAMPLE_MODULE_IMPORT_LINE', "import {" + moduleName + "} from \"./" + moduleFileName + "\";").replace('//__EXAMPLE_NG_MODULE_IMPORTS_ENTRY', moduleName);
                };
                /**
                 * @private
                 * @param {?} component
                 * @param {?} fileSystem
                 * @return {?}
                 */
                StackBlitzWriterService.prototype.mergeAppHtml = function (component, fileSystem) {
                    /** @type {?} */
                    var tag = '<x></x>'.replace(/x/g, component.selector);
                    return fileSystem[APP_COMPONENT_HTML].replace(/__EXAMPLE_TAG/, tag);
                };
                return StackBlitzWriterService;
            }());
            /** @nocollapse */
            StackBlitzWriterService.ctorParameters = function () { return [
                { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [STACKBLITZ_INFO,] }] },
                { type: DocumentationRetrieverService }
            ]; };
            /**
             * @fileoverview added by tsickle
             * Generated from: example-viewer/example-viewer.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var ExampleViewerComponent = /** @class */ (function () {
                /**
                 * @param {?} resolver
                 * @param {?} docRetriever
                 * @param {?} stackblitzWriter
                 */
                function ExampleViewerComponent(resolver, docRetriever, stackblitzWriter) {
                    this.resolver = resolver;
                    this.docRetriever = docRetriever;
                    this.stackblitzWriter = stackblitzWriter;
                    /**
                     * For showing and hiding of {\@link SourceCodeViewerComponent} in the HTML
                     */
                    this.showSourceCode = false;
                }
                Object.defineProperty(ExampleViewerComponent.prototype, "exampleEntry", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this._exampleEntry;
                    },
                    /**
                     * @param {?} exampleEntry
                     * @return {?}
                     */
                    set: function (exampleEntry) {
                        this._exampleEntry = exampleEntry;
                        this.createExample();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @private
                 * @return {?}
                 */
                ExampleViewerComponent.prototype.createExample = function () {
                    this.exampleContainer.clear();
                    /** @type {?} */
                    var exampleEntry = this.exampleEntry;
                    if (!exampleEntry || !exampleEntry.component) {
                        return;
                    }
                    /** @type {?} */
                    var factory = this.resolver.resolveComponentFactory(exampleEntry.component);
                    this.exampleContainer.createComponent(factory);
                };
                /**
                 * @return {?}
                 */
                ExampleViewerComponent.prototype.onCodeButtonClick = function () {
                    this.showSourceCode = !this.showSourceCode;
                };
                /**
                 * @return {?}
                 */
                ExampleViewerComponent.prototype.onRunButtonClick = function () {
                    this.stackblitzWriter.openStackBlitz(this.exampleEntry);
                };
                return ExampleViewerComponent;
            }());
            ExampleViewerComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-example-viewer',
                            template: "<div class=\"card\">\n    <div class=\"card-header-main\">\n        <div class=\"card-header\">\n            {{ exampleEntry?.title }}\n        </div>\n\n        <div class=\"example-button-container\" [ngClass]=\"{ 'example-shown': showSourceCode }\">\n            <clr-icon shape=\"play\" size=\"32\" class=\"is-solid\" (click)=\"onRunButtonClick()\"></clr-icon>\n            <clr-icon shape=\"code\" size=\"32\" (click)=\"onCodeButtonClick()\"> </clr-icon>\n        </div>\n    </div>\n\n    <div class=\"card-block source-code-container\" *ngIf=\"showSourceCode\">\n        <vcd-source-code-viewer [component]=\"exampleEntry?.component\"> </vcd-source-code-viewer>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-text\">\n            <vcd-overview-viewer\n                [isNoOverviewMessageShown]=\"false\"\n                [component]=\"exampleEntry?.component\"\n            ></vcd-overview-viewer>\n            <template #exampleContainer> </template>\n        </div>\n    </div>\n</div>\n",
                            styles: [".card-header-main{display:flex}.card-header-main .card-header{flex:1}.card-header-main .example-button-container{display:flex;margin:.5rem .5rem 0 0}.card-header-main .example-button-container.example-shown{border-radius:3px 3px 0 0;background-color:#d8e3e9}.card-header-main .example-button-container clr-icon{-ms-grid-row-align:center;align-self:center}.source-code-container{border-radius:3px 0 3px 3px;background-color:#d8e3e9;margin:0 .5rem}:host ::ng-deep vcd-overview-viewer>div>p{margin-bottom:10px}"]
                        }] }
            ];
            /** @nocollapse */
            ExampleViewerComponent.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] },
                { type: DocumentationRetrieverService },
                { type: StackBlitzWriterService }
            ]; };
            ExampleViewerComponent.propDecorators = {
                exampleEntry: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
                exampleContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['exampleContainer', { static: true, read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: source-code-viewer/source-code-viewer.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * To display the 3 code parts(TypeScript, HTML and CSS) of a component
             */
            var SourceCodeViewerComponent = /** @class */ (function () {
                /**
                 * @param {?} documentationRetriever
                 * @param {?} highlightService
                 */
                function SourceCodeViewerComponent(documentationRetriever, highlightService) {
                    this.documentationRetriever = documentationRetriever;
                    this.highlightService = highlightService;
                }
                Object.defineProperty(SourceCodeViewerComponent.prototype, "component", {
                    /**
                     * The component which source (typescript, html, css) will be displayed
                     * @param {?} component
                     * @return {?}
                     */
                    set: function (component) {
                        if (!component) {
                            return;
                        }
                        // TODO: externalize string literals
                        this.typescriptSourceCode = this.highlightService.highlightTypescript(this.documentationRetriever.getTypescriptSourceCode(component));
                        this.htmlSourceCode = this.highlightService.highlightHtml(this.documentationRetriever.getHtmlSourceCode(component) || 'No html found');
                        this.cssSourceCode = this.highlightService.highlightScss(this.documentationRetriever.getCssSourceCode(component) || 'No CSS found');
                    },
                    enumerable: true,
                    configurable: true
                });
                return SourceCodeViewerComponent;
            }());
            SourceCodeViewerComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: 'vcd-source-code-viewer',
                            template: "<clr-tabs>\n    <clr-tab>\n        <button clrTabLink>Typescript</button>\n        <clr-tab-content>\n            <pre class=\"language-ts\"><code [innerHTML]=\"typescriptSourceCode\"></code></pre>\n        </clr-tab-content>\n    </clr-tab>\n\n    <clr-tab>\n        <button clrTabLink>HTML</button>\n        <clr-tab-content>\n            <pre class=\"language-html\"><code [innerHTML]=\"htmlSourceCode\"></code></pre>\n        </clr-tab-content>\n    </clr-tab>\n\n    <clr-tab>\n        <button clrTabLink>CSS</button>\n        <clr-tab-content>\n            <pre class=\"language-scss\"><code [innerHTML]=\"cssSourceCode\"></code></pre>\n        </clr-tab-content>\n    </clr-tab>\n</clr-tabs>\n",
                            styles: ["pre{height:15rem;max-height:15rem;border-radius:3px}"]
                        }] }
            ];
            /** @nocollapse */
            SourceCodeViewerComponent.ctorParameters = function () { return [
                { type: DocumentationRetrieverService },
                { type: HighlightService }
            ]; };
            SourceCodeViewerComponent.propDecorators = {
                component: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: source-code-viewer/source-code-viewer.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations$1 = [SourceCodeViewerComponent];
            var SourceCodeViewerModule = /** @class */ (function () {
                function SourceCodeViewerModule() {
                }
                return SourceCodeViewerModule;
            }());
            SourceCodeViewerModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"]],
                            declarations: declarations$1.slice(),
                            exports: declarations$1.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: example-viewer/example-viewer.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations$2 = [ExampleViewerComponent];
            var ExampleViewerModule = /** @class */ (function () {
                function ExampleViewerModule() {
                }
                return ExampleViewerModule;
            }());
            ExampleViewerModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"], SourceCodeViewerModule, OverviewViewerModule],
                            declarations: declarations$2.slice(),
                            exports: declarations$2.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: api-viewer/api-viewer.component.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var ApiViewerComponent = /** @class */ (function () {
                /**
                 * @param {?} documentationRetriever
                 */
                function ApiViewerComponent(documentationRetriever) {
                    this.documentationRetriever = documentationRetriever;
                }
                Object.defineProperty(ApiViewerComponent.prototype, "component", {
                    /**
                     * Gets the input and output parameters from the Compodoc generated documentation json
                     * @param {?} component
                     * @return {?}
                     */
                    set: function (component) {
                        if (!component) {
                            return;
                        }
                        this.inputParameters = this.documentationRetriever.getInputParameters(component);
                        this.outputParameters = this.documentationRetriever.getOutputParameters(component);
                    },
                    enumerable: true,
                    configurable: true
                });
                return ApiViewerComponent;
            }());
            ApiViewerComponent.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                            selector: ' vcd-api-viewer',
                            template: "<h6>Inputs</h6>\n<table class=\"table\" *ngIf=\"inputParameters?.length\">\n    <thead>\n        <tr>\n            <th class=\"left\">Name</th>\n            <th>Type</th>\n            <th class=\"left\">Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let par of inputParameters\">\n            <td class=\"left\">\n                <p>{{ par.name }}</p>\n            </td>\n            <td>{{ par.type }}</td>\n            <td class=\"left\"><div [innerHTML]=\"par.description\"></div></td>\n        </tr>\n    </tbody>\n</table>\n<p *ngIf=\"!inputParameters?.length\">The component has no input parameters</p>\n\n<h6>Outputs</h6>\n<table class=\"table\" *ngIf=\"outputParameters?.length\">\n    <thead>\n        <tr>\n            <th class=\"left\">Name</th>\n            <th>Type</th>\n            <th class=\"left\">Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let par of outputParameters\">\n            <td class=\"left\">\n                <p>{{ par.name }}</p>\n            </td>\n            <td>{{ par.type }}</td>\n            <td class=\"left\"><div [innerHTML]=\"par.description\"></div></td>\n        </tr>\n    </tbody>\n</table>\n<p *ngIf=\"!outputParameters?.length\">The component does not emit any values</p>\n",
                            styles: ["::ng-deep body p{margin-top:0}"]
                        }] }
            ];
            /** @nocollapse */
            ApiViewerComponent.ctorParameters = function () { return [
                { type: DocumentationRetrieverService }
            ]; };
            ApiViewerComponent.propDecorators = {
                component: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: api-viewer/api-viewer.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations$3 = [ApiViewerComponent];
            var ApiViewerModule = /** @class */ (function () {
                function ApiViewerModule() {
                }
                return ApiViewerModule;
            }());
            ApiViewerModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"]],
                            declarations: declarations$3.slice(),
                            exports: declarations$3.slice(),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: documentation-container/documentation-container.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations$4 = [DocumentationContainerComponent];
            var DocumentationContainerModule = /** @class */ (function () {
                function DocumentationContainerModule() {
                }
                return DocumentationContainerModule;
            }());
            DocumentationContainerModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"], OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
                            declarations: declarations$4.slice(),
                            entryComponents: [DocumentationContainerComponent],
                            exports: declarations$4.concat([OverviewViewerModule, ApiViewerModule, ExampleViewerModule]),
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: doc-lib.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var declarations$5 = [];
            /**
             * Token that makes the documentation JSONs available to the following factory function.
             * @type {?}
             */
            var DOCUMENTATION_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('DocLibModule.forRoot() CompoDocRetrieverService doc jsons.');
            /**
             * Token that makes Stqckblitz JSON data available to factory functions
             * @type {?}
             */
            var STACKBLITZ_DATA = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('DocLibModule.forRoot() StackBlitz template JSON data');
            /**
             * @param {?} documentations
             * @return {?}
             */
            function getCompoDocRetrieverService(documentations) {
                return new CompoDocRetrieverService(documentations);
            }
            /**
             * @param {?} sbData
             * @param {?} docRetrieverService
             * @return {?}
             */
            function getStackBlitzWriter(sbData, docRetrieverService) {
                return new StackBlitzWriterService(sbData, docRetrieverService);
            }
            var DocLibModule = /** @class */ (function () {
                function DocLibModule() {
                }
                /**
                 * Called in the host package importing this doc library for providing the documentation JSONs needed for
                 * {\@link CompoDocRetrieverService}
                 * @param {?} documentations
                 * @param {?} stackblitzData
                 * @return {?}
                 */
                DocLibModule.forRoot = function (documentations, stackblitzData) {
                    return {
                        ngModule: DocLibModule,
                        providers: [
                            // For injecting 'documentations' into factory function, we have to first provide them as injectable.
                            {
                                provide: DOCUMENTATION_DATA,
                                useValue: documentations,
                            },
                            {
                                provide: STACKBLITZ_INFO,
                                useValue: stackblitzData,
                            },
                            {
                                provide: DocumentationRetrieverService,
                                useFactory: getCompoDocRetrieverService,
                                deps: [DOCUMENTATION_DATA],
                            },
                            {
                                provide: StackBlitzWriterService,
                                deps: [STACKBLITZ_INFO, DocumentationRetrieverService],
                                useFactory: getStackBlitzWriter,
                            },
                        ],
                    };
                };
                return DocLibModule;
            }());
            DocLibModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            imports: [DocumentationContainerModule],
                            declarations: declarations$5.slice(),
                            exports: declarations$5.concat([DocumentationContainerModule]),
                            providers: [{ provide: HighlightService, useClass: PrismHighlightService }],
                        },] }
            ];
            //# sourceMappingURL=vcd-ui-doc-lib.js.map
            /***/ 
        }),
        /***/ "../../dist/i18n/fesm2015/vcd-i18n.js": 
        /*!****************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/dist/i18n/fesm2015/vcd-i18n.js ***!
          \****************************************************************************************************/
        /*! exports provided: BOOTSTRAP_DETAILS, BasicTranslationService, FormatDateTimePipe, I18nModule, MessageFormatTranslationService, MockTranslationService, PlatformUtil, TranslationLoader, TranslationPipe, TranslationService, formatDateStringToValidFormatForIE, genericSingletonFactory */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOTSTRAP_DETAILS", function () { return BOOTSTRAP_DETAILS; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicTranslationService", function () { return BasicTranslationService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatDateTimePipe", function () { return FormatDateTimePipe; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18nModule", function () { return I18nModule; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageFormatTranslationService", function () { return MessageFormatTranslationService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockTranslationService", function () { return MockTranslationService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformUtil", function () { return PlatformUtil; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslationLoader", function () { return TranslationLoader; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslationPipe", function () { return TranslationPipe; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslationService", function () { return TranslationService; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateStringToValidFormatForIE", function () { return formatDateStringToValidFormatForIE; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genericSingletonFactory", function () { return genericSingletonFactory; });
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var messageformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! messageformat */ "../../node_modules/messageformat/messageformat.js");
            /* harmony import */ var messageformat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(messageformat__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
            /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/loader/translation-loader.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A HTTP loader that can load translations from some assetUrl.
             */
            var TranslationLoader = /** @class */ (function () {
                /**
                 * Constructs the loader to load resources from the given {\@link assetUrl}.
                 * @param {?} http
                 * @param {?} assetUrl
                 */
                function TranslationLoader(http, assetUrl) {
                    this.http = http;
                    this.assetUrl = assetUrl;
                }
                /**
                 * Returns the translations for the given language that are located at the {\@link assetUrl}.
                 * @param {?} language
                 * @return {?}
                 */
                TranslationLoader.prototype.getTranslation = function (language) {
                    return this.http.get("" + this.assetUrl + TranslationLoader.PREFIX + language + TranslationLoader.SUFFIX);
                };
                /**
                 * Returns the translations for all languages that are located at the {\@link assetUrl}.
                 * @return {?}
                 */
                TranslationLoader.prototype.getCombinedTranslation = function () {
                    return this.http.get(this.assetUrl + "/../i18n" + TranslationLoader.SUFFIX);
                };
                return TranslationLoader;
            }());
            TranslationLoader.PREFIX = '/i18n/';
            TranslationLoader.SUFFIX = '.json';
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/utils/platform-util.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /*
             * Copyright 2017 VMware, Inc. All rights reserved. VMware Confidential
             */
            var PlatformUtil = /** @class */ (function () {
                function PlatformUtil() {
                }
                return PlatformUtil;
            }());
            PlatformUtil.browser = {
                // tslint:disable-next-line: no-string-literal
                isOpera: !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0,
                // tslint:disable-next-line: no-string-literal
                isFirefox: typeof window['InstallTrigger'] !== 'undefined',
                // tslint:disable-next-line: no-string-literal
                isSafari: Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0,
                // tslint:disable-next-line: no-string-literal
                isChrome: !!window['chrome'] && !(!!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0),
                // tslint:disable-next-line: no-string-literal
                isIE: /*@cc_on!@*/ !!document['documentMode'],
            };
            PlatformUtil.os = {
                isMobile: false,
            };
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/service/translation-service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Basic translation service to implement ICU positional interpolation only.
             * @abstract
             */
            var TranslationService = /** @class */ (function () {
                function TranslationService() {
                    /**
                     * Options to format Date.
                     */
                    this.defaultDateFormat = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    };
                    /**
                     * Options to format Time.
                     */
                    this.defaultTimeFormat = {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                    };
                    /**
                     * Options to format Date and Time.
                     */
                    this.defaultDateTimeFormat = Object.assign({}, this.defaultDateFormat, this.defaultTimeFormat);
                }
                return TranslationService;
            }());
            TranslationService.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/pipe/format-date-time-pipe.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * This function modifies the timezone format in the provided date string in order to work in IE11
             *  (ex. from :+0000 to +00:00)
             * @param {?} dateStr The provided date string
             *  (Complete date plus hours, minutes, seconds, a decimal fraction of a second and timezone, YYYY-MM-DDThh:mm:ss.sTZD
             * @return {?} The modified date string
             *  (Complete date plus hours, minutes, seconds, a decimal fraction of a second and timezone YYYY-MM-DDThh:mm:ss.sTZD)
             */
            function formatDateStringToValidFormatForIE(dateStr) {
                if (!PlatformUtil.browser.isIE) {
                    return dateStr;
                }
                // If the format is UTC (Coordinated Universal Time), with a special UTC designator ("Z")
                if (dateStr.substr(-1) === 'Z') {
                    return dateStr;
                }
                // If the timezone format is correct (ex.: +00:00)
                if (dateStr.charAt(dateStr.length - 3) === ':') {
                    return dateStr;
                }
                return dateStr.substr(0, dateStr.length - 2) + ":" + dateStr.substr(-2);
            }
            /**
             * This pipe delegates format of DateTime to the translation service.  However, it also
             * marks itself for re-processing if it detects a translation refresh event.
             */
            var FormatDateTimePipe = /** @class */ (function () {
                /**
                 * @param {?} service
                 */
                function FormatDateTimePipe(service) {
                    this.service = service;
                }
                /**
                 * Pipe the dateTime into the pipe.
                 * @param {?} dateTime dateTime to be formatted
                 * @param {?=} options determinate how date should be formatted
                 * @return {?}
                 */
                FormatDateTimePipe.prototype.transform = function (dateTime, options) {
                    if (!dateTime) {
                        return this.service.formatDateTime(new Date(), options);
                    }
                    if (dateTime instanceof Date) {
                        return this.service.formatDateTime(dateTime, options);
                    }
                    /** @type {?} */
                    var dateString = formatDateStringToValidFormatForIE(dateTime);
                    return this.service.formatDateTime(new Date(dateString), options);
                };
                return FormatDateTimePipe;
            }());
            FormatDateTimePipe.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                            name: 'formatDateTime',
                            pure: true,
                        },] }
            ];
            /** @nocollapse */
            FormatDateTimePipe.ctorParameters = function () { return [
                { type: TranslationService }
            ]; };
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/service/message-format-translation-service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Translation service to implement ICU MessageFormat.
             */
            var MessageFormatTranslationService = /** @class */ (function (_super) {
                __extends(MessageFormatTranslationService, _super);
                /**
                 * @param {?} preferredLocale
                 * @param {?} fallbackLocale
                 * @param {?=} translationLoader
                 * @param {?=} combinedTranslations
                 */
                function MessageFormatTranslationService(preferredLocale, fallbackLocale, translationLoader, combinedTranslations) {
                    var _this = _super.call(this) || this;
                    _this.preferredLocale = preferredLocale;
                    _this.fallbackLocale = fallbackLocale;
                    _this.translationLoader = translationLoader;
                    _this.combinedTranslations = combinedTranslations;
                    _this.translationSet = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
                    return _this;
                }
                /**
                 * Merge translations into registry.
                 * @param {?=} set new translations.
                 * @return {?}
                 */
                MessageFormatTranslationService.prototype.registerTranslations = function (set) {
                    var _this = this;
                    /** @type {?} */
                    var toSet = this.translationSet.value;
                    if (set) {
                        for (var locale in set) {
                            if (set[locale] !== undefined) {
                                if (typeof toSet[locale] === 'undefined') {
                                    toSet[locale] = {};
                                }
                                Object.assign(toSet[locale], set[locale]);
                            }
                        }
                        console.log(toSet);
                        this.translationSet.next(toSet);
                    }
                    else if (this.translationLoader) {
                        /** @type {?} */
                        var subscribable = void 0;
                        if (this.combinedTranslations) {
                            subscribable = this.translationLoader.getCombinedTranslation();
                        }
                        else {
                            subscribable = this.translationLoader
                                .getTranslation(this.preferredLocale)
                                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(( /**
                         * @param {?} translations
                         * @return {?}
                         */function (/**
                         * @param {?} translations
                         * @return {?}
                         */ translations) {
                                var _a;
                                return (_a = {}, _a[_this.preferredLocale] = translations, _a);
                            })));
                        }
                        subscribable.subscribe(( /**
                         * @param {?} translations
                         * @return {?}
                         */function (/**
                         * @param {?} translations
                         * @return {?}
                         */ translations) {
                            if (typeof toSet[_this.preferredLocale] === 'undefined') {
                                toSet[_this.preferredLocale] = {};
                            }
                            Object.assign(toSet[_this.preferredLocale], translations[_this.preferredLocale]);
                            _this.translationSet.next(toSet);
                        }));
                    }
                    else {
                        throw new Error('Need to supply translations!');
                    }
                };
                /**
                 * Translate a key with params.
                 * If the key is missing from the preferred locale, try the fallback locale.
                 * If the key is missing from the fallback locale, returns the key with ? prepended.
                 * Otherwise uses message-format to format the string.
                 * @param {?} key translation key
                 * @param {?=} params array of subsitutions. arrays can be of the form [a, b, c] for positional parameters
                 *      or [{'key1': a, 'key2' b}]
                 * @return {?} translated string.
                 */
                MessageFormatTranslationService.prototype.translate = function (key, params) {
                    /** @type {?} */
                    var paramObject = params ? (params.length ? params[0] : {}) : {};
                    if (paramObject !== null && typeof paramObject === 'object') {
                        // Use the object of parameters
                        return this.translateHelper(key, paramObject, this.translationSet.value);
                    }
                    else {
                        // Use the array of parameters
                        return this.translateHelper(key, params, this.translationSet.value);
                    }
                };
                /**
                 * Translate a key wih params using an observable return.
                 * If te key is missing from the preferred locale, try the fallback locale.
                 * If the key is missing from the fallback locale, returns the key with ? prepended.
                 * Otherwise uses message-format to format the string.
                 * @param {?} key translation key
                 * @param {?=} params array of subsitutions. arrays can be of the form [a, b, c] for positional parameters
                 *      or [{'key1': a, 'key2' b}]
                 * @return {?} an observable of the translated string.
                 */
                MessageFormatTranslationService.prototype.translateAsync = function (key, params) {
                    var _this = this;
                    /** @type {?} */
                    var paramObject = params ? (params.length ? params[0] : {}) : {};
                    if (paramObject !== null && typeof paramObject === 'object') {
                        // Use the object of parameters
                        return this.translationSet.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(( /**
                         * @param {?} translations
                         * @return {?}
                         */function (/**
                         * @param {?} translations
                         * @return {?}
                         */ translations) { return _this.translateHelper(key, paramObject, translations); })));
                    }
                    else {
                        // Use the array of parameters
                        return this.translationSet.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(( /**
                         * @param {?} translations
                         * @return {?}
                         */function (/**
                         * @param {?} translations
                         * @return {?}
                         */ translations) { return _this.translateHelper(key, params, translations); })));
                    }
                };
                /**
                 * @private
                 * @param {?} key
                 * @param {?} params
                 * @param {?} translations
                 * @return {?}
                 */
                MessageFormatTranslationService.prototype.translateHelper = function (key, params, translations) {
                    if (translations[this.preferredLocale] && translations[this.preferredLocale][key]) {
                        return this.formatString(this.preferredLocale, key, params, translations);
                    }
                    else if (translations[this.fallbackLocale] && translations[this.fallbackLocale][key]) {
                        return this.formatString(this.fallbackLocale, key, params, translations);
                    }
                    return '?' + key;
                };
                /**
                 * @private
                 * @param {?} locale
                 * @param {?} key
                 * @param {?} translationMap
                 * @param {?} translations
                 * @return {?}
                 */
                MessageFormatTranslationService.prototype.formatString = function (locale, key, translationMap, translations) {
                    /** @type {?} */
                    var template = translations[locale][key];
                    /** @type {?} */
                    var message = new messageformat__WEBPACK_IMPORTED_MODULE_1___default.a(locale).compile(template);
                    return message(translationMap);
                };
                /**
                 * Use Intl services to format date.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the date string.
                 * If is not set, it will use internal default option for date.
                 * @return {?} formatted date.
                 */
                MessageFormatTranslationService.prototype.formatDate = function (date, options) {
                    if (options) {
                        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                    }
                    return new Intl.DateTimeFormat(this.preferredLocale, this.defaultDateFormat).format(date);
                };
                /**
                 * Use Intl services to format time.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the time string.
                 * If is not set, it will use internal default option for time.
                 * @return {?} formatted time.
                 */
                MessageFormatTranslationService.prototype.formatTime = function (date, options) {
                    if (options) {
                        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                    }
                    return new Intl.DateTimeFormat(this.preferredLocale, this.defaultTimeFormat).format(date);
                };
                /**
                 * Use Intl services to format date and time.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the date and time string.
                 * If is not set, it will use internal default option for date and time.
                 * @return {?} formatted date and time.
                 */
                MessageFormatTranslationService.prototype.formatDateTime = function (date, options) {
                    if (options) {
                        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                    }
                    return new Intl.DateTimeFormat(this.preferredLocale, this.defaultDateTimeFormat).format(date);
                };
                return MessageFormatTranslationService;
            }(TranslationService));
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/utils/tokens.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var BOOTSTRAP_DETAILS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('BOOTSTRAP_DETAILS');
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/pipe/translation-pipe.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * This pipe delegates translation to the translation service.  However, it also
             * marks itself for re-processing if it detects a translation refresh event.
             */
            var TranslationPipe = /** @class */ (function () {
                /**
                 * @param {?} translate
                 * @param {?} changeDetector
                 */
                function TranslationPipe(translate, changeDetector) {
                    this.translate = translate;
                    this.changeDetector = changeDetector;
                    this.value = '';
                    this.lastKey = '';
                    this.lastArgs = [];
                }
                /**
                 * @param {?} key
                 * @param {...?} params
                 * @return {?}
                 */
                TranslationPipe.prototype.transform = function (key) {
                    var params = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        params[_i - 1] = arguments[_i];
                    }
                    /*
                     TODO: As fancy as this is I don't think this function should make an array from the params.
                     If we want to pass a variable length array of strings into this function it's hard to pipe in from a template.
                     Example: {{alert.message.code | translate: alert.message.params}} does not work well here.
                     */
                    if (params && params.length && params[0] instanceof Array) {
                        params = params[0];
                    }
                    if (!key || key.length === 0) {
                        return key;
                    }
                    if (key === this.lastKey && params === this.lastArgs) {
                        return this.value;
                    }
                    this.lastKey = key;
                    this.lastArgs = params;
                    this.updateValue.apply(this, [key].concat(params));
                    return this.value;
                };
                /**
                 * @private
                 * @param {?} key
                 * @param {...?} args
                 * @return {?}
                 */
                TranslationPipe.prototype.updateValue = function (key) {
                    var _this = this;
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    this.translate.translateAsync(key, args).subscribe(( /**
                     * @param {?} result
                     * @return {?}
                     */function (/**
                     * @param {?} result
                     * @return {?}
                     */ result) {
                        _this.value = result;
                        _this.changeDetector.markForCheck();
                    }));
                };
                return TranslationPipe;
            }());
            TranslationPipe.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                            name: 'translate',
                            pure: false,
                        },] }
            ];
            /** @nocollapse */
            TranslationPipe.ctorParameters = function () { return [
                { type: TranslationService },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
            ]; };
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/i18n.module.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /** @type {?} */
            var singletonService = null;
            /**
             * @param {?} details
             * @return {?}
             */
            function genericSingletonFactory(details) {
                if (singletonService === null) {
                    singletonService = new MessageFormatTranslationService(details.locale, 'en');
                }
                return singletonService;
            }
            /**
             * A module that mananges translation capabilites for the application.
             */
            var I18nModule = /** @class */ (function () {
                function I18nModule() {
                }
                /**
                 * Creates a {\@link I18nModule} using the global translation service.
                 * @return {?}
                 */
                I18nModule.forRoot = function () {
                    return {
                        ngModule: I18nModule,
                        providers: [
                            {
                                provide: TranslationService,
                                useFactory: genericSingletonFactory,
                                deps: [BOOTSTRAP_DETAILS],
                            },
                        ],
                    };
                };
                /**
                 * Creates a {\@link I18nModule} using a service that is independent from all other services.
                 * @param {?=} extensionRoute the route translations are located at.
                 * @param {?=} combined if the translations are in one file or many different files.
                 * @return {?}
                 */
                I18nModule.forChild = function (extensionRoute, combined) {
                    /**
                     * An implementation of {\@link TranslationService} that can inject all of its dependencies.
                     */
                    var ServiceToUse = /** @class */ (function (_super) {
                        __extends(ServiceToUse, _super);
                        /**
                         * @param {?} details
                         * @param {?} loader
                         */
                        function ServiceToUse(details, loader) {
                            return _super.call(this, details.locale, 'en', loader, combined) || this;
                        }
                        return ServiceToUse;
                    }(MessageFormatTranslationService));
                    /** @nocollapse */
                    ServiceToUse.ctorParameters = function () { return [
                        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [BOOTSTRAP_DETAILS,] }] },
                        { type: TranslationLoader, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] }
                    ]; };
                    /** @type {?} */
                    var providers = [
                        {
                            provide: TranslationService,
                            useClass: ServiceToUse,
                        },
                    ];
                    // Provide the translation loader if the user provides a URL where the translations should be loaded from.
                    if (extensionRoute) {
                        providers.push({
                            provide: TranslationLoader,
                            useFactory: ( /**
                             * @param {?} client
                             * @param {?} route
                             * @return {?}
                             */function (client, route) {
                                return new TranslationLoader(client, route);
                            }),
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], extensionRoute],
                        });
                    }
                    return {
                        ngModule: I18nModule,
                        providers: providers,
                    };
                };
                return I18nModule;
            }());
            I18nModule.decorators = [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                            declarations: [TranslationPipe, FormatDateTimePipe],
                            exports: [FormatDateTimePipe, TranslationPipe],
                        },] }
            ];
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/service/basic-translation-service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            /**
             * Interpolate a translation using regex.
             * @param {?} translation the translation to use with positional interpolation points in braces -
             *                    e.g. 'Hello there, {0}.  My name is {1}.'
             * @param {?} params array of interpolations, e.g. ['Brad', 'Janet']
             * @return {?} the interpolated string, e.g. 'Hello there, Brad.  My name is Janet.'
             */
            function interpolate(translation, params) {
                params = params || [];
                return translation.replace(/{([0-9]+)}/g, ( /**
                 * @param {?} _
                 * @param {...?} n
                 * @return {?}
                 */function (_) {
                    var n = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        n[_i - 1] = arguments[_i];
                    }
                    /** @type {?} */
                    var idx = parseInt(n[0], 10);
                    if (params && params[idx]) {
                        return params[idx];
                    }
                    return '';
                }));
            }
            /**
             * Basic translation service to implement ICU positional interpolation only.
             */
            var BasicTranslationService = /** @class */ (function (_super) {
                __extends(BasicTranslationService, _super);
                /**
                 * @param {?} preferredLocale
                 * @param {?} fallbackLocale
                 */
                function BasicTranslationService(preferredLocale, fallbackLocale) {
                    var _this = _super.call(this) || this;
                    _this.preferredLocale = preferredLocale;
                    _this.fallbackLocale = fallbackLocale;
                    _this.translationSet = {};
                    return _this;
                }
                /**
                 * Merge translations into registry.
                 * @param {?} set new translations.
                 * @return {?}
                 */
                BasicTranslationService.prototype.registerTranslations = function (set) {
                    for (var locale in set) {
                        if (set[locale] !== undefined) {
                            if (typeof this.translationSet[locale] === 'undefined') {
                                this.translationSet[locale] = {};
                            }
                            Object.assign(this.translationSet[locale], set[locale]);
                        }
                    }
                };
                /**
                 * Translate a key with params.
                 * If the key is missing from the preferred locale, try the fallback locale.
                 * If the key is missing from the fallback locale, returns the key with ? prepended.
                 * Otherwise interpolates the template.
                 * @param {?} key translation key
                 * @param {?=} params array of subsitutions.
                 * @return {?} translated string.
                 */
                BasicTranslationService.prototype.translate = function (key, params) {
                    /** @type {?} */
                    var template = this.translationSet[this.preferredLocale][key] || this.translationSet[this.fallbackLocale][key];
                    if (template) {
                        return interpolate(template, params);
                    }
                    return '?' + key;
                };
                /**
                 * @param {?} key
                 * @param {?=} params
                 * @return {?}
                 */
                BasicTranslationService.prototype.translateAsync = function (key, params) {
                    return new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this.translate(key, params));
                };
                /**
                 * Use Intl services to format date.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the date string.
                 * If is not set, it will use internal default option for date.
                 * @return {?} formatted date.
                 */
                BasicTranslationService.prototype.formatDate = function (date, options) {
                    if (options === void 0) { options = this.defaultDateFormat; }
                    return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                };
                /**
                 * Use Intl services to format time.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the time string.
                 * If is not set, it will use internal default option for time.
                 * @return {?} formatted time.
                 */
                BasicTranslationService.prototype.formatTime = function (date, options) {
                    if (options === void 0) { options = this.defaultTimeFormat; }
                    return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                };
                /**
                 * Use Intl services to format date and time.
                 * @param {?} date date to format
                 * @param {?=} options to specify the format of the date and time string.
                 * If is not set, it will use internal default default option for date and time.
                 * @return {?} formatted date and time.
                 */
                BasicTranslationService.prototype.formatDateTime = function (date, options) {
                    if (options === void 0) { options = this.defaultDateTimeFormat; }
                    return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
                };
                return BasicTranslationService;
            }(TranslationService));
            /**
             * @fileoverview added by tsickle
             * Generated from: lib/service/mock-translation-service.ts
             * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
             */
            var MockTranslationService = /** @class */ (function (_super) {
                __extends(MockTranslationService, _super);
                function MockTranslationService() {
                    return _super.call(this) || this;
                }
                /**
                 * @param {?} set
                 * @return {?}
                 */
                MockTranslationService.prototype.registerTranslations = function (set) { };
                Object.defineProperty(MockTranslationService.prototype, "activeLocale", {
                    /**
                     * @return {?}
                     */
                    get: function () {
                        return this.preferredLocale;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * @param {?} key
                 * @param {?=} params
                 * @return {?}
                 */
                MockTranslationService.prototype.translate = function (key, params) {
                    return JSON.stringify({ key: key, params: params });
                };
                /**
                 * @param {?} key
                 * @param {?=} params
                 * @return {?}
                 */
                MockTranslationService.prototype.translateAsync = function (key, params) {
                    return new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](this.translate(key, params));
                };
                /**
                 * @param {?} date
                 * @return {?}
                 */
                MockTranslationService.prototype.formatDate = function (date) {
                    return date.toLocaleString();
                };
                /**
                 * @param {?} date
                 * @return {?}
                 */
                MockTranslationService.prototype.formatTime = function (date) {
                    return date.toLocaleString();
                };
                /**
                 * @param {?} date
                 * @return {?}
                 */
                MockTranslationService.prototype.formatDateTime = function (date) {
                    return date.toLocaleString();
                };
                return MockTranslationService;
            }(TranslationService));
            //# sourceMappingURL=vcd-i18n.js.map
            /***/ 
        }),
        /***/ "../../node_modules/raw-loader/dist/cjs.js!../components/src/cliptext/cliptext.component.html": 
        /*!************************************************************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/node_modules/raw-loader/dist/cjs.js!../components/src/cliptext/cliptext.component.html ***!
          \************************************************************************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<clr-tooltip>\n    <div #cliptextContainer clrTooltipTrigger class=\"cliptext-container text-truncate\" [ngClass]=\"{ inline: isInline }\">\n        <ng-content></ng-content>\n    </div>\n    <clr-tooltip-content aria-hidden=\"true\" *clrIfOpen [clrPosition]=\"tooltipPosition\" [clrSize]=\"size\">\n        <span>{{ tooltipText }}</span>\n    </clr-tooltip-content>\n</clr-tooltip>\n");
            /***/ 
        }),
        /***/ "../../node_modules/raw-loader/dist/cjs.js!../components/src/data-exporter/data-exporter.component.html": 
        /*!**********************************************************************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/node_modules/raw-loader/dist/cjs.js!../components/src/data-exporter/data-exporter.component.html ***!
          \**********************************************************************************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<clr-modal [clrModalOpen]=\"open\" (clrModalOpenChange)=\"openChange.emit($event)\" [clrModalSize]=\"'sm'\" #modal>\n    <h3 class=\"modal-title\">{{ dialogHeader || ('data-exporter.title' | translate) }}</h3>\n    <div class=\"modal-body\">\n        <button\n            *ngIf=\"showSelectAll\"\n            class=\"btn btn-sm btn-link select-all\"\n            type=\"button\"\n            (click)=\"onClickCheckAll()\"\n            [disabled]=\"!isSelectAllEnabled\"\n        >\n            {{ selectAllText || ('select.all' | translate) }}\n        </button>\n        <ul class=\"list-unstyled column-selection\" [formGroup]=\"formGroup\">\n            <li *ngFor=\"let col of columns\">\n                <clr-checkbox-wrapper>\n                    <input type=\"checkbox\" clrCheckbox [formControlName]=\"col.fieldName\" />\n                    <label>{{ col.displayName }}</label>\n                </clr-checkbox-wrapper>\n            </li>\n        </ul>\n        <div class=\"progress\" [ngClass]=\"{ loop: progress == -1, pending: isRequestPending }\">\n            <progress max=\"100\" value=\"{{ progress * 100 }}\"></progress>\n        </div>\n    </div>\n    <hr />\n\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-outline cancel\" (click)=\"open = false\">\n            {{ cancelText || ('cancel' | translate) }}\n        </button>\n        <button type=\"button\" class=\"btn btn-primary export\" [disabled]=\"!isExportEnabled\" (click)=\"onClickExport()\">\n            {{ exportText || ('export' | translate) }}\n        </button>\n    </div>\n</clr-modal>\n");
            /***/ 
        }),
        /***/ "../../node_modules/raw-loader/dist/cjs.js!../components/src/datagrid/datagrid.component.html": 
        /*!************************************************************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/node_modules/raw-loader/dist/cjs.js!../components/src/datagrid/datagrid.component.html ***!
          \************************************************************************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<clr-datagrid [clrDgLoading]=\"isLoading\" [ngClass]=\"this.clrDatagridCssClass\" (clrDgRefresh)=\"gridStateChanged($event)\">\n    <clr-dg-column\n        *ngFor=\"let column of columnsConfig\"\n        [clrDgField]=\"column.queryFieldName\"\n        (clrDgSortOrderChange)=\"resetToPageOne()\"\n    >\n        <ng-container *ngIf=\"isColumnHideable(column); else notHideable\">\n            <ng-container *clrDgHideableColumn=\"{ hidden: column.hideable === GridColumnHideable.Hidden }\">{{\n                column.displayName\n            }}</ng-container>\n        </ng-container>\n        <ng-template #notHideable>{{ column.displayName }}</ng-template>\n    </clr-dg-column>\n\n    <clr-dg-row\n        *ngFor=\"let restItem of items; let i = index\"\n        [ngForTrackBy]=\"trackBy\"\n        [ngClass]=\"this.clrDatarowCssClassGetter(restItem, i)\"\n        [clrDgItem]=\"restItem\"\n    >\n        <clr-dg-cell *ngFor=\"let column of columnsConfig\">\n            <!-- Default renderer -->\n            <ng-container *ngIf=\"column.fieldName\">{{ restItem | nestedProperty: column.fieldName }}</ng-container>\n\n            <!-- Renderer is a function -->\n            <ng-container *ngIf=\"column.fieldRenderer\">{{\n                restItem | functionRenderer: column.fieldRenderer\n            }}</ng-container>\n\n            <!-- Renderer is a componentRenderer -->\n            <ng-template\n                *ngIf=\"column.fieldColumnRendererSpec\"\n                [vcdComponentRendererOutlet]=\"{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }\"\n            >\n            </ng-template>\n        </clr-dg-cell>\n        <ng-container ngProjectAs=\"clr-dg-row-detail\" *ngIf=\"detailTemplate !== undefined\">\n            <clr-dg-row-detail *clrIfExpanded>\n                <ng-content *ngTemplateOutlet=\"detailTemplate; context: { record: restItem }\"> </ng-content>\n            </clr-dg-row-detail>\n        </ng-container>\n    </clr-dg-row>\n    <clr-dg-row *ngIf=\"sameItemsAsPageSize()\"> </clr-dg-row>\n\n    <clr-dg-footer>\n        <clr-dg-pagination #paginationData [clrDgTotalItems]=\"totalItems\" [(clrDgPageSize)]=\"this.pagination.pageSize\">\n            <clr-dg-page-size [clrPageSizeOptions]=\"this.pagination.pageSizeOptions\">{{\n                paginationDropdownText\n            }}</clr-dg-page-size>\n            {{ paginationCallbackWrapper(paginationData) }}\n        </clr-dg-pagination>\n    </clr-dg-footer>\n</clr-datagrid>\n");
            /***/ 
        }),
        /***/ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html": 
        /*!**************************************************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
          \**************************************************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<clr-main-container>\n    <clr-header class=\"header-6\">\n        <div class=\"branding\">\n            <a routerLink=\"/\" class=\"nav-nlink\">\n                <clr-icon shape=\"vm-bug\"></clr-icon>\n                <span class=\"title\">{{ 'app.title' | translate }}</span>\n            </a>\n        </div>\n    </clr-header>\n\n    <div class=\"content-container\">\n        <nav class=\"sidenav\" [clr-nav-level]=\"2\">\n            <section class=\"sidenav-content\">\n                <section class=\"nav-group\">\n                    <label>Components</label>\n                    <ul class=\"nav-list\">\n                        <ng-container *ngFor=\"let entry of sideNavEntries\">\n                            <li>\n                                <a class=\"nav-link\" [routerLink]=\"entry.path\" [routerLinkActive]=\"['active']\">\n                                    {{ entry.title }}\n                                </a>\n                            </li>\n                        </ng-container>\n                    </ul>\n                </section>\n            </section>\n        </nav>\n\n        <main class=\"content-area\">\n            <router-outlet></router-outlet>\n        </main>\n    </div>\n</clr-main-container>\n");
            /***/ 
        }),
        /***/ "../../node_modules/tslib/tslib.es6.js": 
        /*!*****************************************************************************************************!*\
          !*** /home/travis/build/vmware/vmware-cloud-director-ui-components/node_modules/tslib/tslib.es6.js ***!
          \*****************************************************************************************************/
        /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function () { return __extends; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function () { return __assign; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function () { return __rest; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function () { return __decorate; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function () { return __param; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function () { return __metadata; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function () { return __awaiter; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function () { return __generator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function () { return __exportStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function () { return __values; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function () { return __read; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function () { return __spread; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () { return __spreadArrays; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function () { return __await; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () { return __asyncGenerator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () { return __asyncDelegator; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function () { return __asyncValues; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () { return __makeTemplateObject; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function () { return __importStar; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function () { return __importDefault; });
            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0
            
            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.
            
            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b)
                        if (b.hasOwnProperty(p))
                            d[p] = b[p]; };
                return extendStatics(d, b);
            };
            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            var __assign = function () {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s)
                            if (Object.prototype.hasOwnProperty.call(s, p))
                                t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            function __rest(s, e) {
                var t = {};
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                        t[p] = s[p];
                if (s != null && typeof Object.getOwnPropertySymbols === "function")
                    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                            t[p[i]] = s[p[i]];
                    }
                return t;
            }
            function __decorate(decorators, target, key, desc) {
                var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                    r = Reflect.decorate(decorators, target, key, desc);
                else
                    for (var i = decorators.length - 1; i >= 0; i--)
                        if (d = decorators[i])
                            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }
            function __param(paramIndex, decorator) {
                return function (target, key) { decorator(target, key, paramIndex); };
            }
            function __metadata(metadataKey, metadataValue) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
                    return Reflect.metadata(metadataKey, metadataValue);
            }
            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try {
                        step(generator.next(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function rejected(value) { try {
                        step(generator["throw"](value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }
            function __generator(thisArg, body) {
                var _ = { label: 0, sent: function () { if (t[0] & 1)
                        throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [op[0] & 2, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return { value: op[1], done: false };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        }
                        catch (e) {
                            op = [6, e];
                            y = 0;
                        }
                        finally {
                            f = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return { value: op[0] ? op[1] : void 0, done: true };
                }
            }
            function __exportStar(m, exports) {
                for (var p in m)
                    if (!exports.hasOwnProperty(p))
                        exports[p] = m[p];
            }
            function __values(o) {
                var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
                if (m)
                    return m.call(o);
                return {
                    next: function () {
                        if (o && i >= o.length)
                            o = void 0;
                        return { value: o && o[i++], done: !o };
                    }
                };
            }
            function __read(o, n) {
                var m = typeof Symbol === "function" && o[Symbol.iterator];
                if (!m)
                    return o;
                var i = m.call(o), r, ar = [], e;
                try {
                    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                        ar.push(r.value);
                }
                catch (error) {
                    e = { error: error };
                }
                finally {
                    try {
                        if (r && !r.done && (m = i["return"]))
                            m.call(i);
                    }
                    finally {
                        if (e)
                            throw e.error;
                    }
                }
                return ar;
            }
            function __spread() {
                for (var ar = [], i = 0; i < arguments.length; i++)
                    ar = ar.concat(__read(arguments[i]));
                return ar;
            }
            function __spreadArrays() {
                for (var s = 0, i = 0, il = arguments.length; i < il; i++)
                    s += arguments[i].length;
                for (var r = Array(s), k = 0, i = 0; i < il; i++)
                    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                        r[k] = a[j];
                return r;
            }
            ;
            function __await(v) {
                return this instanceof __await ? (this.v = v, this) : new __await(v);
            }
            function __asyncGenerator(thisArg, _arguments, generator) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var g = generator.apply(thisArg, _arguments || []), i, q = [];
                return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
                function verb(n) { if (g[n])
                    i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
                function resume(n, v) { try {
                    step(g[n](v));
                }
                catch (e) {
                    settle(q[0][3], e);
                } }
                function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                function fulfill(value) { resume("next", value); }
                function reject(value) { resume("throw", value); }
                function settle(f, v) { if (f(v), q.shift(), q.length)
                    resume(q[0][0], q[0][1]); }
            }
            function __asyncDelegator(o) {
                var i, p;
                return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
            }
            function __asyncValues(o) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var m = o[Symbol.asyncIterator], i;
                return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
            }
            function __makeTemplateObject(cooked, raw) {
                if (Object.defineProperty) {
                    Object.defineProperty(cooked, "raw", { value: raw });
                }
                else {
                    cooked.raw = raw;
                }
                return cooked;
            }
            ;
            function __importStar(mod) {
                if (mod && mod.__esModule)
                    return mod;
                var result = {};
                if (mod != null)
                    for (var k in mod)
                        if (Object.hasOwnProperty.call(mod, k))
                            result[k] = mod[k];
                result.default = mod;
                return result;
            }
            function __importDefault(mod) {
                return (mod && mod.__esModule) ? mod : { default: mod };
            }
            /***/ 
        }),
        /***/ "../components/src/cliptext/cliptext.component.scss": 
        /*!**********************************************************!*\
          !*** ../components/src/cliptext/cliptext.component.scss ***!
          \**********************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (":host(.inline) {\n  display: inline-block;\n  vertical-align: middle;\n}\n\nclr-tooltip {\n  display: block;\n}\n\nclr-tooltip .text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC92bXdhcmUvdm13YXJlLWNsb3VkLWRpcmVjdG9yLXVpLWNvbXBvbmVudHMvcHJvamVjdHMvY29tcG9uZW50cy9zcmMvY2xpcHRleHQvY2xpcHRleHQuY29tcG9uZW50LnNjc3MiLCJwcm9qZWN0cy9jb21wb25lbnRzL3NyYy9jbGlwdGV4dC9jbGlwdGV4dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0VBQ0Esc0JBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7QUNDSjs7QURDSTtFQUNJLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQ0NSIiwiZmlsZSI6InByb2plY3RzL2NvbXBvbmVudHMvc3JjL2NsaXB0ZXh0L2NsaXB0ZXh0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QoLmlubGluZSkge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG5jbHItdG9vbHRpcCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG5cbiAgICAudGV4dC10cnVuY2F0ZSB7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cbn1cbiIsIjpob3N0KC5pbmxpbmUpIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG5jbHItdG9vbHRpcCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuY2xyLXRvb2x0aXAgLnRleHQtdHJ1bmNhdGUge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn0iXX0= */");
            /***/ 
        }),
        /***/ "../components/src/cliptext/cliptext.component.ts": 
        /*!********************************************************!*\
          !*** ../components/src/cliptext/cliptext.component.ts ***!
          \********************************************************/
        /*! exports provided: Position, CliptextComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function () { return Position; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextComponent", function () { return CliptextComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var Position;
            (function (Position) {
                Position["TOP"] = "TOP";
                Position["BOTTOM"] = "BOTTOM";
                Position["BEFORE"] = "BEFORE";
                Position["AFTER"] = "AFTER";
            })(Position || (Position = {}));
            /**
             * Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user
             * the ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility
             * should be taken into account.
             *
             * Example: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content
             * on multiple lines or show as much text as it can fit in one line, showing ellipses ('...') at the end to denote that
             * there is still more content and on hover over to display the full content.
             *
             * The current implementation is based on clarity tooltip component, where the tooltip is available only
             * if clipping has occurred.
             */
            var CliptextComponent = /** @class */ (function () {
                function CliptextComponent(changeDetector) {
                    this.changeDetector = changeDetector;
                    this._inline = false;
                    this._size = 'md';
                    this._tooltipPosition = 'top-right';
                }
                Object.defineProperty(CliptextComponent.prototype, "position", {
                    /**
                     * Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.
                     * Some of the reasons to avoid it are:
                     *  - Clarity will introduce smart positioning '[NG] Smart Popover Component #2923'
                     *  - Future versions may go with different implementation so position may become irrelevant
                     */
                    set: function (position) {
                        switch (position) {
                            // Since we use only LTR languages, the mapping is:
                            // BEFORE->left, AFTER->right, default->'top-right'
                            // If we introduce RTL languages the mapping should be:
                            // BEFORE->right, AFTER->left, default->'top-left'
                            case Position.TOP:
                                this._tooltipPosition = 'top-right';
                                break;
                            case Position.BOTTOM:
                                this._tooltipPosition = 'bottom-right';
                                break;
                            case Position.BEFORE:
                                this._tooltipPosition = 'left';
                                break;
                            case Position.AFTER:
                                this._tooltipPosition = 'right';
                                break;
                            default:
                                this._tooltipPosition = 'top-right';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "inlineWidth", {
                    /**
                     * Whether the tooltip should take up a block, or be inline within text
                     *
                     * If its value is falsy (default), it will be displayed as a block (take up the parent's width).
                     * Otherwise, it should be a CSS string to be used as its max-width;
                     */
                    set: function (width) {
                        this._inline = width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "isInline", {
                    get: function () {
                        return !!this._inline;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "maxWidth", {
                    get: function () {
                        return this._inline || '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "size", {
                    /**
                     * Same as Clarity tooltip sizes (xs, sm, md, lg) but currently only the default one (md) is used
                     */
                    get: function () {
                        return this._size;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipPosition", {
                    get: function () {
                        return this._tooltipPosition;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipText", {
                    get: function () {
                        return this._tooltipText;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CliptextComponent.prototype, "tooltipContent", {
                    set: function (tooltipContent) {
                        if (!tooltipContent) {
                            return;
                        }
                        if (!this.isOverflowing()) {
                            this.clrIfOpen.open = false;
                        }
                        else {
                            // Check if the tooltip text has changed
                            var tooltipText = this.cliptextContainer.nativeElement.textContent;
                            if (this._tooltipText !== tooltipText) {
                                this._tooltipText = tooltipText;
                                // Re-trigger open so that clarity tooltip is positioned correctly
                                this.clrIfOpen.open = false;
                                this.clrIfOpen.open = true;
                                this.changeDetector.detectChanges();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                CliptextComponent.prototype.ngAfterViewInit = function () {
                    this._tooltipText = this.cliptextContainer.nativeElement.textContent;
                };
                CliptextComponent.prototype.isOverflowing = function () {
                    return isTextOverflowing(this.cliptextContainer.nativeElement);
                    // Text overflows when the content element's width is less than its scrollWidth.
                    function isTextOverflowing(el) {
                        return Math.ceil(el.getBoundingClientRect().width) < el.scrollWidth;
                    }
                };
                return CliptextComponent;
            }());
            CliptextComponent.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
            ]; };
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], CliptextComponent.prototype, "position", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], CliptextComponent.prototype, "inlineWidth", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.inline')
            ], CliptextComponent.prototype, "isInline", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('style.maxWidth')
            ], CliptextComponent.prototype, "maxWidth", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('cliptextContainer', { static: true })
            ], CliptextComponent.prototype, "cliptextContainer", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrIfOpen"], { static: true })
            ], CliptextComponent.prototype, "clrIfOpen", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrTooltipContent"], { static: false })
            ], CliptextComponent.prototype, "tooltipContent", null);
            CliptextComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-cliptext',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./cliptext.component.html */ "../../node_modules/raw-loader/dist/cjs.js!../components/src/cliptext/cliptext.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./cliptext.component.scss */ "../components/src/cliptext/cliptext.component.scss")).default]
                })
            ], CliptextComponent);
            /***/ 
        }),
        /***/ "../components/src/cliptext/cliptext.module.ts": 
        /*!*****************************************************!*\
          !*** ../components/src/cliptext/cliptext.module.ts ***!
          \*****************************************************/
        /*! exports provided: CliptextModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextModule", function () { return CliptextModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _cliptext_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cliptext.component */ "../components/src/cliptext/cliptext.component.ts");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CliptextModule = /** @class */ (function () {
                function CliptextModule() {
                }
                return CliptextModule;
            }());
            CliptextModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_cliptext_component__WEBPACK_IMPORTED_MODULE_3__["CliptextComponent"]],
                    exports: [_cliptext_component__WEBPACK_IMPORTED_MODULE_3__["CliptextComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"]],
                })
            ], CliptextModule);
            /***/ 
        }),
        /***/ "../components/src/cliptext/index.ts": 
        /*!*******************************************!*\
          !*** ../components/src/cliptext/index.ts ***!
          \*******************************************/
        /*! exports provided: CliptextModule, Position, CliptextComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _cliptext_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cliptext.module */ "../components/src/cliptext/cliptext.module.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CliptextModule", function () { return _cliptext_module__WEBPACK_IMPORTED_MODULE_1__["CliptextModule"]; });
            /* harmony import */ var _cliptext_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cliptext.component */ "../components/src/cliptext/cliptext.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function () { return _cliptext_component__WEBPACK_IMPORTED_MODULE_2__["Position"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CliptextComponent", function () { return _cliptext_component__WEBPACK_IMPORTED_MODULE_2__["CliptextComponent"]; });
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /***/ 
        }),
        /***/ "../components/src/common/pipes/nested-property.pipe.ts": 
        /*!**************************************************************!*\
          !*** ../components/src/common/pipes/nested-property.pipe.ts ***!
          \**************************************************************/
        /*! exports provided: NestedPropertyPipe */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedPropertyPipe", function () { return NestedPropertyPipe; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var OBJECT_PROPERTY_SEPARATOR = '.';
            var DATE_OBJECT_CLASS = '[object Date]';
            /**
             * Used for extracting the value of nested property of an object.
             *
             * Example:
             * const obj = {
             *     a: {
             *         b: {
             *             c: 'c'
             *         }
             *     }
             * }
             *
             * Invoking `{{ obj | nestedProperty: 'a.b.c' }}` in a template produces c
             */
            var NestedPropertyPipe = /** @class */ (function () {
                function NestedPropertyPipe(localeId) {
                    this.localeId = localeId;
                }
                NestedPropertyPipe.prototype.transform = function (item, property) {
                    if (!item || !property) {
                        return null;
                    }
                    var splitProperty = property.split(OBJECT_PROPERTY_SEPARATOR);
                    var returnValue;
                    if (splitProperty.length > 1) {
                        var value = item;
                        for (var _i = 0, splitProperty_2 = splitProperty; _i < splitProperty_2.length; _i++) {
                            var nestedProp = splitProperty_2[_i];
                            if (isNullOrUndefined(value) || isNullOrUndefined(value[nestedProp])) {
                                return null;
                            }
                            value = value[nestedProp];
                        }
                        returnValue = value;
                    }
                    else {
                        if (isNullOrUndefined(item[property])) {
                            return null;
                        }
                        returnValue = item[property];
                    }
                    if (typeof returnValue === 'number') {
                        return new _angular_common__WEBPACK_IMPORTED_MODULE_2__["DecimalPipe"](this.localeId).transform(returnValue);
                    }
                    return returnValue instanceof Date ? new _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"](this.localeId).transform(returnValue) : returnValue;
                };
                return NestedPropertyPipe;
            }());
            NestedPropertyPipe.ctorParameters = function () { return [
                { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"],] }] }
            ]; };
            NestedPropertyPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
                    name: 'nestedProperty',
                    pure: true,
                }),
                tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"]))
            ], NestedPropertyPipe);
            /**
             * Utility method for covering the 'null' and 'undefined' checks as 'value == null' is equivalent to 'value === null || value === undefined'
             */
            function isNullOrUndefined(value) {
                return value == null;
            }
            /***/ 
        }),
        /***/ "../components/src/common/pipes/pipes.module.ts": 
        /*!******************************************************!*\
          !*** ../components/src/common/pipes/pipes.module.ts ***!
          \******************************************************/
        /*! exports provided: PipesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipesModule", function () { return PipesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _nested_property_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nested-property.pipe */ "../components/src/common/pipes/nested-property.pipe.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var declarations = [_nested_property_pipe__WEBPACK_IMPORTED_MODULE_2__["NestedPropertyPipe"]];
            var PipesModule = /** @class */ (function () {
                function PipesModule() {
                }
                return PipesModule;
            }());
            PipesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: declarations,
                    exports: declarations.slice(),
                })
            ], PipesModule);
            /***/ 
        }),
        /***/ "../components/src/components.module.ts": 
        /*!**********************************************!*\
          !*** ../components/src/components.module.ts ***!
          \**********************************************/
        /*! exports provided: ComponentsModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function () { return ComponentsModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _data_exporter_data_exporter_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-exporter/data-exporter.module */ "../components/src/data-exporter/data-exporter.module.ts");
            /* harmony import */ var _datagrid_datagrid_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datagrid/datagrid.module */ "../components/src/datagrid/datagrid.module.ts");
            /* harmony import */ var _cliptext_cliptext_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cliptext/cliptext.module */ "../components/src/cliptext/cliptext.module.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var ComponentsModule = /** @class */ (function () {
                function ComponentsModule() {
                }
                return ComponentsModule;
            }());
            ComponentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_data_exporter_data_exporter_module__WEBPACK_IMPORTED_MODULE_2__["DataExporterModule"], _datagrid_datagrid_module__WEBPACK_IMPORTED_MODULE_3__["DatagridModule"], _cliptext_cliptext_module__WEBPACK_IMPORTED_MODULE_4__["CliptextModule"]],
                    exports: [_data_exporter_data_exporter_module__WEBPACK_IMPORTED_MODULE_2__["DataExporterModule"], _datagrid_datagrid_module__WEBPACK_IMPORTED_MODULE_3__["DatagridModule"], _cliptext_cliptext_module__WEBPACK_IMPORTED_MODULE_4__["CliptextModule"]],
                })
            ], ComponentsModule);
            /***/ 
        }),
        /***/ "../components/src/data-exporter/csv-exporter.service.ts": 
        /*!***************************************************************!*\
          !*** ../components/src/data-exporter/csv-exporter.service.ts ***!
          \***************************************************************/
        /*! exports provided: CsvExporterService */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CsvExporterService", function () { return CsvExporterService; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CsvExporterService = /** @class */ (function () {
                /**
                 * Encodes a data set to be downloaded as a CSV
                 */
                function CsvExporterService() {
                }
                /**
                 * Creates a string that can be used to create a Blob for a CSV
                 * @param rows 2D array of data. First row is the names for the fields
                 */
                CsvExporterService.prototype.createCsv = function (rows) {
                    return rows.map(function (row) { return processRow(row); }).join('\n');
                };
                /**
                 * Does a client side download
                 * @param csvFile The string contents of a CSV file to be downloaded
                 * @param filename The name of the file to be downloaded
                 */
                CsvExporterService.prototype.downloadCsvFile = function (csvFile, filename) {
                    var mimeType = 'text/csv;charset=utf-8;';
                    var blob = new Blob([csvFile], { type: mimeType });
                    // Jan 1, 2020 - Chrome and IE support this
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(blob, filename);
                    }
                    else {
                        var link = document.createElement('a');
                        var url = URL.createObjectURL(blob);
                        link.setAttribute('href', url);
                        link.setAttribute('download', filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                };
                return CsvExporterService;
            }());
            CsvExporterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
                    providedIn: 'root',
                })
                /**
                 * Encodes a data set to be downloaded as a CSV
                 */
            ], CsvExporterService);
            /**
             * Returns a string
             * @param row A list of cells to be turned into a CSV string, separated by commas
             */
            function processRow(row) {
                return row.map(function (cell) { return encodeValue(cell); }).join(',');
            }
            /**
             * Returns a cell's cellValue encoded against spaces, quotes, and CSV injection character
             * @param cellValue Cell cellValue to be encoded
             */
            function encodeValue(cellValue) {
                var innerValue = cellValue == null ? '' : cellValue.toString();
                if (cellValue instanceof Date) {
                    innerValue = cellValue.toLocaleString();
                }
                // Double quotes are doubled
                var result = innerValue.replace(/"/g, '""');
                // TODO: See https://jira.eng.vmware.com/browse/VDUCC-59
                // result = escapeAgainstCsvInjection(result);
                // Add quotes around the whole thing if it contains new lines
                if (result.search(/[",\n]/g) >= 0) {
                    result = "\"" + result + "\"";
                }
                // Escape against
                return result;
            }
            /**
             * TODO: See https://jira.eng.vmware.com/browse/VDUCC-59
             * Prepends a single quote to a value if it starts with =,+,=,@ to prevent formulas from being executed
             * @param value Value to be escaped
             */
            // function escapeAgainstCsvInjection(value: string): string {
            //     if (/^[=+\-@|%]/.test(value)) {
            //         return `'${value}'`;
            //     }
            //     return value;
            // }
            /***/ 
        }),
        /***/ "../components/src/data-exporter/data-exporter.component.scss": 
        /*!********************************************************************!*\
          !*** ../components/src/data-exporter/data-exporter.component.scss ***!
          \********************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("div.progress {\n  visibility: hidden;\n}\ndiv.progress.pending {\n  visibility: visible;\n}\nbutton.select-all {\n  margin: 0;\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC92bXdhcmUvdm13YXJlLWNsb3VkLWRpcmVjdG9yLXVpLWNvbXBvbmVudHMvcHJvamVjdHMvY29tcG9uZW50cy9zcmMvZGF0YS1leHBvcnRlci9kYXRhLWV4cG9ydGVyLmNvbXBvbmVudC5zY3NzIiwicHJvamVjdHMvY29tcG9uZW50cy9zcmMvZGF0YS1leHBvcnRlci9kYXRhLWV4cG9ydGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUNDSjtBRENJO0VBQ0ksbUJBQUE7QUNDUjtBREVBO0VBQ0ksU0FBQTtFQUNBLFVBQUE7QUNDSiIsImZpbGUiOiJwcm9qZWN0cy9jb21wb25lbnRzL3NyYy9kYXRhLWV4cG9ydGVyL2RhdGEtZXhwb3J0ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYucHJvZ3Jlc3Mge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcblxuICAgICYucGVuZGluZyB7XG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgfVxufVxuYnV0dG9uLnNlbGVjdC1hbGwge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xufVxuIiwiZGl2LnByb2dyZXNzIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuZGl2LnByb2dyZXNzLnBlbmRpbmcge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuXG5idXR0b24uc2VsZWN0LWFsbCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn0iXX0= */");
            /***/ 
        }),
        /***/ "../components/src/data-exporter/data-exporter.component.ts": 
        /*!******************************************************************!*\
          !*** ../components/src/data-exporter/data-exporter.component.ts ***!
          \******************************************************************/
        /*! exports provided: DataExporterComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterComponent", function () { return DataExporterComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _csv_exporter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./csv-exporter.service */ "../components/src/data-exporter/csv-exporter.service.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A dialog to export data
             *
             *  - Allows the UI to select columns to be exported
             *  - Provides a progress indicator
             *  - Converts the data that is fetched by the caller into a CSV
             */
            var DataExporterComponent = /** @class */ (function () {
                function DataExporterComponent(csvExporterService) {
                    this.csvExporterService = csvExporterService;
                    /**
                     * List of columns that can be exported, user may deselect some before sending the download request
                     */
                    this.columns = [];
                    /**
                     * The name of the file to be downloaded
                     */
                    this.fileName = 'data-export.csv';
                    /**
                     * Whether a box to select/deselect all rows is available
                     */
                    this.showSelectAll = true;
                    this._open = false;
                    /**
                     * Fires when {@link _open} changes. Its parameter indicates the new state.
                     */
                    this.openChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
                    /**
                     * Called when the export is ready to be created
                     */
                    this.dataExportRequest = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
                    this._isRequestPending = false;
                    this._progress = 0;
                }
                Object.defineProperty(DataExporterComponent.prototype, "open", {
                    get: function () {
                        return this._open;
                    },
                    /**
                     * Whether the dialog is open
                     */
                    set: function (value) {
                        this._open = value;
                        this.openChange.emit(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "isRequestPending", {
                    /**
                     * True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called
                     * or an error is thrown
                     */
                    get: function () {
                        return this._isRequestPending;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "progress", {
                    /**
                     * Number between 0-1, used for displaying the progress bar.
                     */
                    get: function () {
                        return this._progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataExporterComponent.prototype.onClickExport = function () {
                    var _this = this;
                    this._isRequestPending = true;
                    this.dataExportRequest.emit({
                        exportData: this.exportData.bind(this),
                        updateProgress: this.updateProgress.bind(this),
                        selectedColumns: this.columns.filter(function (col) { return _this.formGroup.controls[col.fieldName].value; }),
                    });
                };
                DataExporterComponent.prototype.onClickCheckAll = function () {
                    for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                        var column = _a[_i];
                        this.formGroup.controls[column.fieldName].setValue(true);
                    }
                };
                Object.defineProperty(DataExporterComponent.prototype, "isSelectAllEnabled", {
                    get: function () {
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            if (!this.formGroup.controls[column.fieldName].value) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataExporterComponent.prototype, "isExportEnabled", {
                    get: function () {
                        if (this.isRequestPending) {
                            return false;
                        }
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            if (this.formGroup.controls[column.fieldName].value) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataExporterComponent.prototype.ngOnInit = function () {
                    var controls = this.columns.reduce(function (previousValue, currentValue) {
                        previousValue[currentValue.fieldName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](true);
                        return previousValue;
                    }, {});
                    this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](controls);
                };
                DataExporterComponent.prototype.exportData = function (records) {
                    var _this = this;
                    if (!this.open) {
                        return;
                    }
                    this.open = false;
                    this._isRequestPending = false;
                    var rows = [
                        // First row is the display names
                        Object.keys(records[0]).map(function (fieldName) { return _this.getDisplayNameForField(fieldName); })
                    ].concat(records.map(function (rec) { return Object.keys(rec).map(function (key) { return rec[key]; }); }));
                    var csvFile = this.csvExporterService.createCsv(rows);
                    this.csvExporterService.downloadCsvFile(csvFile, this.fileName);
                };
                DataExporterComponent.prototype.updateProgress = function (progress) {
                    this._progress = progress;
                };
                DataExporterComponent.prototype.getDisplayNameForField = function (fieldName) {
                    for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                        var column = _a[_i];
                        if (column.fieldName === fieldName) {
                            return column.displayName;
                        }
                    }
                    return fieldName;
                };
                return DataExporterComponent;
            }());
            DataExporterComponent.ctorParameters = function () { return [
                { type: _csv_exporter_service__WEBPACK_IMPORTED_MODULE_3__["CsvExporterService"] }
            ]; };
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "columns", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "fileName", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "dialogHeader", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "cancelText", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "selectAllText", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "exportText", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "showSelectAll", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DataExporterComponent.prototype, "open", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
            ], DataExporterComponent.prototype, "openChange", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
            ], DataExporterComponent.prototype, "dataExportRequest", void 0);
            DataExporterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-data-exporter',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./data-exporter.component.html */ "../../node_modules/raw-loader/dist/cjs.js!../components/src/data-exporter/data-exporter.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./data-exporter.component.scss */ "../components/src/data-exporter/data-exporter.component.scss")).default]
                })
            ], DataExporterComponent);
            /***/ 
        }),
        /***/ "../components/src/data-exporter/data-exporter.module.ts": 
        /*!***************************************************************!*\
          !*** ../components/src/data-exporter/data-exporter.module.ts ***!
          \***************************************************************/
        /*! exports provided: DataExporterModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterModule", function () { return DataExporterModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _vcd_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vcd/i18n */ "../../dist/i18n/fesm2015/vcd-i18n.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _data_exporter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data-exporter.component */ "../components/src/data-exporter/data-exporter.component.ts");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DataExporterModule = /** @class */ (function () {
                function DataExporterModule() {
                }
                return DataExporterModule;
            }());
            DataExporterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    declarations: [_data_exporter_component__WEBPACK_IMPORTED_MODULE_4__["DataExporterComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClarityModule"], _vcd_i18n__WEBPACK_IMPORTED_MODULE_1__["I18nModule"]],
                    exports: [_data_exporter_component__WEBPACK_IMPORTED_MODULE_4__["DataExporterComponent"]],
                })
            ], DataExporterModule);
            /***/ 
        }),
        /***/ "../components/src/data-exporter/index.ts": 
        /*!************************************************!*\
          !*** ../components/src/data-exporter/index.ts ***!
          \************************************************/
        /*! exports provided: DataExporterModule, DataExporterComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _data_exporter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-exporter.component */ "../components/src/data-exporter/data-exporter.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataExporterComponent", function () { return _data_exporter_component__WEBPACK_IMPORTED_MODULE_1__["DataExporterComponent"]; });
            /* harmony import */ var _data_exporter_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-exporter.module */ "../components/src/data-exporter/data-exporter.module.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataExporterModule", function () { return _data_exporter_module__WEBPACK_IMPORTED_MODULE_2__["DataExporterModule"]; });
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /***/ 
        }),
        /***/ "../components/src/datagrid/datagrid.component.ts": 
        /*!********************************************************!*\
          !*** ../components/src/datagrid/datagrid.component.ts ***!
          \********************************************************/
        /*! exports provided: GridSelectionType, DatagridComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridSelectionType", function () { return GridSelectionType; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridComponent", function () { return DatagridComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces/datagrid-column.interface */ "../components/src/datagrid/interfaces/datagrid-column.interface.ts");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * Different types of row selection on the grid
             */
            var GridSelectionType;
            (function (GridSelectionType) {
                /**
                 * For selecting multiple rows
                 */
                GridSelectionType["Multi"] = "MULTI";
                /**
                 * For selecting only one row at a time
                 */
                GridSelectionType["Single"] = "SINGLE";
                /**
                 * Disables the selection
                 */
                GridSelectionType["None"] = "NONE";
            })(GridSelectionType || (GridSelectionType = {}));
            /**
             * Component used for saving the time required for developing a data grid. It takes different properties required for
             * rendering as Inputs and Outputs.
             *
             * Example usage in a component:
             * In the component view, different properties required for the grid are wired as Inputs and Outputs.
             * <vcd-datagrid
             *    (onGridRefresh)="fetchData()"
             *    [columns]="columns"
             *    [gridData]="gridData">
             *  </vcd-datagrid>
             *
             */
            var DatagridComponent = /** @class */ (function () {
                /**
                 * Component used for saving the time required for developing a data grid. It takes different properties required for
                 * rendering as Inputs and Outputs.
                 *
                 * Example usage in a component:
                 * In the component view, different properties required for the grid are wired as Inputs and Outputs.
                 * <vcd-datagrid
                 *    (onGridRefresh)="fetchData()"
                 *    [columns]="columns"
                 *    [gridData]="gridData">
                 *  </vcd-datagrid>
                 *
                 */
                function DatagridComponent() {
                    this.GridColumnHideable = _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"];
                    this._selectionType = GridSelectionType.None;
                    /**
                     * The CSS class to use for the Clarity datagrid.
                     */
                    this.clrDatagridCssClass = '';
                    /**
                     * The text placed next to the pagination number dropdown.
                     */
                    this.paginationDropdownText = '';
                    /**
                     * The pagination information that the user should supply.
                     */
                    this.pagination = {
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50, 100],
                    };
                    /**
                     * Loading indicator on the grid
                     */
                    this.isLoading = false;
                    /**
                     * The value of the single selection.
                     */
                    this.singleSelected = undefined;
                    /**
                     * The value of the multi selection.
                     */
                    this.multiSelection = [];
                    /**
                     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change
                     * {@link #GridState} is the type of value emitted
                     */
                    this.gridRefresh = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
                    /**
                     * Returns an identifier for the given record at the given index.
                     *
                     * If the record has a href, defaults to that. Else, defaults to index.
                     */
                    this.trackBy = function (index, record) {
                        return record && (record.href || index);
                        // tslint:disable-next-line: semicolon
                    };
                }
                Object.defineProperty(DatagridComponent.prototype, "columns", {
                    get: function () {
                        return this._columns;
                    },
                    /**
                     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array
                     */
                    set: function (cols) {
                        this._columns = cols;
                        this.getColumnsConfig();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DatagridComponent.prototype, "gridData", {
                    /**
                     * Set from the caller component using this grid. The input is set upon fetching data by the caller
                     */
                    set: function (result) {
                        this.isLoading = false;
                        this.items = result.items;
                        this.totalItems = result.totalItems;
                        this.updateSelectedItems();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DatagridComponent.prototype, "selectionType", {
                    /**
                     * Type of row selection on the grid
                     */
                    set: function (selectionType) {
                        this._selectionType = selectionType;
                        this.clearSelectionInformation();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Gives the correct string to display for the pagination.
                 *
                 * @param firstItem the index of the first item displayed.
                 * @param lastItem the index of the last item displayed.
                 * @param totalItems the total number of items that could be displayed.
                 */
                DatagridComponent.prototype.paginationCallback = function (firstItem, lastItem, totalItems) {
                    return firstItem + " - " + lastItem + " of " + totalItems + " rows";
                };
                /**
                 * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
                 */
                DatagridComponent.prototype.clrDatarowCssClassGetter = function (row, index) {
                    return '';
                };
                DatagridComponent.prototype.ngOnInit = function () {
                    this.isLoading = true;
                    this.clearSelectionInformation();
                };
                DatagridComponent.prototype.updateSelectedItems = function () {
                    var _this = this;
                    if (this._selectionType === GridSelectionType.Single) {
                        // Tries to find the currently selected item. If it isn't found, clears the selection.
                        var found = this.items.find(function (item, itemIndex) { return _this.trackBy(itemIndex, item) ===
                            _this.trackBy(_this.items.indexOf(_this.datagrid.selection.currentSingle), _this.datagrid.selection.currentSingle); });
                        if (!found) {
                            this.datagrid.selection.currentSingle = undefined;
                        }
                    }
                    else if (this._selectionType === GridSelectionType.Multi) {
                        // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.
                        if (this.datagrid.selection.current) {
                            this.datagrid.selection.current = this.datagrid.selection.current.filter(function (selected, selectedIndex) {
                                var found = _this.items.find(function (item, itemIndex) { return _this.trackBy(itemIndex, item) === _this.trackBy(selectedIndex, selected); });
                                return found;
                            });
                        }
                    }
                };
                DatagridComponent.prototype.clearSelectionInformation = function () {
                    if (!this.datagrid) {
                        return;
                    }
                    if (this._selectionType === GridSelectionType.Single) {
                        this.datagrid.selected = undefined;
                        this.datagrid.singleSelected = this.singleSelected;
                    }
                    else if (this._selectionType === GridSelectionType.Multi) {
                        this.datagrid.singleSelected = undefined;
                        this.datagrid.selected = this.multiSelection;
                    }
                    else if (this._selectionType === GridSelectionType.None) {
                        this.datagrid.selected = [];
                        this.datagrid.singleSelected = undefined;
                        this.datagrid.selected = undefined;
                    }
                };
                /**
                 * Returns the items selected in the VCD datagrid.
                 */
                DatagridComponent.prototype.getDatagridSelection = function () {
                    if (this.datagrid.selection.currentSingle) {
                        return [this.datagrid.selection.currentSingle];
                    }
                    if (this.datagrid.selection.current) {
                        return this.datagrid.selection.current;
                    }
                    return [];
                };
                /**
                 * Called when the {@param state} of the Clarity datagrid changes.
                 */
                DatagridComponent.prototype.gridStateChanged = function (state) {
                    // Update pagination information.
                    var pagination = {
                        pageNumber: state.page ? state.page.current : 1,
                        itemsPerPage: state.page ? state.page.size : 10,
                    };
                    // Update the sorting information.
                    var toEmit = {
                        pagination: pagination,
                    };
                    if (state.sort && typeof state.sort.by === 'string') {
                        toEmit.sortColumn = {
                            name: state.sort.by,
                            reverse: state.sort.reverse,
                        };
                    }
                    this.gridRefresh.emit(toEmit);
                };
                /**
                 * Resets the pagination to page 1.
                 */
                DatagridComponent.prototype.resetToPageOne = function () {
                    this.paginationComponent.currentPage = 1;
                };
                DatagridComponent.prototype.isColumnHideable = function (column) {
                    return column && column.hideable && column.hideable !== _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"].Never;
                };
                /**
                 * Says if the number of items matches the page size.
                 */
                DatagridComponent.prototype.sameItemsAsPageSize = function () {
                    return this.pagination.pageSize === this.items.length;
                };
                /**
                 * Updates the pagination data and makes the callback.
                 */
                DatagridComponent.prototype.paginationCallbackWrapper = function (paginationData) {
                    return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);
                };
                /**
                 * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds
                 * of renderers which is required in the HTML template.
                 */
                DatagridComponent.prototype.getColumnsConfig = function () {
                    this.columnsConfig = this.columns.map(function (column) {
                        var columnConfig = Object.assign({}, column);
                        if (column.renderer instanceof Function) {
                            columnConfig.fieldRenderer = column.renderer;
                        }
                        else if (column.renderer.config) {
                            columnConfig.fieldColumnRendererSpec = column.renderer;
                        }
                        else {
                            columnConfig.fieldName = column.renderer;
                        }
                        return columnConfig;
                    });
                };
                return DatagridComponent;
            }());
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "columns", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "gridData", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "selectionType", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], { static: false })
            ], DatagridComponent.prototype, "detailTemplate", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "clrDatagridCssClass", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "paginationDropdownText", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "pagination", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
            ], DatagridComponent.prototype, "gridRefresh", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDatagridFilter"], { static: false })
            ], DatagridComponent.prototype, "numericFilter", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDatagrid"], { static: true })
            ], DatagridComponent.prototype, "datagrid", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDatagridPagination"], { static: false })
            ], DatagridComponent.prototype, "paginationComponent", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "trackBy", void 0);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "paginationCallback", null);
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], DatagridComponent.prototype, "clrDatarowCssClassGetter", null);
            DatagridComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./datagrid.component.html */ "../../node_modules/raw-loader/dist/cjs.js!../components/src/datagrid/datagrid.component.html")).default,
                })
            ], DatagridComponent);
            /***/ 
        }),
        /***/ "../components/src/datagrid/datagrid.module.ts": 
        /*!*****************************************************!*\
          !*** ../components/src/datagrid/datagrid.module.ts ***!
          \*****************************************************/
        /*! exports provided: DatagridModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridModule", function () { return DatagridModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _datagrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datagrid.component */ "../components/src/datagrid/datagrid.component.ts");
            /* harmony import */ var _directives_component_renderer_outlet_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives/component-renderer-outlet.directive */ "../components/src/datagrid/directives/component-renderer-outlet.directive.ts");
            /* harmony import */ var _common_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/pipes/pipes.module */ "../components/src/common/pipes/pipes.module.ts");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _pipes_function_renderer_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pipes/function-renderer.pipe */ "../components/src/datagrid/pipes/function-renderer.pipe.ts");
            /* harmony import */ var _renderers_bold_text_renderer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./renderers/bold-text-renderer.component */ "../components/src/datagrid/renderers/bold-text-renderer.component.ts");
            /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm2015/animations.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var directives = [_datagrid_component__WEBPACK_IMPORTED_MODULE_4__["DatagridComponent"], _directives_component_renderer_outlet_directive__WEBPACK_IMPORTED_MODULE_5__["ComponentRendererOutletDirective"]];
            var pipes = [_pipes_function_renderer_pipe__WEBPACK_IMPORTED_MODULE_8__["FunctionRendererPipe"]];
            var renderers = [_renderers_bold_text_renderer_component__WEBPACK_IMPORTED_MODULE_9__["BoldTextRendererComponent"]];
            var DatagridModule = /** @class */ (function () {
                function DatagridModule() {
                }
                return DatagridModule;
            }());
            DatagridModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _common_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__["PipesModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"]],
                    declarations: directives.concat(renderers, pipes),
                    providers: [],
                    exports: [_datagrid_component__WEBPACK_IMPORTED_MODULE_4__["DatagridComponent"]].concat(renderers),
                    entryComponents: renderers.slice(),
                })
            ], DatagridModule);
            /***/ 
        }),
        /***/ "../components/src/datagrid/directives/component-renderer-outlet.directive.ts": 
        /*!************************************************************************************!*\
          !*** ../components/src/datagrid/directives/component-renderer-outlet.directive.ts ***!
          \************************************************************************************/
        /*! exports provided: ComponentRendererOutletDirective */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentRendererOutletDirective", function () { return ComponentRendererOutletDirective; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * Component that acts as a host element for dynamic rendering of component constructors.
             * It takes {@link ComponentRendererSpec} as input and also 'context' as input that serves as argument for
             * {@link ComponentRenderer.config} method. Attaches the component to be rendered to the view container of host element
             * and updates it's configuration whenever changed.
             *
             * Example usage:
             * <ng-template
             *      [vcdComponentRendererOutlet]="{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }"
             * ></ng-template>
             *
             */
            var ComponentRendererOutletDirective = /** @class */ (function () {
                function ComponentRendererOutletDirective(viewContainerRef, cfr) {
                    this.viewContainerRef = viewContainerRef;
                    this.cfr = cfr;
                }
                Object.defineProperty(ComponentRendererOutletDirective.prototype, "vcdComponentRendererOutlet", {
                    set: function (renderer) {
                        if (this.componentType !== renderer.rendererSpec.type) {
                            // Cache the componentType to avoid redundant detaching and attaching of component to this host
                            this.componentType = renderer.rendererSpec.type;
                            this.componentRef = this.attachRenderer();
                        }
                        this.assignValue(renderer.rendererSpec.config, renderer.context);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Attaches the passed component type to the view of this directive host
                 */
                ComponentRendererOutletDirective.prototype.attachRenderer = function () {
                    if (this.componentRef) {
                        this.detachRenderer();
                    }
                    var componentFactory = this.cfr.resolveComponentFactory(this.componentType);
                    return this.viewContainerRef.createComponent(componentFactory);
                };
                /**
                 * Updates the configuration of instantiated component
                 */
                ComponentRendererOutletDirective.prototype.assignValue = function (config, context) {
                    if (!this.componentRef || !this.componentRef.instance) {
                        return;
                    }
                    this.componentRef.instance.config = config instanceof Function ? config(context) : config;
                };
                ComponentRendererOutletDirective.prototype.detachRenderer = function () {
                    this.viewContainerRef.remove();
                    this.componentRef = null;
                };
                return ComponentRendererOutletDirective;
            }());
            ComponentRendererOutletDirective.ctorParameters = function () { return [
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] },
                { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] }
            ]; };
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], ComponentRendererOutletDirective.prototype, "vcdComponentRendererOutlet", null);
            ComponentRendererOutletDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
                    selector: '[vcdComponentRendererOutlet]',
                })
            ], ComponentRendererOutletDirective);
            /***/ 
        }),
        /***/ "../components/src/datagrid/index.ts": 
        /*!*******************************************!*\
          !*** ../components/src/datagrid/index.ts ***!
          \*******************************************/
        /*! exports provided: DatagridModule, GridSelectionType, DatagridComponent, GridColumnHideable, GridColumnSortDirection, RendererSpec, BoldTextRendererComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _datagrid_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datagrid.module */ "../components/src/datagrid/datagrid.module.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatagridModule", function () { return _datagrid_module__WEBPACK_IMPORTED_MODULE_1__["DatagridModule"]; });
            /* harmony import */ var _datagrid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datagrid.component */ "../components/src/datagrid/datagrid.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridSelectionType", function () { return _datagrid_component__WEBPACK_IMPORTED_MODULE_2__["GridSelectionType"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatagridComponent", function () { return _datagrid_component__WEBPACK_IMPORTED_MODULE_2__["DatagridComponent"]; });
            /* harmony import */ var _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interfaces/datagrid-column.interface */ "../components/src/datagrid/interfaces/datagrid-column.interface.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridColumnHideable", function () { return _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_3__["GridColumnHideable"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridColumnSortDirection", function () { return _interfaces_datagrid_column_interface__WEBPACK_IMPORTED_MODULE_3__["GridColumnSortDirection"]; });
            /* harmony import */ var _interfaces_component_renderer_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interfaces/component-renderer.interface */ "../components/src/datagrid/interfaces/component-renderer.interface.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RendererSpec", function () { return _interfaces_component_renderer_interface__WEBPACK_IMPORTED_MODULE_4__["RendererSpec"]; });
            /* harmony import */ var _renderers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderers */ "../components/src/datagrid/renderers/index.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoldTextRendererComponent", function () { return _renderers__WEBPACK_IMPORTED_MODULE_5__["BoldTextRendererComponent"]; });
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /***/ 
        }),
        /***/ "../components/src/datagrid/interfaces/component-renderer.interface.ts": 
        /*!*****************************************************************************!*\
          !*** ../components/src/datagrid/interfaces/component-renderer.interface.ts ***!
          \*****************************************************************************/
        /*! exports provided: RendererSpec */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RendererSpec", function () { return RendererSpec; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * Utility function to enforce type safety on output of the config function. The output is used as value context
             * inside ComponentRenderer's template
             *
             * Example usage:
             * const gridColumn = {
             *   renderer: RendererSpec<SomeRecord, IconRendererConfiguration>(IconComponentRendererCtor, (r: SomeRecord) => v)
             * }
             *
             * In the above example, this method helps in making sure that the value "v" returned by the config function is of
             * IconRendererConfiguration type
             */
            function RendererSpec(componentRendererSpec) {
                return componentRendererSpec;
            }
            /***/ 
        }),
        /***/ "../components/src/datagrid/interfaces/datagrid-column.interface.ts": 
        /*!**************************************************************************!*\
          !*** ../components/src/datagrid/interfaces/datagrid-column.interface.ts ***!
          \**************************************************************************/
        /*! exports provided: GridColumnHideable, GridColumnSortDirection */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridColumnHideable", function () { return GridColumnHideable; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridColumnSortDirection", function () { return GridColumnSortDirection; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var GridColumnHideable;
            (function (GridColumnHideable) {
                /**
                 * Does not show up in column toggle box
                 */
                GridColumnHideable["Never"] = "NEVER";
                /**
                 * Shows up in column toggle box, column is visible
                 */
                GridColumnHideable["Shown"] = "SHOWN";
                /**
                 * Shows up in column toggle box, column is hidden
                 */
                GridColumnHideable["Hidden"] = "HIDDEN";
            })(GridColumnHideable || (GridColumnHideable = {}));
            /**
             * The sorting direction of the column values
             */
            var GridColumnSortDirection;
            (function (GridColumnSortDirection) {
                GridColumnSortDirection["Asc"] = "ASCENDING";
                GridColumnSortDirection["Desc"] = "DESCENDING";
                GridColumnSortDirection["None"] = "NONE";
            })(GridColumnSortDirection || (GridColumnSortDirection = {}));
            /***/ 
        }),
        /***/ "../components/src/datagrid/pipes/function-renderer.pipe.ts": 
        /*!******************************************************************!*\
          !*** ../components/src/datagrid/pipes/function-renderer.pipe.ts ***!
          \******************************************************************/
        /*! exports provided: FunctionRendererPipe */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionRendererPipe", function () { return FunctionRendererPipe; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * Used for executing the functions of column cells which use functions to calculate their values from different
             * properties of an object
             */
            var FunctionRendererPipe = /** @class */ (function () {
                function FunctionRendererPipe() {
                }
                FunctionRendererPipe.prototype.transform = function (item, renderer) {
                    if (!item || !renderer) {
                        return null;
                    }
                    return renderer(item);
                };
                return FunctionRendererPipe;
            }());
            FunctionRendererPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
                    name: 'functionRenderer',
                    pure: true,
                })
            ], FunctionRendererPipe);
            /***/ 
        }),
        /***/ "../components/src/datagrid/renderers/bold-text-renderer.component.ts": 
        /*!****************************************************************************!*\
          !*** ../components/src/datagrid/renderers/bold-text-renderer.component.ts ***!
          \****************************************************************************/
        /*! exports provided: BoldTextRendererComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoldTextRendererComponent", function () { return BoldTextRendererComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template
             *
             * @example Example usage with RendererSpec:
             *     columns: GridColumn<MockRecord>[] = [
             *       {
             *         displayName: 'Component Renderer',
             *         renderer: RendererSpec(
             *           BoldTextRendererComponent,
             *           (record: MockRecord) => ({text: record.name})
             *         )
             *       }
             *     ];
             */
            var BoldTextRendererComponent = /** @class */ (function () {
                function BoldTextRendererComponent() {
                }
                return BoldTextRendererComponent;
            }());
            tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
            ], BoldTextRendererComponent.prototype, "config", void 0);
            BoldTextRendererComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    template: "\n        <strong>{{ config.text }}</strong>\n    ",
                })
            ], BoldTextRendererComponent);
            /***/ 
        }),
        /***/ "../components/src/datagrid/renderers/index.ts": 
        /*!*****************************************************!*\
          !*** ../components/src/datagrid/renderers/index.ts ***!
          \*****************************************************/
        /*! exports provided: BoldTextRendererComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _bold_text_renderer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bold-text-renderer.component */ "../components/src/datagrid/renderers/bold-text-renderer.component.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoldTextRendererComponent", function () { return _bold_text_renderer_component__WEBPACK_IMPORTED_MODULE_1__["BoldTextRendererComponent"]; });
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /***/ 
        }),
        /***/ "../components/src/public-api.ts": 
        /*!***************************************!*\
          !*** ../components/src/public-api.ts ***!
          \***************************************/
        /*! exports provided: DataExporterModule, ComponentsModule, DataExporterComponent, DatagridModule, GridSelectionType, DatagridComponent, GridColumnHideable, GridColumnSortDirection, RendererSpec, CliptextModule, Position, CliptextComponent, BoldTextRendererComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _data_exporter_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-exporter/index */ "../components/src/data-exporter/index.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataExporterModule", function () { return _data_exporter_index__WEBPACK_IMPORTED_MODULE_1__["DataExporterModule"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataExporterComponent", function () { return _data_exporter_index__WEBPACK_IMPORTED_MODULE_1__["DataExporterComponent"]; });
            /* harmony import */ var _datagrid_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datagrid/index */ "../components/src/datagrid/index.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatagridModule", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["DatagridModule"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridSelectionType", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["GridSelectionType"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatagridComponent", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["DatagridComponent"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridColumnHideable", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridColumnSortDirection", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["GridColumnSortDirection"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RendererSpec", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["RendererSpec"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoldTextRendererComponent", function () { return _datagrid_index__WEBPACK_IMPORTED_MODULE_2__["BoldTextRendererComponent"]; });
            /* harmony import */ var _cliptext_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cliptext/index */ "../components/src/cliptext/index.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CliptextModule", function () { return _cliptext_index__WEBPACK_IMPORTED_MODULE_3__["CliptextModule"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function () { return _cliptext_index__WEBPACK_IMPORTED_MODULE_3__["Position"]; });
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CliptextComponent", function () { return _cliptext_index__WEBPACK_IMPORTED_MODULE_3__["CliptextComponent"]; });
            /* harmony import */ var _components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components.module */ "../components/src/components.module.ts");
            /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function () { return _components_module__WEBPACK_IMPORTED_MODULE_4__["ComponentsModule"]; });
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /*
             * Public API Surface of components
             */
            /***/ 
        }),
        /***/ "./$$_lazy_route_resource lazy recursive": 
        /*!******************************************************!*\
          !*** ./$$_lazy_route_resource lazy namespace object ***!
          \******************************************************/
        /*! no static exports found */
        /***/ (function (module, exports) {
            function webpackEmptyAsyncContext(req) {
                // Here Promise.resolve().then() is used instead of new Promise() to prevent
                // uncaught exception popping up in devtools
                return Promise.resolve().then(function () {
                    var e = new Error("Cannot find module '" + req + "'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                });
            }
            webpackEmptyAsyncContext.keys = function () { return []; };
            webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
            module.exports = webpackEmptyAsyncContext;
            webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
            /***/ 
        }),
        /***/ "./gen/components-doc/documentation.json": 
        /*!***********************************************!*\
          !*** ./gen/components-doc/documentation.json ***!
          \***********************************************/
        /*! exports provided: pipes, interfaces, injectables, classes, directives, components, modules, miscellaneous, routes, coverage, default */
        /***/ (function (module) {
            module.exports = JSON.parse("{\"pipes\":[{\"name\":\"FunctionRendererPipe\",\"id\":\"pipe-FunctionRendererPipe-27c07bcc8b8b7101e8bad7ce47a36363\",\"file\":\"projects/components/src/datagrid/pipes/function-renderer.pipe.ts\",\"type\":\"pipe\",\"description\":\"<p>Used for executing the functions of column cells which use functions to calculate their values from different\\nproperties of an object</p>\\n\",\"properties\":[],\"methods\":[{\"name\":\"transform\",\"args\":[{\"name\":\"item\",\"type\":\"any\"},{\"name\":\"renderer\",\"type\":\"function\",\"function\":[{\"name\":\"val\",\"type\":\"any\"}]}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":17,\"modifierKind\":[114],\"jsdoctags\":[{\"name\":\"item\",\"type\":\"any\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"renderer\",\"type\":\"function\",\"function\":[{\"name\":\"val\",\"type\":\"any\"}],\"tagName\":{\"text\":\"param\"}}]}],\"pure\":true,\"ngname\":\"functionRenderer\",\"sourceCode\":\"import { Pipe, PipeTransform } from '@angular/core';\\n\\n/**\\n * Used for executing the functions of column cells which use functions to calculate their values from different\\n * properties of an object\\n */\\n@Pipe({\\n    name: 'functionRenderer',\\n    pure: true,\\n})\\nexport class FunctionRendererPipe implements PipeTransform {\\n    public transform(item: any, renderer: (val: any) => any): string {\\n        if (!item || !renderer) {\\n            return null;\\n        }\\n        return renderer(item);\\n    }\\n}\\n\"},{\"name\":\"NestedPropertyPipe\",\"id\":\"pipe-NestedPropertyPipe-62501f3ebba6bc3a1379a1a25de58770\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"pipe\",\"description\":\"<p>Used for extracting the value of nested property of an object.</p>\\n<p>Example:\\nconst obj = {\\n     a: {\\n         b: {\\n             c: &#39;c&#39;\\n         }\\n     }\\n}</p>\\n<p>Invoking <code>{{ obj | nestedProperty: &#39;a.b.c&#39; }}</code> in a template produces c</p>\\n\",\"properties\":[],\"methods\":[{\"name\":\"transform\",\"args\":[{\"name\":\"item\",\"type\":\"any\"},{\"name\":\"property\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[\"T\"],\"line\":32,\"modifierKind\":[114],\"jsdoctags\":[{\"name\":\"item\",\"type\":\"any\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"property\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}]}],\"pure\":true,\"ngname\":\"nestedProperty\",\"sourceCode\":\"import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';\\nimport { DatePipe, DecimalPipe } from '@angular/common';\\n\\nconst OBJECT_PROPERTY_SEPARATOR = '.';\\nconst DATE_OBJECT_CLASS = '[object Date]';\\n\\n/**\\n * Used for extracting the value of nested property of an object.\\n *\\n * Example:\\n * const obj = {\\n *     a: {\\n *         b: {\\n *             c: 'c'\\n *         }\\n *     }\\n * }\\n *\\n * Invoking `{{ obj | nestedProperty: 'a.b.c' }}` in a template produces c\\n */\\n@Pipe({\\n    name: 'nestedProperty',\\n    pure: true,\\n})\\nexport class NestedPropertyPipe implements PipeTransform {\\n    constructor(@Inject(LOCALE_ID) private localeId: string) {}\\n    public transform<T>(item: any, property: string): string {\\n        if (!item || !property) {\\n            return null;\\n        }\\n        const splitProperty = property.split(OBJECT_PROPERTY_SEPARATOR);\\n        let returnValue;\\n        if (splitProperty.length > 1) {\\n            let value = item;\\n            for (const nestedProp of splitProperty) {\\n                if (isNullOrUndefined(value) || isNullOrUndefined(value[nestedProp])) {\\n                    return null;\\n                }\\n                value = value[nestedProp];\\n            }\\n            returnValue = value;\\n        } else {\\n            if (isNullOrUndefined(item[property])) {\\n                return null;\\n            }\\n            returnValue = item[property];\\n        }\\n\\n        if (typeof returnValue === 'number') {\\n            return new DecimalPipe(this.localeId).transform(returnValue);\\n        }\\n        return returnValue instanceof Date ? new DatePipe(this.localeId).transform(returnValue) : returnValue;\\n    }\\n}\\n\\n/**\\n * Utility method for covering the 'null' and 'undefined' checks as 'value == null' is equivalent to 'value === null || value === undefined'\\n */\\nfunction isNullOrUndefined(value: unknown): boolean {\\n    return value == null;\\n}\\n\"}],\"interfaces\":[{\"name\":\"BoldTextRendererConfig\",\"id\":\"interface-BoldTextRendererConfig-ef925c06bd38d69b8ef18b74dacdb84a\",\"file\":\"projects/components/src/datagrid/renderers/bold-text-renderer.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component, Input } from '@angular/core';\\nimport { ComponentRenderer } from '../interfaces/component-renderer.interface';\\n\\n/**\\n * {@link ComponentRenderer.config} type that the {@link BoldTextRendererComponent} can understand\\n */\\nexport interface BoldTextRendererConfig {\\n    /**\\n     * Text to be displayed in bold font\\n     */\\n    text: string;\\n}\\n\\n/**\\n * A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template\\n *\\n * @example Example usage with RendererSpec:\\n *     columns: GridColumn<MockRecord>[] = [\\n *       {\\n *         displayName: 'Component Renderer',\\n *         renderer: RendererSpec(\\n *           BoldTextRendererComponent,\\n *           (record: MockRecord) => ({text: record.name})\\n *         )\\n *       }\\n *     ];\\n */\\n@Component({\\n    template: `\\n        <strong>{{ config.text }}</strong>\\n    `,\\n})\\nexport class BoldTextRendererComponent implements ComponentRenderer<BoldTextRendererConfig> {\\n    @Input()\\n    config: BoldTextRendererConfig;\\n}\\n\",\"properties\":[{\"name\":\"text\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>Text to be displayed in bold font</p>\\n\",\"line\":16}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>{@link ComponentRenderer.config} type that the {@link BoldTextRendererComponent} can understand</p>\\n\",\"methods\":[]},{\"name\":\"Button\",\"id\":\"interface-Button-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[],\"indexSignatures\":[],\"description\":\"<p>TODO: This API is going to have more properties and is going to be defined as part of\\n  <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-21\\\">https://jira.eng.vmware.com/browse/VDUCC-21</a></p>\\n\",\"methods\":[]},{\"name\":\"ColumnConfigInternal\",\"id\":\"interface-ColumnConfigInternal-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"fieldColumnRendererSpec\",\"type\":\"ComponentRendererSpec<R | T>\",\"optional\":true,\"description\":\"\",\"line\":121},{\"name\":\"fieldName\",\"type\":\"string\",\"optional\":true,\"description\":\"\",\"line\":119},{\"name\":\"fieldRenderer\",\"type\":\"FunctionRenderer<R>\",\"optional\":true,\"description\":\"\",\"line\":120}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\ntypes.</p>\\n\",\"methods\":[],\"extends\":\"GridColumn\"},{\"name\":\"ComponentRenderer\",\"id\":\"interface-ComponentRenderer-0d0574277ff6e63b8489cd30d4971526\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Type } from '@angular/core';\\n\\n/**\\n * Implemented by all the component renderers\\n */\\nexport interface ComponentRenderer<T> {\\n    /**\\n     * Object used by the component renderers inside their HTML template\\n     */\\n    config: T;\\n}\\n\\n/**\\n * Used for the type safety of {@link ComponentRendererSpec#type}\\n */\\nexport type ComponentRendererConstructor<V> = Type<ComponentRenderer<V>>;\\n\\n/**\\n * An object that contains the constructor of a component{@link ComponentRenderer} to be displayed and value getter\\n * function definition that would get the value to be used by the component in its template. This is useful for dynamically\\n * rendering/configuring filters and columns/cells\\n *\\n * The directive{@link ComponentRendererOutletDirective} using this renderer spec to display the component will be\\n * responsible for setting the actual renderer's value{@link ComponentRenderer#config} after dynamically\\n * initializing it. But the caller is responsible for providing a config\\n */\\nexport interface ComponentRendererSpec<R, V> {\\n    /**\\n     * Constructor of a specific type of component renderer desired to be used\\n     */\\n    type: ComponentRendererConstructor<V>;\\n\\n    /**\\n     * This can either be a function that creates the config object (in case of a cell renderer) or config object itself (in\\n     * case of a filter renderer) to be set on the ComponentRenderer.\\n     * @param value An object to be transformed into {@link ComponentRenderer#config}. It's passed in by the calling\\n     * component\\n     */\\n    config: ((value?: R) => V) | V;\\n}\\n\\n/**\\n * Utility function to enforce type safety on output of the config function. The output is used as value context\\n * inside ComponentRenderer's template\\n *\\n * Example usage:\\n * const gridColumn = {\\n *   renderer: RendererSpec<SomeRecord, IconRendererConfiguration>(IconComponentRendererCtor, (r: SomeRecord) => v)\\n * }\\n *\\n * In the above example, this method helps in making sure that the value \\\"v\\\" returned by the config function is of\\n * IconRendererConfiguration type\\n */\\nexport function RendererSpec<R, C>(componentRendererSpec: {\\n    type: ComponentRendererConstructor<C>;\\n    /**\\n     *  'C & {}' makes the return type be not used as the inference site for C and instead use the constructor type from\\n     *  the first argument.\\n     *  {@link https://stackoverflow.com/questions/59055154/typescript-generics-infer-type-from-the-type-of-function-arguments}\\n     */\\n    config: ((record?: R) => C & {}) | C;\\n}): ComponentRendererSpec<R, C> {\\n    return componentRendererSpec;\\n}\\n\",\"properties\":[{\"name\":\"config\",\"type\":\"T\",\"optional\":false,\"description\":\"<p>Object used by the component renderers inside their HTML template</p>\\n\",\"line\":15}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Implemented by all the component renderers</p>\\n\",\"methods\":[]},{\"name\":\"ComponentRendererSpec\",\"id\":\"interface-ComponentRendererSpec-0d0574277ff6e63b8489cd30d4971526\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Type } from '@angular/core';\\n\\n/**\\n * Implemented by all the component renderers\\n */\\nexport interface ComponentRenderer<T> {\\n    /**\\n     * Object used by the component renderers inside their HTML template\\n     */\\n    config: T;\\n}\\n\\n/**\\n * Used for the type safety of {@link ComponentRendererSpec#type}\\n */\\nexport type ComponentRendererConstructor<V> = Type<ComponentRenderer<V>>;\\n\\n/**\\n * An object that contains the constructor of a component{@link ComponentRenderer} to be displayed and value getter\\n * function definition that would get the value to be used by the component in its template. This is useful for dynamically\\n * rendering/configuring filters and columns/cells\\n *\\n * The directive{@link ComponentRendererOutletDirective} using this renderer spec to display the component will be\\n * responsible for setting the actual renderer's value{@link ComponentRenderer#config} after dynamically\\n * initializing it. But the caller is responsible for providing a config\\n */\\nexport interface ComponentRendererSpec<R, V> {\\n    /**\\n     * Constructor of a specific type of component renderer desired to be used\\n     */\\n    type: ComponentRendererConstructor<V>;\\n\\n    /**\\n     * This can either be a function that creates the config object (in case of a cell renderer) or config object itself (in\\n     * case of a filter renderer) to be set on the ComponentRenderer.\\n     * @param value An object to be transformed into {@link ComponentRenderer#config}. It's passed in by the calling\\n     * component\\n     */\\n    config: ((value?: R) => V) | V;\\n}\\n\\n/**\\n * Utility function to enforce type safety on output of the config function. The output is used as value context\\n * inside ComponentRenderer's template\\n *\\n * Example usage:\\n * const gridColumn = {\\n *   renderer: RendererSpec<SomeRecord, IconRendererConfiguration>(IconComponentRendererCtor, (r: SomeRecord) => v)\\n * }\\n *\\n * In the above example, this method helps in making sure that the value \\\"v\\\" returned by the config function is of\\n * IconRendererConfiguration type\\n */\\nexport function RendererSpec<R, C>(componentRendererSpec: {\\n    type: ComponentRendererConstructor<C>;\\n    /**\\n     *  'C & {}' makes the return type be not used as the inference site for C and instead use the constructor type from\\n     *  the first argument.\\n     *  {@link https://stackoverflow.com/questions/59055154/typescript-generics-infer-type-from-the-type-of-function-arguments}\\n     */\\n    config: ((record?: R) => C & {}) | C;\\n}): ComponentRendererSpec<R, C> {\\n    return componentRendererSpec;\\n}\\n\",\"properties\":[{\"name\":\"config\",\"type\":\" | V\",\"optional\":false,\"description\":\"<p>This can either be a function that creates the config object (in case of a cell renderer) or config object itself (in\\ncase of a filter renderer) to be set on the ComponentRenderer.</p>\\n\",\"line\":44,\"jsdoctags\":[{\"pos\":1461,\"end\":1508,\"flags\":0,\"kind\":292,\"atToken\":{\"pos\":1461,\"end\":1462,\"flags\":0,\"kind\":57},\"tagName\":{\"pos\":1462,\"end\":1467,\"flags\":0,\"escapedText\":\"param\"},\"name\":{\"pos\":1468,\"end\":1473,\"flags\":0,\"escapedText\":\"value\"},\"isNameFirst\":true,\"isBracketed\":false,\"comment\":\"<p>An object to be transformed into {</p>\\n\"},{\"pos\":1508,\"end\":1514,\"flags\":0,\"kind\":288,\"atToken\":{\"pos\":1508,\"end\":1509,\"flags\":0,\"kind\":57},\"tagName\":{\"pos\":1509,\"end\":1513,\"flags\":0,\"escapedText\":\"link\"},\"comment\":\"<p>ComponentRenderer#config}. It&#39;s passed in by the calling\\ncomponent</p>\\n\"}]},{\"name\":\"type\",\"type\":\"ComponentRendererConstructor<V>\",\"optional\":false,\"description\":\"<p>Constructor of a specific type of component renderer desired to be used</p>\\n\",\"line\":36}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>An object that contains the constructor of a component{@link ComponentRenderer} to be displayed and value getter\\nfunction definition that would get the value to be used by the component in its template. This is useful for dynamically\\nrendering/configuring filters and columns/cells</p>\\n<p>The directive{@link ComponentRendererOutletDirective} using this renderer spec to display the component will be\\nresponsible for setting the actual renderer&#39;s value{@link ComponentRenderer#config} after dynamically\\ninitializing it. But the caller is responsible for providing a config</p>\\n\",\"methods\":[]},{\"name\":\"ComponentRendererType\",\"id\":\"interface-ComponentRendererType-015ff7e245db7e8600a9c1b7eecae5af\",\"file\":\"projects/components/src/datagrid/directives/component-renderer-outlet.directive.ts\",\"type\":\"interface\",\"sourceCode\":\"import { ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';\\nimport {\\n    ComponentRenderer,\\n    ComponentRendererConstructor,\\n    ComponentRendererSpec,\\n} from '../interfaces/component-renderer.interface';\\n\\n/**\\n * Type of the Input given to the {@link ComponentRendererOutletDirective.vcdComponentRendererOutlet}\\n */\\nexport interface ComponentRendererType<R, T> {\\n    /**\\n     * Contains the constructor of component to be rendered and also the method that gets the configuration required for\\n     * the component API\\n     */\\n    rendererSpec: ComponentRendererSpec<R, T>;\\n\\n    /**\\n     * serves as argument for {@link ComponentRenderer.config} method\\n     */\\n    context: R;\\n}\\n\\n/**\\n * Component that acts as a host element for dynamic rendering of component constructors.\\n * It takes {@link ComponentRendererSpec} as input and also 'context' as input that serves as argument for\\n * {@link ComponentRenderer.config} method. Attaches the component to be rendered to the view container of host element\\n * and updates it's configuration whenever changed.\\n *\\n * Example usage:\\n * <ng-template\\n *      [vcdComponentRendererOutlet]=\\\"{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }\\\"\\n * ></ng-template>\\n *\\n */\\n@Directive({\\n    selector: '[vcdComponentRendererOutlet]',\\n})\\nexport class ComponentRendererOutletDirective<R, T> {\\n    private componentRef: ComponentRef<ComponentRenderer<T>>;\\n    private componentType: ComponentRendererConstructor<T>;\\n\\n    constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}\\n\\n    @Input()\\n    set vcdComponentRendererOutlet(renderer: ComponentRendererType<R, T>) {\\n        if (this.componentType !== renderer.rendererSpec.type) {\\n            // Cache the componentType to avoid redundant detaching and attaching of component to this host\\n            this.componentType = renderer.rendererSpec.type;\\n            this.componentRef = this.attachRenderer();\\n        }\\n        this.assignValue(renderer.rendererSpec.config, renderer.context);\\n    }\\n\\n    /**\\n     * Attaches the passed component type to the view of this directive host\\n     */\\n    private attachRenderer(): ComponentRef<ComponentRenderer<T>> {\\n        if (this.componentRef) {\\n            this.detachRenderer();\\n        }\\n        const componentFactory = this.cfr.resolveComponentFactory(this.componentType);\\n        return this.viewContainerRef.createComponent(componentFactory);\\n    }\\n\\n    /**\\n     * Updates the configuration of instantiated component\\n     */\\n    private assignValue(config: ((r: R) => T) | T, context: R): void {\\n        if (!this.componentRef || !this.componentRef.instance) {\\n            return;\\n        }\\n        this.componentRef.instance.config = config instanceof Function ? config(context) : config;\\n    }\\n\\n    private detachRenderer(): void {\\n        this.viewContainerRef.remove();\\n        this.componentRef = null;\\n    }\\n}\\n\",\"properties\":[{\"name\":\"context\",\"type\":\"R\",\"optional\":false,\"description\":\"<p>serves as argument for {@link ComponentRenderer.config} method</p>\\n\",\"line\":26},{\"name\":\"rendererSpec\",\"type\":\"ComponentRendererSpec<R | T>\",\"optional\":false,\"description\":\"<p>Contains the constructor of component to be rendered and also the method that gets the configuration required for\\nthe component API</p>\\n\",\"line\":21}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Type of the Input given to the {@link ComponentRendererOutletDirective.vcdComponentRendererOutlet}</p>\\n\",\"methods\":[]},{\"name\":\"DataExportRequestEvent\",\"id\":\"interface-DataExportRequestEvent-ec59737c87d6f2e488ec4dbc073c8ae6\",\"file\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';\\nimport { FormControl, FormGroup } from '@angular/forms';\\nimport { CsvExporterService } from './csv-exporter.service';\\n\\n/**\\n * Identifiers for each column that user is allowed to select\\n */\\nexport interface ExportColumn {\\n    /**\\n     * Displayed in the list of columns\\n     */\\n    displayName: string;\\n    /**\\n     * The name of the field in the JSON that is returned and converted to a viewable format\\n     */\\n    fieldName: string;\\n}\\n\\n/**\\n * Information passed to the caller so they can fetch the data\\n */\\nexport interface DataExportRequestEvent {\\n    /**\\n     * Call this to indicate a new value to be displayed in the progress indicator.\\n     * @param progress A number from 0 to 1 indicating download progress. Passing -1 will make it an indeterminate\\n     */\\n    updateProgress: (progress: number) => void;\\n\\n    /**\\n     * Call this when all records have been fetched to initiate the CSV creation.\\n     * This should only be called once after all data fetching is finished\\n     * @param records Records to be converted into a csv file\\n     */\\n    exportData: (records: object[]) => void;\\n\\n    /**\\n     * Columns selected by the user.\\n     */\\n    selectedColumns: ExportColumn[];\\n}\\n\\n/**\\n * A dialog to export data\\n *\\n *  - Allows the UI to select columns to be exported\\n *  - Provides a progress indicator\\n *  - Converts the data that is fetched by the caller into a CSV\\n */\\n@Component({\\n    selector: 'vcd-data-exporter',\\n    templateUrl: 'data-exporter.component.html',\\n    styleUrls: ['./data-exporter.component.scss'],\\n})\\nexport class DataExporterComponent implements OnInit {\\n    constructor(private csvExporterService: CsvExporterService) {}\\n\\n    /**\\n     * List of columns that can be exported, user may deselect some before sending the download request\\n     */\\n    @Input() columns: ExportColumn[] = [];\\n\\n    /**\\n     * The name of the file to be downloaded\\n     */\\n    @Input() fileName = 'data-export.csv';\\n\\n    /**\\n     * Text for the Dialog Header\\n     */\\n    @Input() dialogHeader: string;\\n\\n    /**\\n     * Text for the cancel button.\\n     */\\n    @Input() cancelText: string;\\n\\n    /**\\n     * Text for the select all button.\\n     */\\n    @Input() selectAllText: string;\\n\\n    /**\\n     * Text for the export button.\\n     */\\n    @Input() exportText: string;\\n\\n    /**\\n     * Whether a box to select/deselect all rows is available\\n     */\\n    @Input() showSelectAll = true;\\n\\n    /**\\n     * Whether the dialog is open\\n     */\\n    @Input()\\n    set open(value: boolean) {\\n        this._open = value;\\n        this.openChange.emit(value);\\n    }\\n    get open(): boolean {\\n        return this._open;\\n    }\\n\\n    private _open = false;\\n\\n    /**\\n     * Fires when {@link _open} changes. Its parameter indicates the new state.\\n     */\\n    @Output() openChange = new EventEmitter<boolean>();\\n\\n    /**\\n     * Called when the export is ready to be created\\n     */\\n    @Output() dataExportRequest = new EventEmitter<DataExportRequestEvent>();\\n\\n    /**\\n     * True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called\\n     * or an error is thrown\\n     */\\n    get isRequestPending(): boolean {\\n        return this._isRequestPending;\\n    }\\n    private _isRequestPending = false;\\n\\n    /**\\n     * Number between 0-1, used for displaying the progress bar.\\n     */\\n    get progress(): number {\\n        return this._progress;\\n    }\\n    private _progress = 0;\\n\\n    formGroup: FormGroup;\\n\\n    onClickExport(): void {\\n        this._isRequestPending = true;\\n        this.dataExportRequest.emit({\\n            exportData: this.exportData.bind(this),\\n            updateProgress: this.updateProgress.bind(this),\\n            selectedColumns: this.columns.filter(col => this.formGroup.controls[col.fieldName].value),\\n        });\\n    }\\n\\n    onClickCheckAll(): void {\\n        for (const column of this.columns) {\\n            this.formGroup.controls[column.fieldName].setValue(true);\\n        }\\n    }\\n\\n    get isSelectAllEnabled(): boolean {\\n        for (const column of this.columns) {\\n            if (!this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    get isExportEnabled(): boolean {\\n        if (this.isRequestPending) {\\n            return false;\\n        }\\n        for (const column of this.columns) {\\n            if (this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    ngOnInit(): void {\\n        const controls = this.columns.reduce((previousValue, currentValue) => {\\n            previousValue[currentValue.fieldName] = new FormControl(true);\\n            return previousValue;\\n        }, {});\\n        this.formGroup = new FormGroup(controls);\\n    }\\n\\n    private exportData(records: object[]): void {\\n        if (!this.open) {\\n            return;\\n        }\\n        this.open = false;\\n        this._isRequestPending = false;\\n\\n        const rows = [\\n            // First row is the display names\\n            Object.keys(records[0]).map(fieldName => this.getDisplayNameForField(fieldName)),\\n            // Then the data\\n            ...records.map(rec => Object.keys(rec).map(key => rec[key])),\\n        ];\\n\\n        const csvFile = this.csvExporterService.createCsv(rows);\\n        this.csvExporterService.downloadCsvFile(csvFile, this.fileName);\\n    }\\n\\n    private updateProgress(progress: number): void {\\n        this._progress = progress;\\n    }\\n\\n    private getDisplayNameForField(fieldName: string): string {\\n        for (const column of this.columns) {\\n            if (column.fieldName === fieldName) {\\n                return column.displayName;\\n            }\\n        }\\n        return fieldName;\\n    }\\n}\\n\",\"properties\":[{\"name\":\"exportData\",\"type\":\"function\",\"optional\":false,\"description\":\"<p>Call this when all records have been fetched to initiate the CSV creation.\\nThis should only be called once after all data fetching is finished</p>\\n\",\"line\":39,\"jsdoctags\":[{\"pos\":1147,\"end\":1207,\"flags\":0,\"kind\":292,\"atToken\":{\"pos\":1147,\"end\":1148,\"flags\":0,\"kind\":57},\"tagName\":{\"pos\":1148,\"end\":1153,\"flags\":0,\"escapedText\":\"param\"},\"name\":{\"pos\":1154,\"end\":1161,\"flags\":0,\"escapedText\":\"records\"},\"isNameFirst\":true,\"isBracketed\":false,\"comment\":\"<p>Records to be converted into a csv file</p>\\n\"}]},{\"name\":\"selectedColumns\",\"type\":\"ExportColumn[]\",\"optional\":false,\"description\":\"<p>Columns selected by the user.</p>\\n\",\"line\":44},{\"name\":\"updateProgress\",\"type\":\"function\",\"optional\":false,\"description\":\"<p>Call this to indicate a new value to be displayed in the progress indicator.</p>\\n\",\"line\":32,\"jsdoctags\":[{\"pos\":810,\"end\":923,\"flags\":0,\"kind\":292,\"atToken\":{\"pos\":810,\"end\":811,\"flags\":0,\"kind\":57},\"tagName\":{\"pos\":811,\"end\":816,\"flags\":0,\"escapedText\":\"param\"},\"name\":{\"pos\":817,\"end\":825,\"flags\":0,\"escapedText\":\"progress\"},\"isNameFirst\":true,\"isBracketed\":false,\"comment\":\"<p>A number from 0 to 1 indicating download progress. Passing -1 will make it an indeterminate</p>\\n\"}]}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Information passed to the caller so they can fetch the data</p>\\n\",\"methods\":[]},{\"name\":\"ExportColumn\",\"id\":\"interface-ExportColumn-ec59737c87d6f2e488ec4dbc073c8ae6\",\"file\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';\\nimport { FormControl, FormGroup } from '@angular/forms';\\nimport { CsvExporterService } from './csv-exporter.service';\\n\\n/**\\n * Identifiers for each column that user is allowed to select\\n */\\nexport interface ExportColumn {\\n    /**\\n     * Displayed in the list of columns\\n     */\\n    displayName: string;\\n    /**\\n     * The name of the field in the JSON that is returned and converted to a viewable format\\n     */\\n    fieldName: string;\\n}\\n\\n/**\\n * Information passed to the caller so they can fetch the data\\n */\\nexport interface DataExportRequestEvent {\\n    /**\\n     * Call this to indicate a new value to be displayed in the progress indicator.\\n     * @param progress A number from 0 to 1 indicating download progress. Passing -1 will make it an indeterminate\\n     */\\n    updateProgress: (progress: number) => void;\\n\\n    /**\\n     * Call this when all records have been fetched to initiate the CSV creation.\\n     * This should only be called once after all data fetching is finished\\n     * @param records Records to be converted into a csv file\\n     */\\n    exportData: (records: object[]) => void;\\n\\n    /**\\n     * Columns selected by the user.\\n     */\\n    selectedColumns: ExportColumn[];\\n}\\n\\n/**\\n * A dialog to export data\\n *\\n *  - Allows the UI to select columns to be exported\\n *  - Provides a progress indicator\\n *  - Converts the data that is fetched by the caller into a CSV\\n */\\n@Component({\\n    selector: 'vcd-data-exporter',\\n    templateUrl: 'data-exporter.component.html',\\n    styleUrls: ['./data-exporter.component.scss'],\\n})\\nexport class DataExporterComponent implements OnInit {\\n    constructor(private csvExporterService: CsvExporterService) {}\\n\\n    /**\\n     * List of columns that can be exported, user may deselect some before sending the download request\\n     */\\n    @Input() columns: ExportColumn[] = [];\\n\\n    /**\\n     * The name of the file to be downloaded\\n     */\\n    @Input() fileName = 'data-export.csv';\\n\\n    /**\\n     * Text for the Dialog Header\\n     */\\n    @Input() dialogHeader: string;\\n\\n    /**\\n     * Text for the cancel button.\\n     */\\n    @Input() cancelText: string;\\n\\n    /**\\n     * Text for the select all button.\\n     */\\n    @Input() selectAllText: string;\\n\\n    /**\\n     * Text for the export button.\\n     */\\n    @Input() exportText: string;\\n\\n    /**\\n     * Whether a box to select/deselect all rows is available\\n     */\\n    @Input() showSelectAll = true;\\n\\n    /**\\n     * Whether the dialog is open\\n     */\\n    @Input()\\n    set open(value: boolean) {\\n        this._open = value;\\n        this.openChange.emit(value);\\n    }\\n    get open(): boolean {\\n        return this._open;\\n    }\\n\\n    private _open = false;\\n\\n    /**\\n     * Fires when {@link _open} changes. Its parameter indicates the new state.\\n     */\\n    @Output() openChange = new EventEmitter<boolean>();\\n\\n    /**\\n     * Called when the export is ready to be created\\n     */\\n    @Output() dataExportRequest = new EventEmitter<DataExportRequestEvent>();\\n\\n    /**\\n     * True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called\\n     * or an error is thrown\\n     */\\n    get isRequestPending(): boolean {\\n        return this._isRequestPending;\\n    }\\n    private _isRequestPending = false;\\n\\n    /**\\n     * Number between 0-1, used for displaying the progress bar.\\n     */\\n    get progress(): number {\\n        return this._progress;\\n    }\\n    private _progress = 0;\\n\\n    formGroup: FormGroup;\\n\\n    onClickExport(): void {\\n        this._isRequestPending = true;\\n        this.dataExportRequest.emit({\\n            exportData: this.exportData.bind(this),\\n            updateProgress: this.updateProgress.bind(this),\\n            selectedColumns: this.columns.filter(col => this.formGroup.controls[col.fieldName].value),\\n        });\\n    }\\n\\n    onClickCheckAll(): void {\\n        for (const column of this.columns) {\\n            this.formGroup.controls[column.fieldName].setValue(true);\\n        }\\n    }\\n\\n    get isSelectAllEnabled(): boolean {\\n        for (const column of this.columns) {\\n            if (!this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    get isExportEnabled(): boolean {\\n        if (this.isRequestPending) {\\n            return false;\\n        }\\n        for (const column of this.columns) {\\n            if (this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    ngOnInit(): void {\\n        const controls = this.columns.reduce((previousValue, currentValue) => {\\n            previousValue[currentValue.fieldName] = new FormControl(true);\\n            return previousValue;\\n        }, {});\\n        this.formGroup = new FormGroup(controls);\\n    }\\n\\n    private exportData(records: object[]): void {\\n        if (!this.open) {\\n            return;\\n        }\\n        this.open = false;\\n        this._isRequestPending = false;\\n\\n        const rows = [\\n            // First row is the display names\\n            Object.keys(records[0]).map(fieldName => this.getDisplayNameForField(fieldName)),\\n            // Then the data\\n            ...records.map(rec => Object.keys(rec).map(key => rec[key])),\\n        ];\\n\\n        const csvFile = this.csvExporterService.createCsv(rows);\\n        this.csvExporterService.downloadCsvFile(csvFile, this.fileName);\\n    }\\n\\n    private updateProgress(progress: number): void {\\n        this._progress = progress;\\n    }\\n\\n    private getDisplayNameForField(fieldName: string): string {\\n        for (const column of this.columns) {\\n            if (column.fieldName === fieldName) {\\n                return column.displayName;\\n            }\\n        }\\n        return fieldName;\\n    }\\n}\\n\",\"properties\":[{\"name\":\"displayName\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>Displayed in the list of columns</p>\\n\",\"line\":17},{\"name\":\"fieldName\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>The name of the field in the JSON that is returned and converted to a viewable format</p>\\n\",\"line\":21}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Identifiers for each column that user is allowed to select</p>\\n\",\"methods\":[]},{\"name\":\"FindableWidget\",\"id\":\"interface-FindableWidget-a682f3364d413a84f7f91019a154a7a7\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"sourceCode\":\"import { DebugElement, Type } from '@angular/core';\\nimport { ComponentFixture, TestBed } from '@angular/core/testing';\\nimport { By } from '@angular/platform-browser';\\nimport { FindableWidget } from './widget-object';\\n\\n/**\\n * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n *\\n * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\n * queries the internals of a component from a test.\\n *\\n * ## Subclass Rules\\n *\\n * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\n * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\n * assert code on its own.\\n *\\n * `T` is the type of the JS/TS object being wrapped\\n *\\n * It is recommended that files for implementations be named with a `.wo.ts` extension\\n */\\nexport abstract class WidgetObject<T> {\\n    /**\\n     *\\n     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\n     * need to find a widget within the tree, you should use {@link find}.\\n     *\\n     * @param component The component instance being managed. Whenever possible, we should access the component's API.\\n     * @param root The root element (host) for the component instance. We typically prefer to interact with the\\n     * component but there are times when we must check the DOM.\\n     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that\\n     * requires re-rendering of the DOM.\\n     */\\n    constructor(\\n        protected fixture: ComponentFixture<any>,\\n        protected root: DebugElement = fixture.debugElement,\\n        public component: T = fixture.componentInstance\\n    ) {}\\n\\n    detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Finds first element within this widget matching the given selector\\n     * @param cssSelector What to search for\\n     * @param parent Where to start the search; defaults to the root of this component\\n     */\\n    protected findElement(cssSelector: string, parent: DebugElement = this.root): DebugElement {\\n        return parent.query(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link findElement} but returns all elements\\n     */\\n    protected findElements(cssSelector: string, parent: DebugElement = this.root): DebugElement[] {\\n        return parent.queryAll(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Clicks an element and detects changes so the DOM is immediately updated\\n     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will\\n     * receive the click event\\n     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.\\n     */\\n    protected click(cssSelector?: string, parent: DebugElement = this.root): void {\\n        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;\\n        nativeElement.click();\\n        this.detectChanges();\\n    }\\n\\n    /**\\n     * Returns text content of this widget\\n     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.\\n     */\\n\\n    protected getText(cssSelector: string): string {\\n        return this.getNodeText(this.findElement(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link getText} but return the text for all matching nodes\\n     */\\n    protected getTexts(cssSelector: string): string[] {\\n        return this.findElements(cssSelector).map(el => this.getNodeText(el));\\n    }\\n\\n    protected getNodeText(el: DebugElement): string {\\n        // The || '' is because textContent could technically be null when passed in the document\\n        // element object. We know that cannot be pased in here, so we ignore it for coverage\\n        // but we still need the line there to make strictNullChecks work\\n        return el.nativeElement.textContent || /* istanbul ignore next */ '';\\n    }\\n}\\n\\n/**\\n * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}\\n *\\n * ## Note\\n * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this\\n * interface represents a constructor for a {@link WidgetObject}, not an instance.\\n */\\nexport interface FindableWidget<T> extends Type<WidgetObject<T>> {\\n    tagName: string;\\n}\\n\\n/**\\n * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}\\n */\\ninterface FindParams<T> {\\n    /**\\n     * The constructor of the widget to be found\\n     */\\n    woConstructor: T;\\n    /**\\n     * If provided, search starts from this container. It defaults to the fixture's root debugElement\\n     */\\n    ancestor?: DebugElement;\\n    /**\\n     * Optional CSS class name that can be used when there could be multiple instances of the object within the\\n     * fixture tree\\n     */\\n    className?: string;\\n}\\n\\n/**\\n * Finds instances that implement {@link FindableWidget}\\n * H is the host component's type\\n */\\nexport class WidgetFinder<H = unknown> {\\n    /**\\n     * We don't care or could possibly know the type of fixture\\n     */\\n    private fixture: ComponentFixture<H>;\\n\\n    /**\\n     * If you need direct access to manipulate the host\\n     */\\n    public hostComponent: H;\\n\\n    /**\\n     * @param componentConstructor The host component to be created as the root of the tests's fixture\\n     */\\n    constructor(componentConstructor: Type<H>) {\\n        this.fixture = TestBed.createComponent(componentConstructor);\\n        this.hostComponent = this.fixture.componentInstance;\\n    }\\n\\n    /**\\n     * Finds widgets within a fixture\\n     * @return A Potentially empty list of widgets matching the given specs\\n     */\\n    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T>[] {\\n        const defaults = { ancestor: this.fixture.debugElement, className: '' };\\n        const { woConstructor, ancestor, className } = isFindParamsObject(params)\\n            ? { ...defaults, ...params }\\n            : { ...defaults, woConstructor: params };\\n\\n        let query = woConstructor.tagName;\\n        if (className) {\\n            query += `.${className}`;\\n        }\\n        const componentRoots = ancestor.queryAll(By.css(query));\\n        const widgets = componentRoots.map(\\n            // Typescript is not able to infer it correctly as the subclass but we know for sure\\n            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>\\n        );\\n        return widgets;\\n    }\\n\\n    /**\\n     * Finds a single widget object\\n     * @throws An error if the widget is not found or if there are multiple instances\\n     */\\n    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {\\n        const widgets = this.findWidgets(params);\\n        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;\\n        if (widgets.length === 0) {\\n            throw Error(`Did not find a <${tagName}>`);\\n        }\\n        if (widgets.length > 1) {\\n            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);\\n        }\\n        return widgets[0] as InstanceType<T>;\\n    }\\n\\n    public detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n}\\n\\nfunction isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {\\n    return !!(params as FindParams<T>).woConstructor;\\n}\\n/**\\n * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures\\n */\\nexport interface HasFinder<T = unknown> {\\n    finder: WidgetFinder<T>;\\n}\\n\",\"properties\":[{\"name\":\"tagName\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":110}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}</p>\\n<h2 id=\\\"note\\\">Note</h2>\\n<p>This is done by creating a static property <code>tagName</code>on your subclass, not a regular instance, since this\\ninterface represents a constructor for a {@link WidgetObject}, not an instance.</p>\\n\",\"methods\":[],\"extends\":\"Type\"},{\"name\":\"FindParams\",\"id\":\"interface-FindParams-a682f3364d413a84f7f91019a154a7a7\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"sourceCode\":\"import { DebugElement, Type } from '@angular/core';\\nimport { ComponentFixture, TestBed } from '@angular/core/testing';\\nimport { By } from '@angular/platform-browser';\\nimport { FindableWidget } from './widget-object';\\n\\n/**\\n * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n *\\n * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\n * queries the internals of a component from a test.\\n *\\n * ## Subclass Rules\\n *\\n * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\n * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\n * assert code on its own.\\n *\\n * `T` is the type of the JS/TS object being wrapped\\n *\\n * It is recommended that files for implementations be named with a `.wo.ts` extension\\n */\\nexport abstract class WidgetObject<T> {\\n    /**\\n     *\\n     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\n     * need to find a widget within the tree, you should use {@link find}.\\n     *\\n     * @param component The component instance being managed. Whenever possible, we should access the component's API.\\n     * @param root The root element (host) for the component instance. We typically prefer to interact with the\\n     * component but there are times when we must check the DOM.\\n     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that\\n     * requires re-rendering of the DOM.\\n     */\\n    constructor(\\n        protected fixture: ComponentFixture<any>,\\n        protected root: DebugElement = fixture.debugElement,\\n        public component: T = fixture.componentInstance\\n    ) {}\\n\\n    detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Finds first element within this widget matching the given selector\\n     * @param cssSelector What to search for\\n     * @param parent Where to start the search; defaults to the root of this component\\n     */\\n    protected findElement(cssSelector: string, parent: DebugElement = this.root): DebugElement {\\n        return parent.query(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link findElement} but returns all elements\\n     */\\n    protected findElements(cssSelector: string, parent: DebugElement = this.root): DebugElement[] {\\n        return parent.queryAll(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Clicks an element and detects changes so the DOM is immediately updated\\n     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will\\n     * receive the click event\\n     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.\\n     */\\n    protected click(cssSelector?: string, parent: DebugElement = this.root): void {\\n        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;\\n        nativeElement.click();\\n        this.detectChanges();\\n    }\\n\\n    /**\\n     * Returns text content of this widget\\n     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.\\n     */\\n\\n    protected getText(cssSelector: string): string {\\n        return this.getNodeText(this.findElement(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link getText} but return the text for all matching nodes\\n     */\\n    protected getTexts(cssSelector: string): string[] {\\n        return this.findElements(cssSelector).map(el => this.getNodeText(el));\\n    }\\n\\n    protected getNodeText(el: DebugElement): string {\\n        // The || '' is because textContent could technically be null when passed in the document\\n        // element object. We know that cannot be pased in here, so we ignore it for coverage\\n        // but we still need the line there to make strictNullChecks work\\n        return el.nativeElement.textContent || /* istanbul ignore next */ '';\\n    }\\n}\\n\\n/**\\n * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}\\n *\\n * ## Note\\n * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this\\n * interface represents a constructor for a {@link WidgetObject}, not an instance.\\n */\\nexport interface FindableWidget<T> extends Type<WidgetObject<T>> {\\n    tagName: string;\\n}\\n\\n/**\\n * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}\\n */\\ninterface FindParams<T> {\\n    /**\\n     * The constructor of the widget to be found\\n     */\\n    woConstructor: T;\\n    /**\\n     * If provided, search starts from this container. It defaults to the fixture's root debugElement\\n     */\\n    ancestor?: DebugElement;\\n    /**\\n     * Optional CSS class name that can be used when there could be multiple instances of the object within the\\n     * fixture tree\\n     */\\n    className?: string;\\n}\\n\\n/**\\n * Finds instances that implement {@link FindableWidget}\\n * H is the host component's type\\n */\\nexport class WidgetFinder<H = unknown> {\\n    /**\\n     * We don't care or could possibly know the type of fixture\\n     */\\n    private fixture: ComponentFixture<H>;\\n\\n    /**\\n     * If you need direct access to manipulate the host\\n     */\\n    public hostComponent: H;\\n\\n    /**\\n     * @param componentConstructor The host component to be created as the root of the tests's fixture\\n     */\\n    constructor(componentConstructor: Type<H>) {\\n        this.fixture = TestBed.createComponent(componentConstructor);\\n        this.hostComponent = this.fixture.componentInstance;\\n    }\\n\\n    /**\\n     * Finds widgets within a fixture\\n     * @return A Potentially empty list of widgets matching the given specs\\n     */\\n    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T>[] {\\n        const defaults = { ancestor: this.fixture.debugElement, className: '' };\\n        const { woConstructor, ancestor, className } = isFindParamsObject(params)\\n            ? { ...defaults, ...params }\\n            : { ...defaults, woConstructor: params };\\n\\n        let query = woConstructor.tagName;\\n        if (className) {\\n            query += `.${className}`;\\n        }\\n        const componentRoots = ancestor.queryAll(By.css(query));\\n        const widgets = componentRoots.map(\\n            // Typescript is not able to infer it correctly as the subclass but we know for sure\\n            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>\\n        );\\n        return widgets;\\n    }\\n\\n    /**\\n     * Finds a single widget object\\n     * @throws An error if the widget is not found or if there are multiple instances\\n     */\\n    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {\\n        const widgets = this.findWidgets(params);\\n        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;\\n        if (widgets.length === 0) {\\n            throw Error(`Did not find a <${tagName}>`);\\n        }\\n        if (widgets.length > 1) {\\n            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);\\n        }\\n        return widgets[0] as InstanceType<T>;\\n    }\\n\\n    public detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n}\\n\\nfunction isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {\\n    return !!(params as FindParams<T>).woConstructor;\\n}\\n/**\\n * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures\\n */\\nexport interface HasFinder<T = unknown> {\\n    finder: WidgetFinder<T>;\\n}\\n\",\"properties\":[{\"name\":\"ancestor\",\"type\":\"DebugElement\",\"optional\":true,\"description\":\"<p>If provided, search starts from this container. It defaults to the fixture&#39;s root debugElement</p>\\n\",\"line\":124},{\"name\":\"className\",\"type\":\"string\",\"optional\":true,\"description\":\"<p>Optional CSS class name that can be used when there could be multiple instances of the object within the\\nfixture tree</p>\\n\",\"line\":129},{\"name\":\"woConstructor\",\"type\":\"T\",\"optional\":false,\"description\":\"<p>The constructor of the widget to be found</p>\\n\",\"line\":120}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}</p>\\n\",\"methods\":[]},{\"name\":\"GridColumn\",\"id\":\"interface-GridColumn-622ce312ac6e58d1013f2112edf950ac\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\",\"type\":\"interface\",\"sourceCode\":\"import { ComponentRendererSpec } from './component-renderer.interface';\\n\\nexport enum GridColumnHideable {\\n    /**\\n     * Does not show up in column toggle box\\n     */\\n    Never = 'NEVER',\\n    /**\\n     * Shows up in column toggle box, column is visible\\n     */\\n    Shown = 'SHOWN',\\n    /**\\n     * Shows up in column toggle box, column is hidden\\n     */\\n    Hidden = 'HIDDEN',\\n}\\n\\n/**\\n * The sorting direction of the column values\\n */\\nexport enum GridColumnSortDirection {\\n    Asc = 'ASCENDING',\\n    Desc = 'DESCENDING',\\n    None = 'NONE',\\n}\\n\\n/**\\n * Column renderer as a function. Defined in calling component when the cell value is calculated from different\\n * properties.\\n * @param record The record for the row being rendered\\n * @return The string to be displayed for that cell\\n */\\nexport type FunctionRenderer<T> = (record: T) => string;\\n\\n/**\\n * Configuration object defined in the caller. This contains properties for the column header (text, filtering,\\n * sorting, toggling etc.,) and content for row cells.\\n *\\n * Example:\\n * const gridColumn: GridColumn<SomeRecord> = {\\n *   displayName: \\\"Column Heading\\\",\\n *   renderer: \\\"someRecord.property\\\",\\n *   hideable: \\\"NEVER\\\"\\n * }\\n *\\n * The above column is rendered with \\\"Column Heading\\\" text in it's heading and it is not shown in the column toggler.\\n * The value of the property \\\"someRecord.property\\\" is rendered in cells corresponding to the column.\\n */\\nexport interface GridColumn<R> {\\n    /**\\n     * Header text for the column\\n     */\\n    displayName: string;\\n\\n    /**\\n     * Used for sorting/filtering. Not needed for columns not filterable/sortable\\n     * TODO: do we need to support array type for querying across multiple columns?\\n     */\\n    queryFieldName?: string;\\n\\n    /**\\n     * If the renderer passed in is a\\n     * - string: Used as default renderer. Can be a dot separated string to identify a nested property of the item\\n     * - {@link FunctionRenderer}: When you want to create a calculated column, but don't need custom HTML\\n     * - TemplateRef: When custom HTML is needed and when it has to be passed in as a inline HTML\\n     * - {@link ComponentRendererSpec}: When HTML is needed and when the HTML is provided as a component\\n     */\\n    renderer: string | FunctionRenderer<R> | ComponentRendererSpec<R, unknown>;\\n\\n    /**\\n     * Whether the column shows up in the column toggler and if the column shows up, it reflects the toggle state\\n     */\\n    hideable?: GridColumnHideable;\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * Try to avoid showing this before initial load.\\n     */\\n    emptyColumnPlaceholder?: string;\\n\\n    /**\\n     * TODO: Should this be made to work with top level search on grids across all columns?\\n     *  The above to-do is going to be worked on as part of https://jira.eng.vmware.com/browse/VDUCC-27 and\\n     */\\n    filter?: ComponentRendererSpec<R, unknown>;\\n}\\n\",\"properties\":[{\"name\":\"displayName\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>Header text for the column</p>\\n\",\"line\":61},{\"name\":\"emptyColumnPlaceholder\",\"type\":\"string\",\"optional\":true,\"description\":\"<p>When there is no data, show this message.</p>\\n<p>Try to avoid showing this before initial load.</p>\\n\",\"line\":88},{\"name\":\"filter\",\"type\":\"ComponentRendererSpec<R | unknown>\",\"optional\":true,\"description\":\"<p>TODO: Should this be made to work with top level search on grids across all columns?\\n  The above to-do is going to be worked on as part of <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-27\\\">https://jira.eng.vmware.com/browse/VDUCC-27</a> and</p>\\n\",\"line\":94},{\"name\":\"hideable\",\"type\":\"GridColumnHideable\",\"optional\":true,\"description\":\"<p>Whether the column shows up in the column toggler and if the column shows up, it reflects the toggle state</p>\\n\",\"line\":81},{\"name\":\"queryFieldName\",\"type\":\"string\",\"optional\":true,\"description\":\"<p>Used for sorting/filtering. Not needed for columns not filterable/sortable\\nTODO: do we need to support array type for querying across multiple columns?</p>\\n\",\"line\":67},{\"name\":\"renderer\",\"type\":\"string | FunctionRenderer<R> | ComponentRendererSpec<R | unknown>\",\"optional\":false,\"description\":\"<p>If the renderer passed in is a</p>\\n<ul>\\n<li>string: Used as default renderer. Can be a dot separated string to identify a nested property of the item</li>\\n<li>{@link FunctionRenderer}: When you want to create a calculated column, but don&#39;t need custom HTML</li>\\n<li>TemplateRef: When custom HTML is needed and when it has to be passed in as a inline HTML</li>\\n<li>{@link ComponentRendererSpec}: When HTML is needed and when the HTML is provided as a component</li>\\n</ul>\\n\",\"line\":76}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Configuration object defined in the caller. This contains properties for the column header (text, filtering,\\nsorting, toggling etc.,) and content for row cells.</p>\\n<p>Example:\\nconst gridColumn: GridColumn<SomeRecord> = {\\n   displayName: &quot;Column Heading&quot;,\\n   renderer: &quot;someRecord.property&quot;,\\n   hideable: &quot;NEVER&quot;\\n}</p>\\n<p>The above column is rendered with &quot;Column Heading&quot; text in it&#39;s heading and it is not shown in the column toggler.\\nThe value of the property &quot;someRecord.property&quot; is rendered in cells corresponding to the column.</p>\\n\",\"methods\":[]},{\"name\":\"GridDataFetchResult\",\"id\":\"interface-GridDataFetchResult-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"items\",\"type\":\"R[]\",\"optional\":false,\"description\":\"<p>Items to be listed in the grid</p>\\n\",\"line\":54},{\"name\":\"totalItems\",\"type\":\"number\",\"optional\":true,\"description\":\"<p>Total number of items</p>\\n\",\"line\":58}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Representation of data required for rendering contents of cells and pagination information</p>\\n\",\"methods\":[]},{\"name\":\"GridState\",\"id\":\"interface-GridState-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"pagination\",\"type\":\"PagionationInformation\",\"optional\":false,\"description\":\"<p>The pagination information that the datagrid should show.</p>\\n\",\"line\":111},{\"name\":\"sortColumn\",\"type\":\"SortedColumn\",\"optional\":true,\"description\":\"<p>The currently sorted column in the datagrid.</p>\\n\",\"line\":107}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\npart of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\nTODO: This interface is going to defined as part of working on the following tasks:\\n  <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-14\\\">https://jira.eng.vmware.com/browse/VDUCC-14</a>\\n  <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-15\\\">https://jira.eng.vmware.com/browse/VDUCC-15</a>\\n  <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-20\\\">https://jira.eng.vmware.com/browse/VDUCC-20</a></p>\\n\",\"methods\":[]},{\"name\":\"HasFinder\",\"id\":\"interface-HasFinder-a682f3364d413a84f7f91019a154a7a7\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"sourceCode\":\"import { DebugElement, Type } from '@angular/core';\\nimport { ComponentFixture, TestBed } from '@angular/core/testing';\\nimport { By } from '@angular/platform-browser';\\nimport { FindableWidget } from './widget-object';\\n\\n/**\\n * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n *\\n * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\n * queries the internals of a component from a test.\\n *\\n * ## Subclass Rules\\n *\\n * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\n * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\n * assert code on its own.\\n *\\n * `T` is the type of the JS/TS object being wrapped\\n *\\n * It is recommended that files for implementations be named with a `.wo.ts` extension\\n */\\nexport abstract class WidgetObject<T> {\\n    /**\\n     *\\n     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\n     * need to find a widget within the tree, you should use {@link find}.\\n     *\\n     * @param component The component instance being managed. Whenever possible, we should access the component's API.\\n     * @param root The root element (host) for the component instance. We typically prefer to interact with the\\n     * component but there are times when we must check the DOM.\\n     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that\\n     * requires re-rendering of the DOM.\\n     */\\n    constructor(\\n        protected fixture: ComponentFixture<any>,\\n        protected root: DebugElement = fixture.debugElement,\\n        public component: T = fixture.componentInstance\\n    ) {}\\n\\n    detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Finds first element within this widget matching the given selector\\n     * @param cssSelector What to search for\\n     * @param parent Where to start the search; defaults to the root of this component\\n     */\\n    protected findElement(cssSelector: string, parent: DebugElement = this.root): DebugElement {\\n        return parent.query(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link findElement} but returns all elements\\n     */\\n    protected findElements(cssSelector: string, parent: DebugElement = this.root): DebugElement[] {\\n        return parent.queryAll(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Clicks an element and detects changes so the DOM is immediately updated\\n     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will\\n     * receive the click event\\n     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.\\n     */\\n    protected click(cssSelector?: string, parent: DebugElement = this.root): void {\\n        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;\\n        nativeElement.click();\\n        this.detectChanges();\\n    }\\n\\n    /**\\n     * Returns text content of this widget\\n     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.\\n     */\\n\\n    protected getText(cssSelector: string): string {\\n        return this.getNodeText(this.findElement(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link getText} but return the text for all matching nodes\\n     */\\n    protected getTexts(cssSelector: string): string[] {\\n        return this.findElements(cssSelector).map(el => this.getNodeText(el));\\n    }\\n\\n    protected getNodeText(el: DebugElement): string {\\n        // The || '' is because textContent could technically be null when passed in the document\\n        // element object. We know that cannot be pased in here, so we ignore it for coverage\\n        // but we still need the line there to make strictNullChecks work\\n        return el.nativeElement.textContent || /* istanbul ignore next */ '';\\n    }\\n}\\n\\n/**\\n * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}\\n *\\n * ## Note\\n * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this\\n * interface represents a constructor for a {@link WidgetObject}, not an instance.\\n */\\nexport interface FindableWidget<T> extends Type<WidgetObject<T>> {\\n    tagName: string;\\n}\\n\\n/**\\n * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}\\n */\\ninterface FindParams<T> {\\n    /**\\n     * The constructor of the widget to be found\\n     */\\n    woConstructor: T;\\n    /**\\n     * If provided, search starts from this container. It defaults to the fixture's root debugElement\\n     */\\n    ancestor?: DebugElement;\\n    /**\\n     * Optional CSS class name that can be used when there could be multiple instances of the object within the\\n     * fixture tree\\n     */\\n    className?: string;\\n}\\n\\n/**\\n * Finds instances that implement {@link FindableWidget}\\n * H is the host component's type\\n */\\nexport class WidgetFinder<H = unknown> {\\n    /**\\n     * We don't care or could possibly know the type of fixture\\n     */\\n    private fixture: ComponentFixture<H>;\\n\\n    /**\\n     * If you need direct access to manipulate the host\\n     */\\n    public hostComponent: H;\\n\\n    /**\\n     * @param componentConstructor The host component to be created as the root of the tests's fixture\\n     */\\n    constructor(componentConstructor: Type<H>) {\\n        this.fixture = TestBed.createComponent(componentConstructor);\\n        this.hostComponent = this.fixture.componentInstance;\\n    }\\n\\n    /**\\n     * Finds widgets within a fixture\\n     * @return A Potentially empty list of widgets matching the given specs\\n     */\\n    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T>[] {\\n        const defaults = { ancestor: this.fixture.debugElement, className: '' };\\n        const { woConstructor, ancestor, className } = isFindParamsObject(params)\\n            ? { ...defaults, ...params }\\n            : { ...defaults, woConstructor: params };\\n\\n        let query = woConstructor.tagName;\\n        if (className) {\\n            query += `.${className}`;\\n        }\\n        const componentRoots = ancestor.queryAll(By.css(query));\\n        const widgets = componentRoots.map(\\n            // Typescript is not able to infer it correctly as the subclass but we know for sure\\n            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>\\n        );\\n        return widgets;\\n    }\\n\\n    /**\\n     * Finds a single widget object\\n     * @throws An error if the widget is not found or if there are multiple instances\\n     */\\n    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {\\n        const widgets = this.findWidgets(params);\\n        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;\\n        if (widgets.length === 0) {\\n            throw Error(`Did not find a <${tagName}>`);\\n        }\\n        if (widgets.length > 1) {\\n            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);\\n        }\\n        return widgets[0] as InstanceType<T>;\\n    }\\n\\n    public detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n}\\n\\nfunction isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {\\n    return !!(params as FindParams<T>).woConstructor;\\n}\\n/**\\n * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures\\n */\\nexport interface HasFinder<T = unknown> {\\n    finder: WidgetFinder<T>;\\n}\\n\",\"properties\":[{\"name\":\"finder\",\"type\":\"WidgetFinder<T>\",\"optional\":false,\"description\":\"\",\"line\":205}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Can be used in tests that use <code>this</code> to share a finder with before/AfterEach instead of leaky closures</p>\\n\",\"methods\":[]},{\"name\":\"HasHref\",\"id\":\"interface-HasHref-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"href\",\"type\":\"string\",\"optional\":true,\"description\":\"\",\"line\":79}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>Representation an entity that has a href property.</p>\\n\",\"methods\":[]},{\"name\":\"PagionationInformation\",\"id\":\"interface-PagionationInformation-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"itemsPerPage\",\"type\":\"number\",\"optional\":false,\"description\":\"<p>How many items belong on a page.</p>\\n\",\"line\":93},{\"name\":\"pageNumber\",\"type\":\"number\",\"optional\":false,\"description\":\"<p>What page is currently selected.</p>\\n\",\"line\":89}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>The information about pagionation that will be exposed.</p>\\n\",\"methods\":[]},{\"name\":\"SortedColumn\",\"id\":\"interface-SortedColumn-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"properties\":[{\"name\":\"name\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>The name of the column that is sorted.</p>\\n\",\"line\":72},{\"name\":\"reverse\",\"type\":\"boolean\",\"optional\":false,\"description\":\"<p>Whether the column is sorted normally or reversed.</p>\\n\",\"line\":68}],\"indexSignatures\":[],\"kind\":150,\"description\":\"<p>The information about the currently sorted column.</p>\\n\",\"methods\":[]}],\"injectables\":[{\"name\":\"CsvExporterService\",\"id\":\"injectable-CsvExporterService-8f65408887e8a3aabd40309e88a00f8e\",\"file\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"properties\":[],\"methods\":[{\"name\":\"createCsv\",\"args\":[{\"name\":\"rows\",\"type\":\"any[][]\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":19,\"description\":\"<p>Creates a string that can be used to create a Blob for a CSV</p>\\n\",\"modifierKind\":[114],\"jsdoctags\":[{\"name\":{\"pos\":347,\"end\":351,\"flags\":0,\"escapedText\":\"rows\"},\"type\":\"any[][]\",\"tagName\":{\"pos\":341,\"end\":346,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>2D array of data. First row is the names for the fields</p>\\n\"}]},{\"name\":\"downloadCsvFile\",\"args\":[{\"name\":\"csvFile\",\"type\":\"string\"},{\"name\":\"filename\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":28,\"description\":\"<p>Does a client side download</p>\\n\",\"modifierKind\":[114],\"jsdoctags\":[{\"name\":{\"pos\":586,\"end\":593,\"flags\":0,\"escapedText\":\"csvFile\"},\"type\":\"string\",\"tagName\":{\"pos\":580,\"end\":585,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The string contents of a CSV file to be downloaded</p>\\n\"},{\"name\":{\"pos\":659,\"end\":667,\"flags\":0,\"escapedText\":\"filename\"},\"type\":\"string\",\"tagName\":{\"pos\":653,\"end\":658,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The name of the file to be downloaded</p>\\n\"}]}],\"description\":\"\",\"sourceCode\":\"import { Injectable } from '@angular/core';\\n\\n@Injectable({\\n    providedIn: 'root',\\n})\\n/**\\n * Encodes a data set to be downloaded as a CSV\\n */\\nexport class CsvExporterService {\\n    /**\\n     * Creates a string that can be used to create a Blob for a CSV\\n     * @param rows 2D array of data. First row is the names for the fields\\n     */\\n    public createCsv(rows: any[][]): string {\\n        return rows.map(row => processRow(row)).join('\\\\n');\\n    }\\n\\n    /**\\n     * Does a client side download\\n     * @param csvFile The string contents of a CSV file to be downloaded\\n     * @param filename The name of the file to be downloaded\\n     */\\n    public downloadCsvFile(csvFile: string, filename: string): void {\\n        const mimeType = 'text/csv;charset=utf-8;';\\n        const blob = new Blob([csvFile], { type: mimeType });\\n        // Jan 1, 2020 - Chrome and IE support this\\n        if (navigator.msSaveBlob) {\\n            navigator.msSaveBlob(blob, filename);\\n        } else {\\n            const link = document.createElement('a');\\n            const url = URL.createObjectURL(blob);\\n            link.setAttribute('href', url);\\n            link.setAttribute('download', filename);\\n            link.style.visibility = 'hidden';\\n            document.body.appendChild(link);\\n            link.click();\\n            document.body.removeChild(link);\\n        }\\n    }\\n}\\n\\n/**\\n * Returns a string\\n * @param row A list of cells to be turned into a CSV string, separated by commas\\n */\\nfunction processRow(row: unknown[]): string {\\n    return row.map(cell => encodeValue(cell)).join(',');\\n}\\n\\n/**\\n * Returns a cell's cellValue encoded against spaces, quotes, and CSV injection character\\n * @param cellValue Cell cellValue to be encoded\\n */\\nfunction encodeValue(cellValue: unknown): string {\\n    let innerValue = cellValue == null ? '' : cellValue.toString();\\n    if (cellValue instanceof Date) {\\n        innerValue = cellValue.toLocaleString();\\n    }\\n    // Double quotes are doubled\\n    let result = innerValue.replace(/\\\"/g, '\\\"\\\"');\\n\\n    // TODO: See https://jira.eng.vmware.com/browse/VDUCC-59\\n    // result = escapeAgainstCsvInjection(result);\\n\\n    // Add quotes around the whole thing if it contains new lines\\n    if (result.search(/[\\\",\\\\n]/g) >= 0) {\\n        result = `\\\"${result}\\\"`;\\n    }\\n    // Escape against\\n    return result;\\n}\\n\\n/**\\n * TODO: See https://jira.eng.vmware.com/browse/VDUCC-59\\n * Prepends a single quote to a value if it starts with =,+,=,@ to prevent formulas from being executed\\n * @param value Value to be escaped\\n */\\n// function escapeAgainstCsvInjection(value: string): string {\\n//     if (/^[=+\\\\-@|%]/.test(value)) {\\n//         return `'${value}'`;\\n//     }\\n//     return value;\\n// }\\n\",\"type\":\"injectable\"}],\"classes\":[{\"name\":\"CliptextWidgetObject\",\"id\":\"class-CliptextWidgetObject-c94f1dd5e48e84d2df6cfdf5945c18ed\",\"file\":\"projects/components/src/cliptext/cliptext.wo.ts\",\"type\":\"class\",\"sourceCode\":\"import { WidgetObject } from '../utils/test/widget-object';\\nimport { CliptextComponent } from './cliptext.component';\\n\\n/**\\n * Testing Object for {@link CliptextComponent}\\n */\\nexport class CliptextWidgetObject extends WidgetObject<CliptextComponent> {\\n    static tagName = 'vcd-cliptext';\\n\\n    /**\\n     * Sends a mouseenter event for clr tooltip\\n     */\\n    mouseEnter(): void {\\n        this.findElement('.cliptext-container').triggerEventHandler('mouseenter', null);\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Sends a mouseleave event for clr tooltip\\n     */\\n    mouseLeave(): void {\\n        this.findElement('.cliptext-container').triggerEventHandler('mouseleave', null);\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Whether the tooltip is visible\\n     */\\n    get isShowingTooltip(): boolean {\\n        return Boolean(this.findElement('clr-tooltip-content'));\\n    }\\n\\n    /**\\n     * The text content of the tooltip\\n     */\\n    get tooltipContent(): string {\\n        return this.getText('clr-tooltip-content');\\n    }\\n}\\n\",\"properties\":[{\"name\":\"tagName\",\"defaultValue\":\"'vcd-cliptext'\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":13,\"modifierKind\":[115]},{\"name\":\"component\",\"defaultValue\":\"fixture.componentInstance\",\"type\":\"T\",\"optional\":false,\"description\":\"The component instance being managed. Whenever possible, we should access the component's API.\",\"line\":43,\"modifierKind\":[114],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"description\":\"<p>Testing Object for {@link CliptextComponent}</p>\\n\",\"rawdescription\":\"Testing Object for {@link CliptextComponent}\",\"methods\":[{\"name\":\"mouseEnter\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":18,\"description\":\"<p>Sends a mouseenter event for clr tooltip</p>\\n\"},{\"name\":\"mouseLeave\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":26,\"description\":\"<p>Sends a mouseleave event for clr tooltip</p>\\n\"},{\"name\":\"click\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"optional\":true},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":72,\"description\":\"<p>Clicks an element and detects changes so the DOM is immediately updated</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2836,\"end\":2847,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"optional\":true,\"tagName\":{\"pos\":2830,\"end\":2835,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to click a specific element. If not passed in, the entire node will\\nreceive the click event</p>\\n\"},{\"name\":{\"pos\":2986,\"end\":2992,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2980,\"end\":2985,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>the parent element for which to search for the {</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"detectChanges\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":46,\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElement\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement\",\"typeParameters\":[],\"line\":55,\"description\":\"<p>Finds first element within this widget matching the given selector</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2219,\"end\":2230,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":2213,\"end\":2218,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>What to search for</p>\\n\"},{\"name\":{\"pos\":2264,\"end\":2270,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2258,\"end\":2263,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Where to start the search; defaults to the root of this component</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElements\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement[]\",\"typeParameters\":[],\"line\":62,\"description\":\"<p>Same as {@link findElement} but returns all elements</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getNodeText\",\"args\":[{\"name\":\"el\",\"type\":\"DebugElement\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":94,\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"el\",\"type\":\"DebugElement\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getText\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":83,\"description\":\"<p>Returns text content of this widget</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":3424,\"end\":3435,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":3418,\"end\":3423,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to retrieve text for a specific element within this widget.</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getTexts\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":90,\"description\":\"<p>Same as {@link getText} but return the text for all matching nodes</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"indexSignatures\":[],\"extends\":\"WidgetObject\",\"accessors\":{\"isShowingTooltip\":{\"name\":\"isShowingTooltip\",\"getSignature\":{\"name\":\"isShowingTooltip\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":34,\"description\":\"<p>Whether the tooltip is visible</p>\\n\"}},\"tooltipContent\":{\"name\":\"tooltipContent\",\"getSignature\":{\"name\":\"tooltipContent\",\"type\":\"string\",\"returnType\":\"string\",\"line\":41,\"description\":\"<p>The text content of the tooltip</p>\\n\"}}},\"inputsClass\":[],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[]},{\"name\":\"ClrDatagridWidgetObject\",\"id\":\"class-ClrDatagridWidgetObject-1a7ce4b07a4cdfaf456f7b07d9807cca\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"class\",\"sourceCode\":\"import { GridSelectionType } from './../../../datagrid/datagrid.component';\\n/*!\\n * Copyright 2019 VMware, Inc.\\n * SPDX-License-Identifier: BSD-2-Clause\\n */\\n\\nimport { WidgetObject } from '../widget-object';\\nimport { DebugElement } from '@angular/core';\\nimport { ClrDatagrid } from '@clr/angular';\\n\\nconst ROW_TAG = 'clr-dg-row';\\nconst CELL_TAG = 'clr-dg-cell';\\nconst COLUMN_SELECTOR = 'clr-dg-column';\\nconst COLUMN_CSS_SELECTOR = '.datagrid-column-title';\\n\\n/**\\n * Widget Object for a Clarity DataGrid\\n */\\nexport class ClrDatagridWidgetObject extends WidgetObject<ClrDatagrid> {\\n    static tagName = `clr-datagrid`;\\n\\n    /**\\n     * Retrieves the text content of a cell\\n     * @param row 0-based index of row\\n     * @param column 0-based index of column\\n     */\\n    getCellText(row: number, column: number): string {\\n        return this.getNodeText(this.getCell(row, column));\\n    }\\n\\n    /**\\n     * Returns the number of visible columns\\n     */\\n    get columnCount(): number {\\n        return this.component.columns ? this.component.columns.length : this.columns.length;\\n    }\\n\\n    /**\\n     * Returns the text for a header\\n     * @param columnIndex 0-based index of header to retrieve\\n     */\\n    getColumnHeader(columnIndex: number): string {\\n        return this.getText(`${COLUMN_CSS_SELECTOR}:nth-of-type(${columnIndex + 1})`);\\n    }\\n\\n    /**\\n     * Returns an array of the texts for columns, in DOM order\\n     */\\n    get columnHeaders(): string[] {\\n        return this.getTexts(COLUMN_CSS_SELECTOR);\\n    }\\n\\n    /**\\n     * Returns the number of rows currently displayed\\n     */\\n    get rowCount(): number {\\n        return this.rows.length;\\n    }\\n\\n    /**\\n     * Returns whether or not the column with the given index is displayed by the CSS.\\n     */\\n    isColumnDisplayed(index: number): boolean {\\n        return this.findElements(COLUMN_SELECTOR)[index].classes['datagrid-hidden-column'] !== true;\\n    }\\n\\n    /*\\n     * Returns the CSS class of the Clarity datagrid.\\n     */\\n    get gridCssClass(): string[] {\\n        return Object.keys(this.root.classes);\\n    }\\n\\n    /**\\n     * Returns the CSS class names of the given Clarity datarow.\\n     */\\n    getRowsCssClass(index: number): string[] {\\n        return Object.keys(this.rows[index].classes);\\n    }\\n\\n    /**\\n     * Returns the native element contents within all the detail pane open.\\n     */\\n    getAllDetailContents(): string[] {\\n        return this.findElements('clr-dg-row-detail').map(detail => detail.nativeElement);\\n    }\\n\\n    /**\\n     * Clicks the given details button.\\n     */\\n    clickDetailsButton(row: number): void {\\n        this.detailsButtons[row].nativeElement.click();\\n    }\\n\\n    /**\\n     * Sorts the column at the given index.\\n     */\\n    sortColumn(index: number): void {\\n        this.columns[index].nativeElement.click();\\n    }\\n\\n    /**\\n     * Returns the selection type of the grid.\\n     */\\n    getSelectionType(): GridSelectionType {\\n        if (this.findElements('clr-checkbox-wrapper').length !== 0) {\\n            return GridSelectionType.Multi;\\n        } else if (this.findElements('clr-radio-wrapper').length !== 0) {\\n            return GridSelectionType.Single;\\n        } else {\\n            return GridSelectionType.None;\\n        }\\n    }\\n\\n    /**\\n     * Clicks the selection icon on the given row.\\n     */\\n    selectRow(row: number): void {\\n        this.click(`input`, this.rows[row]);\\n    }\\n\\n    /**\\n     * Gives the pagination description text.\\n     */\\n    getPaginationDescription(): string {\\n        return this.findElement('.pagination-description').nativeElement.textContent;\\n    }\\n\\n    /**\\n     * Gives the text next to the pagination selector.\\n     */\\n    getPaginationSizeSelectorText(): string {\\n        return this.findElement('clr-dg-page-size').nativeElement.textContent;\\n    }\\n\\n    /**\\n     * Clicks the next page button.\\n     */\\n    nextPage(): void {\\n        this.click('.pagination-next');\\n    }\\n\\n    /**\\n     * Can be used by subclasses to create methods that assert about HTML in custom rendered columns. Note that\\n     * subclasses should not return the DebugElement, they should return a string from a section of the HTML.\\n     *\\n     * @param row 0-based index of row\\n     * @param column 0-based index of column\\n     */\\n    protected getCell(row: number, column: number): DebugElement {\\n        return this.findElement(`${ROW_TAG}:nth-of-type(${row + 1}) ${CELL_TAG}:nth-of-type(${column + 1})`);\\n    }\\n\\n    private get rows(): DebugElement[] {\\n        return this.findElements(ROW_TAG);\\n    }\\n\\n    private get columns(): DebugElement[] {\\n        return this.findElements(COLUMN_CSS_SELECTOR);\\n    }\\n\\n    private get detailsButtons(): DebugElement[] {\\n        return this.findElements('.datagrid-expandable-caret-button');\\n    }\\n}\\n\",\"properties\":[{\"name\":\"tagName\",\"defaultValue\":\"`clr-datagrid`\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":25,\"modifierKind\":[115]},{\"name\":\"component\",\"defaultValue\":\"fixture.componentInstance\",\"type\":\"T\",\"optional\":false,\"description\":\"The component instance being managed. Whenever possible, we should access the component's API.\",\"line\":43,\"modifierKind\":[114],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"description\":\"<p>Widget Object for a Clarity DataGrid</p>\\n\",\"rawdescription\":\"Widget Object for a Clarity DataGrid\",\"methods\":[{\"name\":\"clickDetailsButton\",\"args\":[{\"name\":\"row\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":96,\"description\":\"<p>Clicks the given details button.</p>\\n\",\"jsdoctags\":[{\"name\":\"row\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"getAllDetailContents\",\"args\":[],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":89,\"description\":\"<p>Returns the native element contents within all the detail pane open.</p>\\n\"},{\"name\":\"getCell\",\"args\":[{\"name\":\"row\",\"type\":\"number\"},{\"name\":\"column\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"DebugElement\",\"typeParameters\":[],\"line\":155,\"description\":\"<p>Can be used by subclasses to create methods that assert about HTML in custom rendered columns. Note that\\nsubclasses should not return the DebugElement, they should return a string from a section of the HTML.</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":4223,\"end\":4226,\"flags\":0,\"escapedText\":\"row\"},\"type\":\"number\",\"tagName\":{\"pos\":4217,\"end\":4222,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>0-based index of row</p>\\n\"},{\"name\":{\"pos\":4262,\"end\":4268,\"flags\":0,\"escapedText\":\"column\"},\"type\":\"number\",\"tagName\":{\"pos\":4256,\"end\":4261,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>0-based index of column</p>\\n\"}]},{\"name\":\"getCellText\",\"args\":[{\"name\":\"row\",\"type\":\"number\"},{\"name\":\"column\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":32,\"description\":\"<p>Retrieves the text content of a cell</p>\\n\",\"jsdoctags\":[{\"name\":{\"pos\":761,\"end\":764,\"flags\":0,\"escapedText\":\"row\"},\"type\":\"number\",\"tagName\":{\"pos\":755,\"end\":760,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>0-based index of row</p>\\n\"},{\"name\":{\"pos\":800,\"end\":806,\"flags\":0,\"escapedText\":\"column\"},\"type\":\"number\",\"tagName\":{\"pos\":794,\"end\":799,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>0-based index of column</p>\\n\"}]},{\"name\":\"getColumnHeader\",\"args\":[{\"name\":\"columnIndex\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":47,\"description\":\"<p>Returns the text for a header</p>\\n\",\"jsdoctags\":[{\"name\":{\"pos\":1213,\"end\":1224,\"flags\":0,\"escapedText\":\"columnIndex\"},\"type\":\"number\",\"tagName\":{\"pos\":1207,\"end\":1212,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>0-based index of header to retrieve</p>\\n\"}]},{\"name\":\"getPaginationDescription\",\"args\":[],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":130,\"description\":\"<p>Gives the pagination description text.</p>\\n\"},{\"name\":\"getPaginationSizeSelectorText\",\"args\":[],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":137,\"description\":\"<p>Gives the text next to the pagination selector.</p>\\n\"},{\"name\":\"getRowsCssClass\",\"args\":[{\"name\":\"index\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":82,\"description\":\"<p>Returns the CSS class names of the given Clarity datarow.</p>\\n\",\"jsdoctags\":[{\"name\":\"index\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"getSelectionType\",\"args\":[],\"optional\":false,\"returnType\":\"GridSelectionType\",\"typeParameters\":[],\"line\":110,\"description\":\"<p>Returns the selection type of the grid.</p>\\n\"},{\"name\":\"isColumnDisplayed\",\"args\":[{\"name\":\"index\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"boolean\",\"typeParameters\":[],\"line\":68,\"description\":\"<p>Returns whether or not the column with the given index is displayed by the CSS.</p>\\n\",\"jsdoctags\":[{\"name\":\"index\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"nextPage\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":144,\"description\":\"<p>Clicks the next page button.</p>\\n\"},{\"name\":\"selectRow\",\"args\":[{\"name\":\"row\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":123,\"description\":\"<p>Clicks the selection icon on the given row.</p>\\n\",\"jsdoctags\":[{\"name\":\"row\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"sortColumn\",\"args\":[{\"name\":\"index\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":103,\"description\":\"<p>Sorts the column at the given index.</p>\\n\",\"jsdoctags\":[{\"name\":\"index\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"click\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"optional\":true},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":72,\"description\":\"<p>Clicks an element and detects changes so the DOM is immediately updated</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2836,\"end\":2847,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"optional\":true,\"tagName\":{\"pos\":2830,\"end\":2835,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to click a specific element. If not passed in, the entire node will\\nreceive the click event</p>\\n\"},{\"name\":{\"pos\":2986,\"end\":2992,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2980,\"end\":2985,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>the parent element for which to search for the {</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"detectChanges\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":46,\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElement\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement\",\"typeParameters\":[],\"line\":55,\"description\":\"<p>Finds first element within this widget matching the given selector</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2219,\"end\":2230,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":2213,\"end\":2218,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>What to search for</p>\\n\"},{\"name\":{\"pos\":2264,\"end\":2270,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2258,\"end\":2263,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Where to start the search; defaults to the root of this component</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElements\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement[]\",\"typeParameters\":[],\"line\":62,\"description\":\"<p>Same as {@link findElement} but returns all elements</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getNodeText\",\"args\":[{\"name\":\"el\",\"type\":\"DebugElement\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":94,\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"el\",\"type\":\"DebugElement\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getText\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":83,\"description\":\"<p>Returns text content of this widget</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":3424,\"end\":3435,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":3418,\"end\":3423,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to retrieve text for a specific element within this widget.</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getTexts\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":90,\"description\":\"<p>Same as {@link getText} but return the text for all matching nodes</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"indexSignatures\":[],\"extends\":\"WidgetObject\",\"accessors\":{\"columnCount\":{\"name\":\"columnCount\",\"getSignature\":{\"name\":\"columnCount\",\"type\":\"number\",\"returnType\":\"number\",\"line\":39,\"description\":\"<p>Returns the number of visible columns</p>\\n\"}},\"columnHeaders\":{\"name\":\"columnHeaders\",\"getSignature\":{\"name\":\"columnHeaders\",\"type\":\"[]\",\"returnType\":\"string[]\",\"line\":54,\"description\":\"<p>Returns an array of the texts for columns, in DOM order</p>\\n\"}},\"rowCount\":{\"name\":\"rowCount\",\"getSignature\":{\"name\":\"rowCount\",\"type\":\"number\",\"returnType\":\"number\",\"line\":61,\"description\":\"<p>Returns the number of rows currently displayed</p>\\n\"}},\"gridCssClass\":{\"name\":\"gridCssClass\",\"getSignature\":{\"name\":\"gridCssClass\",\"type\":\"[]\",\"returnType\":\"string[]\",\"line\":75}},\"rows\":{\"name\":\"rows\",\"getSignature\":{\"name\":\"rows\",\"type\":\"[]\",\"returnType\":\"DebugElement[]\",\"line\":159}},\"columns\":{\"name\":\"columns\",\"getSignature\":{\"name\":\"columns\",\"type\":\"[]\",\"returnType\":\"DebugElement[]\",\"line\":163}},\"detailsButtons\":{\"name\":\"detailsButtons\",\"getSignature\":{\"name\":\"detailsButtons\",\"type\":\"[]\",\"returnType\":\"DebugElement[]\",\"line\":167}}},\"inputsClass\":[],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[]},{\"name\":\"DataExporterWidgetObject\",\"id\":\"class-DataExporterWidgetObject-e3f8af3b5a6b33532e739128d4ac29b6\",\"file\":\"projects/components/src/data-exporter/data-exporter.wo.ts\",\"type\":\"class\",\"sourceCode\":\"import { DataExporterComponent } from './data-exporter.component';\\nimport { WidgetObject } from '../utils/test/widget-object';\\nimport { DebugElement } from '@angular/core';\\n\\nconst Css = {\\n    SelectAll: '.select-all',\\n    SelectColumn: '.column-selection label',\\n};\\n/**\\n * Testing Object for {@link DataExporterComponent}\\n */\\nexport class DataExporterWidgetObject extends WidgetObject<DataExporterComponent> {\\n    static tagName = 'vcd-data-exporter';\\n\\n    /**\\n     * Whether the progress bar is currently showing indefinite progress, that is a looping loading indicator\\n     */\\n    get isLoopingProgressBar(): boolean {\\n        return !!this.findElement('.progress.loop');\\n    }\\n\\n    /**\\n     * The strings for the available check boxes\\n     */\\n    get columnCheckBoxes(): string[] {\\n        return this.getTexts('.column-selection label');\\n    }\\n\\n    /**\\n     * Whether the select all button is displayed\\n     */\\n    get isSelectAllVisible(): boolean {\\n        return !!this.selectAllLink;\\n    }\\n\\n    private get selectAllLink(): DebugElement {\\n        return this.findElement(Css.SelectAll);\\n    }\\n\\n    /**\\n     * Click the select all link. Throws an error if the link is not available\\n     */\\n    clickSelectAll(): void {\\n        this.click(Css.SelectAll);\\n    }\\n\\n    /**\\n     * Whether the select all link is enabled. Throws an error if link is not available\\n     */\\n    get isSelectAllEnabled(): boolean {\\n        return !this.selectAllLink.nativeElement.disabled;\\n    }\\n\\n    /**\\n     * Clicks the checkbox for a colum\\n     * @param index Index of column, 0 based\\n     */\\n    clickColumn(index: number): void {\\n        this.click(`.column-selection li:nth-of-type(${index + 1}) label`);\\n    }\\n\\n    clickCancel(): void {\\n        this.click('.cancel');\\n    }\\n\\n    clickExport(): void {\\n        this.click('.export');\\n    }\\n}\\n\",\"properties\":[{\"name\":\"tagName\",\"defaultValue\":\"'vcd-data-exporter'\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":18,\"modifierKind\":[115]},{\"name\":\"component\",\"defaultValue\":\"fixture.componentInstance\",\"type\":\"T\",\"optional\":false,\"description\":\"The component instance being managed. Whenever possible, we should access the component's API.\",\"line\":43,\"modifierKind\":[114],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"description\":\"<p>Testing Object for {@link DataExporterComponent}</p>\\n\",\"rawdescription\":\"Testing Object for {@link DataExporterComponent}\",\"methods\":[{\"name\":\"clickCancel\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":67},{\"name\":\"clickColumn\",\"args\":[{\"name\":\"index\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":63,\"description\":\"<p>Clicks the checkbox for a colum</p>\\n\",\"jsdoctags\":[{\"name\":{\"pos\":1620,\"end\":1625,\"flags\":0,\"escapedText\":\"index\"},\"type\":\"number\",\"tagName\":{\"pos\":1614,\"end\":1619,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Index of column, 0 based</p>\\n\"}]},{\"name\":\"clickExport\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":71},{\"name\":\"clickSelectAll\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":48,\"description\":\"<p>Click the select all link. Throws an error if the link is not available</p>\\n\"},{\"name\":\"click\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"optional\":true},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":72,\"description\":\"<p>Clicks an element and detects changes so the DOM is immediately updated</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2836,\"end\":2847,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"optional\":true,\"tagName\":{\"pos\":2830,\"end\":2835,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to click a specific element. If not passed in, the entire node will\\nreceive the click event</p>\\n\"},{\"name\":{\"pos\":2986,\"end\":2992,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2980,\"end\":2985,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>the parent element for which to search for the {</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"detectChanges\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":46,\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElement\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement\",\"typeParameters\":[],\"line\":55,\"description\":\"<p>Finds first element within this widget matching the given selector</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2219,\"end\":2230,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":2213,\"end\":2218,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>What to search for</p>\\n\"},{\"name\":{\"pos\":2264,\"end\":2270,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2258,\"end\":2263,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Where to start the search; defaults to the root of this component</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"findElements\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement[]\",\"typeParameters\":[],\"line\":62,\"description\":\"<p>Same as {@link findElement} but returns all elements</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getNodeText\",\"args\":[{\"name\":\"el\",\"type\":\"DebugElement\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":94,\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"el\",\"type\":\"DebugElement\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getText\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":83,\"description\":\"<p>Returns text content of this widget</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":3424,\"end\":3435,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":3418,\"end\":3423,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to retrieve text for a specific element within this widget.</p>\\n\"}],\"inheritance\":{\"file\":\"WidgetObject\"}},{\"name\":\"getTexts\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":90,\"description\":\"<p>Same as {@link getText} but return the text for all matching nodes</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}],\"inheritance\":{\"file\":\"WidgetObject\"}}],\"indexSignatures\":[],\"extends\":\"WidgetObject\",\"accessors\":{\"isLoopingProgressBar\":{\"name\":\"isLoopingProgressBar\",\"getSignature\":{\"name\":\"isLoopingProgressBar\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":23,\"description\":\"<p>Whether the progress bar is currently showing indefinite progress, that is a looping loading indicator</p>\\n\"}},\"columnCheckBoxes\":{\"name\":\"columnCheckBoxes\",\"getSignature\":{\"name\":\"columnCheckBoxes\",\"type\":\"[]\",\"returnType\":\"string[]\",\"line\":30,\"description\":\"<p>The strings for the available check boxes</p>\\n\"}},\"isSelectAllVisible\":{\"name\":\"isSelectAllVisible\",\"getSignature\":{\"name\":\"isSelectAllVisible\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":37,\"description\":\"<p>Whether the select all button is displayed</p>\\n\"}},\"selectAllLink\":{\"name\":\"selectAllLink\",\"getSignature\":{\"name\":\"selectAllLink\",\"type\":\"\",\"returnType\":\"DebugElement\",\"line\":41}},\"isSelectAllEnabled\":{\"name\":\"isSelectAllEnabled\",\"getSignature\":{\"name\":\"isSelectAllEnabled\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":55,\"description\":\"<p>Whether the select all link is enabled. Throws an error if link is not available</p>\\n\"}}},\"inputsClass\":[],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[]},{\"name\":\"WidgetFinder\",\"id\":\"class-WidgetFinder-a682f3364d413a84f7f91019a154a7a7\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"class\",\"sourceCode\":\"import { DebugElement, Type } from '@angular/core';\\nimport { ComponentFixture, TestBed } from '@angular/core/testing';\\nimport { By } from '@angular/platform-browser';\\nimport { FindableWidget } from './widget-object';\\n\\n/**\\n * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n *\\n * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\n * queries the internals of a component from a test.\\n *\\n * ## Subclass Rules\\n *\\n * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\n * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\n * assert code on its own.\\n *\\n * `T` is the type of the JS/TS object being wrapped\\n *\\n * It is recommended that files for implementations be named with a `.wo.ts` extension\\n */\\nexport abstract class WidgetObject<T> {\\n    /**\\n     *\\n     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\n     * need to find a widget within the tree, you should use {@link find}.\\n     *\\n     * @param component The component instance being managed. Whenever possible, we should access the component's API.\\n     * @param root The root element (host) for the component instance. We typically prefer to interact with the\\n     * component but there are times when we must check the DOM.\\n     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that\\n     * requires re-rendering of the DOM.\\n     */\\n    constructor(\\n        protected fixture: ComponentFixture<any>,\\n        protected root: DebugElement = fixture.debugElement,\\n        public component: T = fixture.componentInstance\\n    ) {}\\n\\n    detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Finds first element within this widget matching the given selector\\n     * @param cssSelector What to search for\\n     * @param parent Where to start the search; defaults to the root of this component\\n     */\\n    protected findElement(cssSelector: string, parent: DebugElement = this.root): DebugElement {\\n        return parent.query(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link findElement} but returns all elements\\n     */\\n    protected findElements(cssSelector: string, parent: DebugElement = this.root): DebugElement[] {\\n        return parent.queryAll(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Clicks an element and detects changes so the DOM is immediately updated\\n     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will\\n     * receive the click event\\n     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.\\n     */\\n    protected click(cssSelector?: string, parent: DebugElement = this.root): void {\\n        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;\\n        nativeElement.click();\\n        this.detectChanges();\\n    }\\n\\n    /**\\n     * Returns text content of this widget\\n     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.\\n     */\\n\\n    protected getText(cssSelector: string): string {\\n        return this.getNodeText(this.findElement(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link getText} but return the text for all matching nodes\\n     */\\n    protected getTexts(cssSelector: string): string[] {\\n        return this.findElements(cssSelector).map(el => this.getNodeText(el));\\n    }\\n\\n    protected getNodeText(el: DebugElement): string {\\n        // The || '' is because textContent could technically be null when passed in the document\\n        // element object. We know that cannot be pased in here, so we ignore it for coverage\\n        // but we still need the line there to make strictNullChecks work\\n        return el.nativeElement.textContent || /* istanbul ignore next */ '';\\n    }\\n}\\n\\n/**\\n * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}\\n *\\n * ## Note\\n * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this\\n * interface represents a constructor for a {@link WidgetObject}, not an instance.\\n */\\nexport interface FindableWidget<T> extends Type<WidgetObject<T>> {\\n    tagName: string;\\n}\\n\\n/**\\n * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}\\n */\\ninterface FindParams<T> {\\n    /**\\n     * The constructor of the widget to be found\\n     */\\n    woConstructor: T;\\n    /**\\n     * If provided, search starts from this container. It defaults to the fixture's root debugElement\\n     */\\n    ancestor?: DebugElement;\\n    /**\\n     * Optional CSS class name that can be used when there could be multiple instances of the object within the\\n     * fixture tree\\n     */\\n    className?: string;\\n}\\n\\n/**\\n * Finds instances that implement {@link FindableWidget}\\n * H is the host component's type\\n */\\nexport class WidgetFinder<H = unknown> {\\n    /**\\n     * We don't care or could possibly know the type of fixture\\n     */\\n    private fixture: ComponentFixture<H>;\\n\\n    /**\\n     * If you need direct access to manipulate the host\\n     */\\n    public hostComponent: H;\\n\\n    /**\\n     * @param componentConstructor The host component to be created as the root of the tests's fixture\\n     */\\n    constructor(componentConstructor: Type<H>) {\\n        this.fixture = TestBed.createComponent(componentConstructor);\\n        this.hostComponent = this.fixture.componentInstance;\\n    }\\n\\n    /**\\n     * Finds widgets within a fixture\\n     * @return A Potentially empty list of widgets matching the given specs\\n     */\\n    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T>[] {\\n        const defaults = { ancestor: this.fixture.debugElement, className: '' };\\n        const { woConstructor, ancestor, className } = isFindParamsObject(params)\\n            ? { ...defaults, ...params }\\n            : { ...defaults, woConstructor: params };\\n\\n        let query = woConstructor.tagName;\\n        if (className) {\\n            query += `.${className}`;\\n        }\\n        const componentRoots = ancestor.queryAll(By.css(query));\\n        const widgets = componentRoots.map(\\n            // Typescript is not able to infer it correctly as the subclass but we know for sure\\n            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>\\n        );\\n        return widgets;\\n    }\\n\\n    /**\\n     * Finds a single widget object\\n     * @throws An error if the widget is not found or if there are multiple instances\\n     */\\n    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {\\n        const widgets = this.findWidgets(params);\\n        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;\\n        if (widgets.length === 0) {\\n            throw Error(`Did not find a <${tagName}>`);\\n        }\\n        if (widgets.length > 1) {\\n            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);\\n        }\\n        return widgets[0] as InstanceType<T>;\\n    }\\n\\n    public detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n}\\n\\nfunction isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {\\n    return !!(params as FindParams<T>).woConstructor;\\n}\\n/**\\n * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures\\n */\\nexport interface HasFinder<T = unknown> {\\n    finder: WidgetFinder<T>;\\n}\\n\",\"constructorObj\":{\"name\":\"constructor\",\"description\":\"\",\"args\":[{\"name\":\"componentConstructor\",\"type\":\"Type<H>\"}],\"line\":145,\"jsdoctags\":[{\"name\":{\"pos\":5614,\"end\":5634,\"flags\":0,\"escapedText\":\"componentConstructor\"},\"type\":\"Type<H>\",\"tagName\":{\"pos\":5608,\"end\":5613,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The host component to be created as the root of the tests&#39;s fixture</p>\\n\"}]},\"properties\":[{\"name\":\"fixture\",\"type\":\"ComponentFixture<H>\",\"optional\":false,\"description\":\"<p>We don&#39;t care or could possibly know the type of fixture</p>\\n\",\"line\":140,\"modifierKind\":[112]},{\"name\":\"hostComponent\",\"type\":\"H\",\"optional\":false,\"description\":\"<p>If you need direct access to manipulate the host</p>\\n\",\"line\":145,\"modifierKind\":[114]}],\"description\":\"<p>Finds instances that implement {@link FindableWidget}\\nH is the host component&#39;s type</p>\\n\",\"rawdescription\":\"Finds instances that implement {@link FindableWidget}\\nH is the host component's type\",\"methods\":[{\"name\":\"detectChanges\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":193,\"modifierKind\":[114]},{\"name\":\"find\",\"args\":[{\"name\":\"params\",\"type\":\"FindParams<T> | T\"}],\"optional\":false,\"returnType\":\"InstanceType<T>\",\"typeParameters\":[\"C\",\"T\"],\"line\":181,\"description\":\"<p>Finds a single widget object</p>\\n\",\"modifierKind\":[114],\"jsdoctags\":[{\"name\":\"params\",\"type\":\"FindParams<T> | T\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"findWidgets\",\"args\":[{\"name\":\"params\",\"type\":\"FindParams<T> | T\"}],\"optional\":false,\"returnType\":\"InstanceType[]\",\"typeParameters\":[\"C\",\"T\"],\"line\":159,\"description\":\"<p>Finds widgets within a fixture</p>\\n\",\"modifierKind\":[114],\"jsdoctags\":[{\"name\":\"params\",\"type\":\"FindParams<T> | T\",\"tagName\":{\"text\":\"param\"}},{\"tagName\":{\"pos\":5952,\"end\":5958,\"flags\":0,\"escapedText\":\"return\"},\"comment\":\"<p>A Potentially empty list of widgets matching the given specs</p>\\n\"}]}],\"indexSignatures\":[],\"inputsClass\":[],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[]},{\"name\":\"WidgetObject\",\"id\":\"class-WidgetObject-a682f3364d413a84f7f91019a154a7a7\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"class\",\"sourceCode\":\"import { DebugElement, Type } from '@angular/core';\\nimport { ComponentFixture, TestBed } from '@angular/core/testing';\\nimport { By } from '@angular/platform-browser';\\nimport { FindableWidget } from './widget-object';\\n\\n/**\\n * An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n *\\n * The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\n * queries the internals of a component from a test.\\n *\\n * ## Subclass Rules\\n *\\n * - Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\n * callers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n *  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\n * assert code on its own.\\n *\\n * `T` is the type of the JS/TS object being wrapped\\n *\\n * It is recommended that files for implementations be named with a `.wo.ts` extension\\n */\\nexport abstract class WidgetObject<T> {\\n    /**\\n     *\\n     * Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\n     * need to find a widget within the tree, you should use {@link find}.\\n     *\\n     * @param component The component instance being managed. Whenever possible, we should access the component's API.\\n     * @param root The root element (host) for the component instance. We typically prefer to interact with the\\n     * component but there are times when we must check the DOM.\\n     * @param fixture The test fixture, so we can call {@link ComponentFixture#detectChanges} after something that\\n     * requires re-rendering of the DOM.\\n     */\\n    constructor(\\n        protected fixture: ComponentFixture<any>,\\n        protected root: DebugElement = fixture.debugElement,\\n        public component: T = fixture.componentInstance\\n    ) {}\\n\\n    detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n\\n    /**\\n     * Finds first element within this widget matching the given selector\\n     * @param cssSelector What to search for\\n     * @param parent Where to start the search; defaults to the root of this component\\n     */\\n    protected findElement(cssSelector: string, parent: DebugElement = this.root): DebugElement {\\n        return parent.query(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link findElement} but returns all elements\\n     */\\n    protected findElements(cssSelector: string, parent: DebugElement = this.root): DebugElement[] {\\n        return parent.queryAll(By.css(cssSelector));\\n    }\\n\\n    /**\\n     * Clicks an element and detects changes so the DOM is immediately updated\\n     * @param cssSelector Pass this in if you want to click a specific element. If not passed in, the entire node will\\n     * receive the click event\\n     * @param parent the parent element for which to search for the {@param cssSelector} within. Defaults to root if not provided.\\n     */\\n    protected click(cssSelector?: string, parent: DebugElement = this.root): void {\\n        const nativeElement: HTMLBaseElement = parent.query(By.css(cssSelector)).nativeElement;\\n        nativeElement.click();\\n        this.detectChanges();\\n    }\\n\\n    /**\\n     * Returns text content of this widget\\n     * @param cssSelector Pass this in if you want to retrieve text for a specific element within this widget.\\n     */\\n\\n    protected getText(cssSelector: string): string {\\n        return this.getNodeText(this.findElement(cssSelector));\\n    }\\n\\n    /**\\n     * Same as {@link getText} but return the text for all matching nodes\\n     */\\n    protected getTexts(cssSelector: string): string[] {\\n        return this.findElements(cssSelector).map(el => this.getNodeText(el));\\n    }\\n\\n    protected getNodeText(el: DebugElement): string {\\n        // The || '' is because textContent could technically be null when passed in the document\\n        // element object. We know that cannot be pased in here, so we ignore it for coverage\\n        // but we still need the line there to make strictNullChecks work\\n        return el.nativeElement.textContent || /* istanbul ignore next */ '';\\n    }\\n}\\n\\n/**\\n * Subclasses should implement the FindableWidget interface so they can be found with {@link WidgetFinder}\\n *\\n * ## Note\\n * This is done by creating a static property `tagName`on your subclass, not a regular instance, since this\\n * interface represents a constructor for a {@link WidgetObject}, not an instance.\\n */\\nexport interface FindableWidget<T> extends Type<WidgetObject<T>> {\\n    tagName: string;\\n}\\n\\n/**\\n * Arguments for {@link WidgetFinder#findWidgets} and {@link WidgetFinder#find}\\n */\\ninterface FindParams<T> {\\n    /**\\n     * The constructor of the widget to be found\\n     */\\n    woConstructor: T;\\n    /**\\n     * If provided, search starts from this container. It defaults to the fixture's root debugElement\\n     */\\n    ancestor?: DebugElement;\\n    /**\\n     * Optional CSS class name that can be used when there could be multiple instances of the object within the\\n     * fixture tree\\n     */\\n    className?: string;\\n}\\n\\n/**\\n * Finds instances that implement {@link FindableWidget}\\n * H is the host component's type\\n */\\nexport class WidgetFinder<H = unknown> {\\n    /**\\n     * We don't care or could possibly know the type of fixture\\n     */\\n    private fixture: ComponentFixture<H>;\\n\\n    /**\\n     * If you need direct access to manipulate the host\\n     */\\n    public hostComponent: H;\\n\\n    /**\\n     * @param componentConstructor The host component to be created as the root of the tests's fixture\\n     */\\n    constructor(componentConstructor: Type<H>) {\\n        this.fixture = TestBed.createComponent(componentConstructor);\\n        this.hostComponent = this.fixture.componentInstance;\\n    }\\n\\n    /**\\n     * Finds widgets within a fixture\\n     * @return A Potentially empty list of widgets matching the given specs\\n     */\\n    public findWidgets<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T>[] {\\n        const defaults = { ancestor: this.fixture.debugElement, className: '' };\\n        const { woConstructor, ancestor, className } = isFindParamsObject(params)\\n            ? { ...defaults, ...params }\\n            : { ...defaults, woConstructor: params };\\n\\n        let query = woConstructor.tagName;\\n        if (className) {\\n            query += `.${className}`;\\n        }\\n        const componentRoots = ancestor.queryAll(By.css(query));\\n        const widgets = componentRoots.map(\\n            // Typescript is not able to infer it correctly as the subclass but we know for sure\\n            root => new woConstructor(this.fixture, root, root.componentInstance) as InstanceType<T>\\n        );\\n        return widgets;\\n    }\\n\\n    /**\\n     * Finds a single widget object\\n     * @throws An error if the widget is not found or if there are multiple instances\\n     */\\n    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T): InstanceType<T> {\\n        const widgets = this.findWidgets(params);\\n        const tagName = isFindParamsObject(params) ? params.woConstructor.tagName : params.tagName;\\n        if (widgets.length === 0) {\\n            throw Error(`Did not find a <${tagName}>`);\\n        }\\n        if (widgets.length > 1) {\\n            throw Error(`Expected to find a single <${tagName}> but found ${widgets.length}`);\\n        }\\n        return widgets[0] as InstanceType<T>;\\n    }\\n\\n    public detectChanges(): void {\\n        this.fixture.detectChanges();\\n    }\\n}\\n\\nfunction isFindParamsObject<T>(params: FindParams<T> | T): params is FindParams<T> {\\n    return !!(params as FindParams<T>).woConstructor;\\n}\\n/**\\n * Can be used in tests that use `this` to share a finder with before/AfterEach instead of leaky closures\\n */\\nexport interface HasFinder<T = unknown> {\\n    finder: WidgetFinder<T>;\\n}\\n\",\"constructorObj\":{\"name\":\"constructor\",\"description\":\"<p>Constructor should only be called directly if you are directly instantiating the widget being wrapped (T). If you\\nneed to find a widget within the tree, you should use {@link find}.</p>\\n\",\"args\":[{\"name\":\"fixture\",\"type\":\"ComponentFixture<any>\"},{\"name\":\"root\",\"type\":\"DebugElement\",\"defaultValue\":\"fixture.debugElement\"},{\"name\":\"component\",\"type\":\"T\",\"defaultValue\":\"fixture.componentInstance\"}],\"line\":28,\"jsdoctags\":[{\"name\":{\"pos\":1706,\"end\":1713,\"flags\":0,\"escapedText\":\"fixture\"},\"type\":\"ComponentFixture<any>\",\"tagName\":{\"pos\":1700,\"end\":1705,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The test fixture, so we can call {</p>\\n\"},{\"name\":{\"pos\":1529,\"end\":1533,\"flags\":0,\"escapedText\":\"root\"},\"type\":\"DebugElement\",\"defaultValue\":\"fixture.debugElement\",\"tagName\":{\"pos\":1523,\"end\":1528,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The root element (host) for the component instance. We typically prefer to interact with the\\ncomponent but there are times when we must check the DOM.</p>\\n\"},{\"name\":{\"pos\":1410,\"end\":1419,\"flags\":0,\"escapedText\":\"component\"},\"type\":\"T\",\"defaultValue\":\"fixture.componentInstance\",\"tagName\":{\"pos\":1404,\"end\":1409,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>The component instance being managed. Whenever possible, we should access the component&#39;s API.</p>\\n\"}]},\"properties\":[{\"name\":\"component\",\"defaultValue\":\"fixture.componentInstance\",\"type\":\"T\",\"optional\":false,\"description\":\"The component instance being managed. Whenever possible, we should access the component's API.\",\"line\":43,\"modifierKind\":[114]}],\"description\":\"<p>An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.</p>\\n<p>The main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\nqueries the internals of a component from a test.</p>\\n<h2 id=\\\"subclass-rules\\\">Subclass Rules</h2>\\n<ul>\\n<li>Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\ncallers to query it from the outside creating potential duplicate querying code and abstraction leaks.<ul>\\n<li>Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\nassert code on its own.</li>\\n</ul>\\n</li>\\n</ul>\\n<p><code>T</code> is the type of the JS/TS object being wrapped</p>\\n<p>It is recommended that files for implementations be named with a <code>.wo.ts</code> extension</p>\\n\",\"rawdescription\":\"An implementation of the page object pattern, but applied to widgets, since they can be reused on multiple pages.\\n\\nThe main purpose for the wrapper are providing access to the internals of a widget avoiding duplication of code that\\nqueries the internals of a component from a test.\\n\\n## Subclass Rules\\n\\n- Methods exposed by subclasses should not expose HTMLElements or DebugElements directly. That would encourage\\ncallers to query it from the outside creating potential duplicate querying code and abstraction leaks.\\n  - Subclasses also should not have testing assertions. They should only provide the state and the calling test can\\nassert code on its own.\\n\\n`T` is the type of the JS/TS object being wrapped\\n\\nIt is recommended that files for implementations be named with a `.wo.ts` extension\",\"methods\":[{\"name\":\"click\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"optional\":true},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":72,\"description\":\"<p>Clicks an element and detects changes so the DOM is immediately updated</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2836,\"end\":2847,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"optional\":true,\"tagName\":{\"pos\":2830,\"end\":2835,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to click a specific element. If not passed in, the entire node will\\nreceive the click event</p>\\n\"},{\"name\":{\"pos\":2986,\"end\":2992,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2980,\"end\":2985,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>the parent element for which to search for the {</p>\\n\"}]},{\"name\":\"detectChanges\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":46},{\"name\":\"findElement\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement\",\"typeParameters\":[],\"line\":55,\"description\":\"<p>Finds first element within this widget matching the given selector</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":2219,\"end\":2230,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":2213,\"end\":2218,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>What to search for</p>\\n\"},{\"name\":{\"pos\":2264,\"end\":2270,\"flags\":0,\"escapedText\":\"parent\"},\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"pos\":2258,\"end\":2263,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Where to start the search; defaults to the root of this component</p>\\n\"}]},{\"name\":\"findElements\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\"}],\"optional\":false,\"returnType\":\"DebugElement[]\",\"typeParameters\":[],\"line\":62,\"description\":\"<p>Same as {@link findElement} but returns all elements</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"parent\",\"type\":\"DebugElement\",\"defaultValue\":\"this.root\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"getNodeText\",\"args\":[{\"name\":\"el\",\"type\":\"DebugElement\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":94,\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"el\",\"type\":\"DebugElement\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"getText\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":83,\"description\":\"<p>Returns text content of this widget</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":{\"pos\":3424,\"end\":3435,\"flags\":0,\"escapedText\":\"cssSelector\"},\"type\":\"string\",\"tagName\":{\"pos\":3418,\"end\":3423,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Pass this in if you want to retrieve text for a specific element within this widget.</p>\\n\"}]},{\"name\":\"getTexts\",\"args\":[{\"name\":\"cssSelector\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string[]\",\"typeParameters\":[],\"line\":90,\"description\":\"<p>Same as {@link getText} but return the text for all matching nodes</p>\\n\",\"modifierKind\":[113],\"jsdoctags\":[{\"name\":\"cssSelector\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}]}],\"indexSignatures\":[],\"inputsClass\":[],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[]}],\"directives\":[{\"name\":\"ComponentRendererOutletDirective\",\"id\":\"directive-ComponentRendererOutletDirective-015ff7e245db7e8600a9c1b7eecae5af\",\"file\":\"projects/components/src/datagrid/directives/component-renderer-outlet.directive.ts\",\"type\":\"directive\",\"description\":\"<p>Component that acts as a host element for dynamic rendering of component constructors.\\nIt takes {@link ComponentRendererSpec} as input and also &#39;context&#39; as input that serves as argument for\\n{@link ComponentRenderer.config} method. Attaches the component to be rendered to the view container of host element\\nand updates it&#39;s configuration whenever changed.</p>\\n<p>Example usage:\\n&lt;ng-template\\n      [vcdComponentRendererOutlet]=&quot;{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }&quot;</p>\\n<blockquote>\\n</ng-template></blockquote>\\n\",\"sourceCode\":\"import { ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';\\nimport {\\n    ComponentRenderer,\\n    ComponentRendererConstructor,\\n    ComponentRendererSpec,\\n} from '../interfaces/component-renderer.interface';\\n\\n/**\\n * Type of the Input given to the {@link ComponentRendererOutletDirective.vcdComponentRendererOutlet}\\n */\\nexport interface ComponentRendererType<R, T> {\\n    /**\\n     * Contains the constructor of component to be rendered and also the method that gets the configuration required for\\n     * the component API\\n     */\\n    rendererSpec: ComponentRendererSpec<R, T>;\\n\\n    /**\\n     * serves as argument for {@link ComponentRenderer.config} method\\n     */\\n    context: R;\\n}\\n\\n/**\\n * Component that acts as a host element for dynamic rendering of component constructors.\\n * It takes {@link ComponentRendererSpec} as input and also 'context' as input that serves as argument for\\n * {@link ComponentRenderer.config} method. Attaches the component to be rendered to the view container of host element\\n * and updates it's configuration whenever changed.\\n *\\n * Example usage:\\n * <ng-template\\n *      [vcdComponentRendererOutlet]=\\\"{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }\\\"\\n * ></ng-template>\\n *\\n */\\n@Directive({\\n    selector: '[vcdComponentRendererOutlet]',\\n})\\nexport class ComponentRendererOutletDirective<R, T> {\\n    private componentRef: ComponentRef<ComponentRenderer<T>>;\\n    private componentType: ComponentRendererConstructor<T>;\\n\\n    constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}\\n\\n    @Input()\\n    set vcdComponentRendererOutlet(renderer: ComponentRendererType<R, T>) {\\n        if (this.componentType !== renderer.rendererSpec.type) {\\n            // Cache the componentType to avoid redundant detaching and attaching of component to this host\\n            this.componentType = renderer.rendererSpec.type;\\n            this.componentRef = this.attachRenderer();\\n        }\\n        this.assignValue(renderer.rendererSpec.config, renderer.context);\\n    }\\n\\n    /**\\n     * Attaches the passed component type to the view of this directive host\\n     */\\n    private attachRenderer(): ComponentRef<ComponentRenderer<T>> {\\n        if (this.componentRef) {\\n            this.detachRenderer();\\n        }\\n        const componentFactory = this.cfr.resolveComponentFactory(this.componentType);\\n        return this.viewContainerRef.createComponent(componentFactory);\\n    }\\n\\n    /**\\n     * Updates the configuration of instantiated component\\n     */\\n    private assignValue(config: ((r: R) => T) | T, context: R): void {\\n        if (!this.componentRef || !this.componentRef.instance) {\\n            return;\\n        }\\n        this.componentRef.instance.config = config instanceof Function ? config(context) : config;\\n    }\\n\\n    private detachRenderer(): void {\\n        this.viewContainerRef.remove();\\n        this.componentRef = null;\\n    }\\n}\\n\",\"selector\":\"[vcdComponentRendererOutlet]\",\"providers\":[],\"inputsClass\":[{\"name\":\"vcdComponentRendererOutlet\",\"line\":51,\"type\":\"\"}],\"outputsClass\":[],\"hostBindings\":[],\"hostListeners\":[],\"propertiesClass\":[{\"name\":\"componentRef\",\"type\":\"ComponentRef<ComponentRenderer<T>>\",\"optional\":false,\"description\":\"\",\"line\":45,\"modifierKind\":[112]},{\"name\":\"componentType\",\"type\":\"ComponentRendererConstructor<T>\",\"optional\":false,\"description\":\"\",\"line\":46,\"modifierKind\":[112]}],\"methodsClass\":[{\"name\":\"assignValue\",\"args\":[{\"name\":\"config\",\"type\":\" | T\"},{\"name\":\"context\",\"type\":\"R\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":74,\"description\":\"<p>Updates the configuration of instantiated component</p>\\n\",\"modifierKind\":[112],\"jsdoctags\":[{\"name\":\"config\",\"type\":\" | T\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"context\",\"type\":\"R\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"attachRenderer\",\"args\":[],\"optional\":false,\"returnType\":\"ComponentRef<ComponentRenderer<T>>\",\"typeParameters\":[],\"line\":63,\"description\":\"<p>Attaches the passed component type to the view of this directive host</p>\\n\",\"modifierKind\":[112]},{\"name\":\"detachRenderer\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":81,\"modifierKind\":[112]}],\"constructorObj\":{\"name\":\"constructor\",\"description\":\"\",\"args\":[{\"name\":\"viewContainerRef\",\"type\":\"ViewContainerRef\"},{\"name\":\"cfr\",\"type\":\"ComponentFactoryResolver\"}],\"line\":46,\"jsdoctags\":[{\"name\":\"viewContainerRef\",\"type\":\"ViewContainerRef\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"cfr\",\"type\":\"ComponentFactoryResolver\",\"tagName\":{\"text\":\"param\"}}]},\"accessors\":{\"vcdComponentRendererOutlet\":{\"name\":\"vcdComponentRendererOutlet\",\"setSignature\":{\"name\":\"vcdComponentRendererOutlet\",\"type\":\"void\",\"args\":[{\"name\":\"renderer\",\"type\":\"\"}],\"returnType\":\"void\",\"line\":51,\"jsdoctags\":[{\"name\":\"renderer\",\"type\":\"\",\"tagName\":{\"text\":\"param\"}}]}}}}],\"components\":[{\"name\":\"BoldTextRendererComponent\",\"id\":\"component-BoldTextRendererComponent-ef925c06bd38d69b8ef18b74dacdb84a\",\"file\":\"projects/components/src/datagrid/renderers/bold-text-renderer.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"styleUrls\":[],\"styles\":[],\"template\":\"<strong>{{ config.text }}</strong>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[{\"name\":\"config\",\"line\":40,\"type\":\"BoldTextRendererConfig\"}],\"outputsClass\":[],\"propertiesClass\":[],\"methodsClass\":[],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template</p>\\n\",\"rawdescription\":\"A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template\",\"type\":\"component\",\"sourceCode\":\"import { Component, Input } from '@angular/core';\\nimport { ComponentRenderer } from '../interfaces/component-renderer.interface';\\n\\n/**\\n * {@link ComponentRenderer.config} type that the {@link BoldTextRendererComponent} can understand\\n */\\nexport interface BoldTextRendererConfig {\\n    /**\\n     * Text to be displayed in bold font\\n     */\\n    text: string;\\n}\\n\\n/**\\n * A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template\\n *\\n * @example Example usage with RendererSpec:\\n *     columns: GridColumn<MockRecord>[] = [\\n *       {\\n *         displayName: 'Component Renderer',\\n *         renderer: RendererSpec(\\n *           BoldTextRendererComponent,\\n *           (record: MockRecord) => ({text: record.name})\\n *         )\\n *       }\\n *     ];\\n */\\n@Component({\\n    template: `\\n        <strong>{{ config.text }}</strong>\\n    `,\\n})\\nexport class BoldTextRendererComponent implements ComponentRenderer<BoldTextRendererConfig> {\\n    @Input()\\n    config: BoldTextRendererConfig;\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\",\"jsdoctags\":[{\"pos\":559,\"end\":568,\"flags\":0,\"kind\":288,\"atToken\":{\"pos\":559,\"end\":560,\"flags\":0,\"kind\":57},\"tagName\":{\"pos\":560,\"end\":567,\"flags\":0,\"escapedText\":\"example\"},\"comment\":\"Example usage with RendererSpec:\\ncolumns: GridColumn<MockRecord>[] = [\\n{\\ndisplayName: 'Component Renderer',\\nrenderer: RendererSpec(\\n  BoldTextRendererComponent,\\n  (record: MockRecord) => ({text: record.name})\\n)\\n}\\n];\"}],\"implements\":[\"ComponentRenderer\"]},{\"name\":\"CliptextComponent\",\"id\":\"component-CliptextComponent-f74ccec5c50416c5689ab9ec9a8c62a6\",\"file\":\"projects/components/src/cliptext/cliptext.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-cliptext\",\"styleUrls\":[\"./cliptext.component.scss\"],\"styles\":[],\"templateUrl\":[\"./cliptext.component.html\"],\"viewProviders\":[],\"inputsClass\":[{\"name\":\"inlineWidth\",\"description\":\"<p>Whether the tooltip should take up a block, or be inline within text</p>\\n<p>If its value is falsy (default), it will be displayed as a block (take up the parent&#39;s width).\\nOtherwise, it should be a CSS string to be used as its max-width;</p>\\n\",\"line\":73,\"type\":\"string\"},{\"name\":\"position\",\"description\":\"<p>Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.\\nSome of the reasons to avoid it are:</p>\\n<ul>\\n<li>Clarity will introduce smart positioning &#39;[NG] Smart Popover Component #2923&#39;</li>\\n<li>Future versions may go with different implementation so position may become irrelevant</li>\\n</ul>\\n\",\"line\":43,\"type\":\"\"}],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"_inline\",\"defaultValue\":\"false\",\"type\":\"InlineSpec\",\"optional\":false,\"description\":\"\",\"line\":77,\"modifierKind\":[112]},{\"name\":\"_size\",\"defaultValue\":\"'md'\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":94,\"modifierKind\":[112]},{\"name\":\"_tooltipPosition\",\"defaultValue\":\"'top-right'\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":100,\"modifierKind\":[112]},{\"name\":\"_tooltipText\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":106,\"modifierKind\":[112]},{\"name\":\"cliptextContainer\",\"type\":\"ElementRef\",\"optional\":false,\"description\":\"\",\"line\":109,\"decorators\":[{\"name\":\"ViewChild\",\"stringifiedArguments\":\"'cliptextContainer', {static: true}\"}]},{\"name\":\"clrIfOpen\",\"type\":\"ClrIfOpen\",\"optional\":false,\"description\":\"\",\"line\":112,\"decorators\":[{\"name\":\"ViewChild\",\"stringifiedArguments\":\"ClrIfOpen, {static: true}\"}],\"modifierKind\":[112]}],\"methodsClass\":[{\"name\":\"isOverflowing\",\"args\":[],\"optional\":false,\"returnType\":\"boolean\",\"typeParameters\":[],\"line\":140,\"modifierKind\":[112]},{\"name\":\"ngAfterViewInit\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":136}],\"hostBindings\":[{\"name\":\"class.inline\",\"line\":79,\"type\":\"boolean\"},{\"name\":\"style.maxWidth\",\"line\":83,\"type\":\"string\"}],\"hostListeners\":[],\"description\":\"<p>Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user\\nthe ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility\\nshould be taken into account.</p>\\n<p>Example: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content\\non multiple lines or show as much text as it can fit in one line, showing ellipses (&#39;...&#39;) at the end to denote that\\nthere is still more content and on hover over to display the full content.</p>\\n<p>The current implementation is based on clarity tooltip component, where the tooltip is available only\\nif clipping has occurred.</p>\\n\",\"rawdescription\":\"Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user\\nthe ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility\\nshould be taken into account.\\n\\nExample: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content\\non multiple lines or show as much text as it can fit in one line, showing ellipses ('...') at the end to denote that\\nthere is still more content and on hover over to display the full content.\\n\\nThe current implementation is based on clarity tooltip component, where the tooltip is available only\\nif clipping has occurred.\",\"type\":\"component\",\"sourceCode\":\"import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';\\nimport { ClrIfOpen, ClrTooltipContent } from '@clr/angular';\\n\\nexport enum Position {\\n    TOP = 'TOP',\\n    BOTTOM = 'BOTTOM',\\n    BEFORE = 'BEFORE',\\n    AFTER = 'AFTER',\\n}\\n\\ntype InlineSpec = false | string;\\n\\n/**\\n * Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user\\n * the ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility\\n * should be taken into account.\\n *\\n * Example: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content\\n * on multiple lines or show as much text as it can fit in one line, showing ellipses ('...') at the end to denote that\\n * there is still more content and on hover over to display the full content.\\n *\\n * The current implementation is based on clarity tooltip component, where the tooltip is available only\\n * if clipping has occurred.\\n */\\n@Component({\\n    selector: 'vcd-cliptext',\\n    templateUrl: './cliptext.component.html',\\n    styleUrls: ['./cliptext.component.scss'],\\n})\\nexport class CliptextComponent implements AfterViewInit {\\n    /**\\n     * Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.\\n     * Some of the reasons to avoid it are:\\n     *  - Clarity will introduce smart positioning '[NG] Smart Popover Component #2923'\\n     *  - Future versions may go with different implementation so position may become irrelevant\\n     */\\n    @Input()\\n    set position(position: Position) {\\n        switch (position) {\\n            // Since we use only LTR languages, the mapping is:\\n            // BEFORE->left, AFTER->right, default->'top-right'\\n            // If we introduce RTL languages the mapping should be:\\n            // BEFORE->right, AFTER->left, default->'top-left'\\n            case Position.TOP:\\n                this._tooltipPosition = 'top-right';\\n                break;\\n            case Position.BOTTOM:\\n                this._tooltipPosition = 'bottom-right';\\n                break;\\n            case Position.BEFORE:\\n                this._tooltipPosition = 'left';\\n                break;\\n            case Position.AFTER:\\n                this._tooltipPosition = 'right';\\n                break;\\n            default:\\n                this._tooltipPosition = 'top-right';\\n        }\\n    }\\n\\n    /**\\n     * Whether the tooltip should take up a block, or be inline within text\\n     *\\n     * If its value is falsy (default), it will be displayed as a block (take up the parent's width).\\n     * Otherwise, it should be a CSS string to be used as its max-width;\\n     */\\n    @Input()\\n    set inlineWidth(width: string) {\\n        this._inline = width;\\n    }\\n\\n    private _inline: InlineSpec = false;\\n\\n    @HostBinding('class.inline') get isInline(): boolean {\\n        return !!this._inline;\\n    }\\n\\n    @HostBinding('style.maxWidth') get maxWidth(): string {\\n        return this._inline || '';\\n    }\\n\\n    /**\\n     * Same as Clarity tooltip sizes (xs, sm, md, lg) but currently only the default one (md) is used\\n     */\\n    get size(): string {\\n        return this._size;\\n    }\\n\\n    private _size = 'md';\\n\\n    get tooltipPosition(): string {\\n        return this._tooltipPosition;\\n    }\\n\\n    private _tooltipPosition = 'top-right';\\n\\n    get tooltipText(): string {\\n        return this._tooltipText;\\n    }\\n\\n    private _tooltipText: string;\\n\\n    @ViewChild('cliptextContainer', { static: true })\\n    cliptextContainer: ElementRef;\\n\\n    @ViewChild(ClrIfOpen, { static: true })\\n    private clrIfOpen: ClrIfOpen;\\n\\n    @ViewChild(ClrTooltipContent, { static: false })\\n    set tooltipContent(tooltipContent: ClrTooltipContent) {\\n        if (!tooltipContent) {\\n            return;\\n        }\\n        if (!this.isOverflowing()) {\\n            this.clrIfOpen.open = false;\\n        } else {\\n            // Check if the tooltip text has changed\\n            const tooltipText = this.cliptextContainer.nativeElement.textContent;\\n            if (this._tooltipText !== tooltipText) {\\n                this._tooltipText = tooltipText;\\n                // Re-trigger open so that clarity tooltip is positioned correctly\\n                this.clrIfOpen.open = false;\\n                this.clrIfOpen.open = true;\\n                this.changeDetector.detectChanges();\\n            }\\n        }\\n    }\\n\\n    constructor(private changeDetector: ChangeDetectorRef) {}\\n\\n    ngAfterViewInit(): void {\\n        this._tooltipText = this.cliptextContainer.nativeElement.textContent;\\n    }\\n\\n    private isOverflowing(): boolean {\\n        return isTextOverflowing(this.cliptextContainer.nativeElement);\\n\\n        // Text overflows when the content element's width is less than its scrollWidth.\\n        function isTextOverflowing(el: HTMLElement): boolean {\\n            return Math.ceil(el.getBoundingClientRect().width) < el.scrollWidth;\\n        }\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":[{\"data\":\":host(.inline) {\\n    display: inline-block;\\n    vertical-align: middle;\\n}\\n\\nclr-tooltip {\\n    display: block;\\n\\n    .text-truncate {\\n        overflow: hidden;\\n        text-overflow: ellipsis;\\n        white-space: nowrap;\\n    }\\n}\\n\",\"styleUrl\":\"./cliptext.component.scss\"}],\"stylesData\":\"\",\"constructorObj\":{\"name\":\"constructor\",\"description\":\"\",\"args\":[{\"name\":\"changeDetector\",\"type\":\"ChangeDetectorRef\"}],\"line\":132,\"jsdoctags\":[{\"name\":\"changeDetector\",\"type\":\"ChangeDetectorRef\",\"tagName\":{\"text\":\"param\"}}]},\"implements\":[\"AfterViewInit\"],\"accessors\":{\"position\":{\"name\":\"position\",\"setSignature\":{\"name\":\"position\",\"type\":\"void\",\"args\":[{\"name\":\"position\",\"type\":\"\"}],\"returnType\":\"void\",\"line\":43,\"description\":\"<p>Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.\\nSome of the reasons to avoid it are:</p>\\n<ul>\\n<li>Clarity will introduce smart positioning &#39;[NG] Smart Popover Component #2923&#39;</li>\\n<li>Future versions may go with different implementation so position may become irrelevant</li>\\n</ul>\\n\",\"jsdoctags\":[{\"name\":\"position\",\"type\":\"\",\"tagName\":{\"text\":\"param\"}}]}},\"inlineWidth\":{\"name\":\"inlineWidth\",\"setSignature\":{\"name\":\"inlineWidth\",\"type\":\"void\",\"args\":[{\"name\":\"width\",\"type\":\"string\"}],\"returnType\":\"void\",\"line\":73,\"description\":\"<p>Whether the tooltip should take up a block, or be inline within text</p>\\n<p>If its value is falsy (default), it will be displayed as a block (take up the parent&#39;s width).\\nOtherwise, it should be a CSS string to be used as its max-width;</p>\\n\",\"jsdoctags\":[{\"name\":\"width\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}]}},\"size\":{\"name\":\"size\",\"getSignature\":{\"name\":\"size\",\"type\":\"string\",\"returnType\":\"string\",\"line\":90,\"description\":\"<p>Same as Clarity tooltip sizes (xs, sm, md, lg) but currently only the default one (md) is used</p>\\n\"}},\"tooltipPosition\":{\"name\":\"tooltipPosition\",\"getSignature\":{\"name\":\"tooltipPosition\",\"type\":\"string\",\"returnType\":\"string\",\"line\":96}},\"tooltipText\":{\"name\":\"tooltipText\",\"getSignature\":{\"name\":\"tooltipText\",\"type\":\"string\",\"returnType\":\"string\",\"line\":102}},\"tooltipContent\":{\"name\":\"tooltipContent\",\"setSignature\":{\"name\":\"tooltipContent\",\"type\":\"void\",\"args\":[{\"name\":\"tooltipContent\",\"type\":\"\"}],\"returnType\":\"void\",\"line\":115,\"jsdoctags\":[{\"name\":\"tooltipContent\",\"type\":\"\",\"tagName\":{\"text\":\"param\"}}]}}},\"templateData\":\"<clr-tooltip>\\n    <div #cliptextContainer clrTooltipTrigger class=\\\"cliptext-container text-truncate\\\" [ngClass]=\\\"{ inline: isInline }\\\">\\n        <ng-content></ng-content>\\n    </div>\\n    <clr-tooltip-content aria-hidden=\\\"true\\\" *clrIfOpen [clrPosition]=\\\"tooltipPosition\\\" [clrSize]=\\\"size\\\">\\n        <span>{{ tooltipText }}</span>\\n    </clr-tooltip-content>\\n</clr-tooltip>\\n\"},{\"name\":\"DataExporterComponent\",\"id\":\"component-DataExporterComponent-ec59737c87d6f2e488ec4dbc073c8ae6\",\"file\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-data-exporter\",\"styleUrls\":[\"./data-exporter.component.scss\"],\"styles\":[],\"templateUrl\":[\"data-exporter.component.html\"],\"viewProviders\":[],\"inputsClass\":[{\"name\":\"cancelText\",\"description\":\"<p>Text for the cancel button.</p>\\n\",\"line\":80,\"type\":\"string\"},{\"name\":\"columns\",\"defaultValue\":\"[]\",\"description\":\"<p>List of columns that can be exported, user may deselect some before sending the download request</p>\\n\",\"line\":65,\"type\":\"ExportColumn[]\"},{\"name\":\"dialogHeader\",\"description\":\"<p>Text for the Dialog Header</p>\\n\",\"line\":75,\"type\":\"string\"},{\"name\":\"exportText\",\"description\":\"<p>Text for the export button.</p>\\n\",\"line\":90,\"type\":\"string\"},{\"name\":\"fileName\",\"defaultValue\":\"'data-export.csv'\",\"description\":\"<p>The name of the file to be downloaded</p>\\n\",\"line\":70},{\"name\":\"open\",\"description\":\"<p>Whether the dialog is open</p>\\n\",\"line\":101,\"type\":\"boolean\"},{\"name\":\"selectAllText\",\"description\":\"<p>Text for the select all button.</p>\\n\",\"line\":85,\"type\":\"string\"},{\"name\":\"showSelectAll\",\"defaultValue\":\"true\",\"description\":\"<p>Whether a box to select/deselect all rows is available</p>\\n\",\"line\":95}],\"outputsClass\":[{\"name\":\"dataExportRequest\",\"defaultValue\":\"new EventEmitter<DataExportRequestEvent>()\",\"description\":\"<p>Called when the export is ready to be created</p>\\n\",\"line\":119,\"type\":\"EventEmitter\"},{\"name\":\"openChange\",\"defaultValue\":\"new EventEmitter<boolean>()\",\"description\":\"<p>Fires when {@link _open} changes. Its parameter indicates the new state.</p>\\n\",\"line\":114,\"type\":\"EventEmitter\"}],\"propertiesClass\":[{\"name\":\"_isRequestPending\",\"defaultValue\":\"false\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":128,\"modifierKind\":[112]},{\"name\":\"_open\",\"defaultValue\":\"false\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":109,\"modifierKind\":[112]},{\"name\":\"_progress\",\"defaultValue\":\"0\",\"type\":\"number\",\"optional\":false,\"description\":\"\",\"line\":136,\"modifierKind\":[112]},{\"name\":\"formGroup\",\"type\":\"FormGroup\",\"optional\":false,\"description\":\"\",\"line\":138}],\"methodsClass\":[{\"name\":\"exportData\",\"args\":[{\"name\":\"records\",\"type\":\"object[]\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":184,\"modifierKind\":[112],\"jsdoctags\":[{\"name\":\"records\",\"type\":\"object[]\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"getDisplayNameForField\",\"args\":[{\"name\":\"fieldName\",\"type\":\"string\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":206,\"modifierKind\":[112],\"jsdoctags\":[{\"name\":\"fieldName\",\"type\":\"string\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"ngOnInit\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":176},{\"name\":\"onClickCheckAll\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":149},{\"name\":\"onClickExport\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":140},{\"name\":\"updateProgress\",\"args\":[{\"name\":\"progress\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":202,\"modifierKind\":[112],\"jsdoctags\":[{\"name\":\"progress\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A dialog to export data</p>\\n<ul>\\n<li>Allows the UI to select columns to be exported</li>\\n<li>Provides a progress indicator</li>\\n<li>Converts the data that is fetched by the caller into a CSV</li>\\n</ul>\\n\",\"rawdescription\":\"A dialog to export data\\n\\n  - Allows the UI to select columns to be exported\\n  - Provides a progress indicator\\n  - Converts the data that is fetched by the caller into a CSV\",\"type\":\"component\",\"sourceCode\":\"import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';\\nimport { FormControl, FormGroup } from '@angular/forms';\\nimport { CsvExporterService } from './csv-exporter.service';\\n\\n/**\\n * Identifiers for each column that user is allowed to select\\n */\\nexport interface ExportColumn {\\n    /**\\n     * Displayed in the list of columns\\n     */\\n    displayName: string;\\n    /**\\n     * The name of the field in the JSON that is returned and converted to a viewable format\\n     */\\n    fieldName: string;\\n}\\n\\n/**\\n * Information passed to the caller so they can fetch the data\\n */\\nexport interface DataExportRequestEvent {\\n    /**\\n     * Call this to indicate a new value to be displayed in the progress indicator.\\n     * @param progress A number from 0 to 1 indicating download progress. Passing -1 will make it an indeterminate\\n     */\\n    updateProgress: (progress: number) => void;\\n\\n    /**\\n     * Call this when all records have been fetched to initiate the CSV creation.\\n     * This should only be called once after all data fetching is finished\\n     * @param records Records to be converted into a csv file\\n     */\\n    exportData: (records: object[]) => void;\\n\\n    /**\\n     * Columns selected by the user.\\n     */\\n    selectedColumns: ExportColumn[];\\n}\\n\\n/**\\n * A dialog to export data\\n *\\n *  - Allows the UI to select columns to be exported\\n *  - Provides a progress indicator\\n *  - Converts the data that is fetched by the caller into a CSV\\n */\\n@Component({\\n    selector: 'vcd-data-exporter',\\n    templateUrl: 'data-exporter.component.html',\\n    styleUrls: ['./data-exporter.component.scss'],\\n})\\nexport class DataExporterComponent implements OnInit {\\n    constructor(private csvExporterService: CsvExporterService) {}\\n\\n    /**\\n     * List of columns that can be exported, user may deselect some before sending the download request\\n     */\\n    @Input() columns: ExportColumn[] = [];\\n\\n    /**\\n     * The name of the file to be downloaded\\n     */\\n    @Input() fileName = 'data-export.csv';\\n\\n    /**\\n     * Text for the Dialog Header\\n     */\\n    @Input() dialogHeader: string;\\n\\n    /**\\n     * Text for the cancel button.\\n     */\\n    @Input() cancelText: string;\\n\\n    /**\\n     * Text for the select all button.\\n     */\\n    @Input() selectAllText: string;\\n\\n    /**\\n     * Text for the export button.\\n     */\\n    @Input() exportText: string;\\n\\n    /**\\n     * Whether a box to select/deselect all rows is available\\n     */\\n    @Input() showSelectAll = true;\\n\\n    /**\\n     * Whether the dialog is open\\n     */\\n    @Input()\\n    set open(value: boolean) {\\n        this._open = value;\\n        this.openChange.emit(value);\\n    }\\n    get open(): boolean {\\n        return this._open;\\n    }\\n\\n    private _open = false;\\n\\n    /**\\n     * Fires when {@link _open} changes. Its parameter indicates the new state.\\n     */\\n    @Output() openChange = new EventEmitter<boolean>();\\n\\n    /**\\n     * Called when the export is ready to be created\\n     */\\n    @Output() dataExportRequest = new EventEmitter<DataExportRequestEvent>();\\n\\n    /**\\n     * True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called\\n     * or an error is thrown\\n     */\\n    get isRequestPending(): boolean {\\n        return this._isRequestPending;\\n    }\\n    private _isRequestPending = false;\\n\\n    /**\\n     * Number between 0-1, used for displaying the progress bar.\\n     */\\n    get progress(): number {\\n        return this._progress;\\n    }\\n    private _progress = 0;\\n\\n    formGroup: FormGroup;\\n\\n    onClickExport(): void {\\n        this._isRequestPending = true;\\n        this.dataExportRequest.emit({\\n            exportData: this.exportData.bind(this),\\n            updateProgress: this.updateProgress.bind(this),\\n            selectedColumns: this.columns.filter(col => this.formGroup.controls[col.fieldName].value),\\n        });\\n    }\\n\\n    onClickCheckAll(): void {\\n        for (const column of this.columns) {\\n            this.formGroup.controls[column.fieldName].setValue(true);\\n        }\\n    }\\n\\n    get isSelectAllEnabled(): boolean {\\n        for (const column of this.columns) {\\n            if (!this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    get isExportEnabled(): boolean {\\n        if (this.isRequestPending) {\\n            return false;\\n        }\\n        for (const column of this.columns) {\\n            if (this.formGroup.controls[column.fieldName].value) {\\n                return true;\\n            }\\n        }\\n        return false;\\n    }\\n\\n    ngOnInit(): void {\\n        const controls = this.columns.reduce((previousValue, currentValue) => {\\n            previousValue[currentValue.fieldName] = new FormControl(true);\\n            return previousValue;\\n        }, {});\\n        this.formGroup = new FormGroup(controls);\\n    }\\n\\n    private exportData(records: object[]): void {\\n        if (!this.open) {\\n            return;\\n        }\\n        this.open = false;\\n        this._isRequestPending = false;\\n\\n        const rows = [\\n            // First row is the display names\\n            Object.keys(records[0]).map(fieldName => this.getDisplayNameForField(fieldName)),\\n            // Then the data\\n            ...records.map(rec => Object.keys(rec).map(key => rec[key])),\\n        ];\\n\\n        const csvFile = this.csvExporterService.createCsv(rows);\\n        this.csvExporterService.downloadCsvFile(csvFile, this.fileName);\\n    }\\n\\n    private updateProgress(progress: number): void {\\n        this._progress = progress;\\n    }\\n\\n    private getDisplayNameForField(fieldName: string): string {\\n        for (const column of this.columns) {\\n            if (column.fieldName === fieldName) {\\n                return column.displayName;\\n            }\\n        }\\n        return fieldName;\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":[{\"data\":\"div.progress {\\n    visibility: hidden;\\n\\n    &.pending {\\n        visibility: visible;\\n    }\\n}\\nbutton.select-all {\\n    margin: 0;\\n    padding: 0;\\n}\\n\",\"styleUrl\":\"./data-exporter.component.scss\"}],\"stylesData\":\"\",\"constructorObj\":{\"name\":\"constructor\",\"description\":\"\",\"args\":[{\"name\":\"csvExporterService\",\"type\":\"CsvExporterService\"}],\"line\":59,\"jsdoctags\":[{\"name\":\"csvExporterService\",\"type\":\"CsvExporterService\",\"tagName\":{\"text\":\"param\"}}]},\"implements\":[\"OnInit\"],\"accessors\":{\"open\":{\"name\":\"open\",\"setSignature\":{\"name\":\"open\",\"type\":\"void\",\"args\":[{\"name\":\"value\",\"type\":\"boolean\"}],\"returnType\":\"void\",\"line\":101,\"description\":\"<p>Whether the dialog is open</p>\\n\",\"jsdoctags\":[{\"name\":\"value\",\"type\":\"boolean\",\"tagName\":{\"text\":\"param\"}}]},\"getSignature\":{\"name\":\"open\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":105}},\"isRequestPending\":{\"name\":\"isRequestPending\",\"getSignature\":{\"name\":\"isRequestPending\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":125,\"description\":\"<p>True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called\\nor an error is thrown</p>\\n\"}},\"progress\":{\"name\":\"progress\",\"getSignature\":{\"name\":\"progress\",\"type\":\"number\",\"returnType\":\"number\",\"line\":133,\"description\":\"<p>Number between 0-1, used for displaying the progress bar.</p>\\n\"}},\"isSelectAllEnabled\":{\"name\":\"isSelectAllEnabled\",\"getSignature\":{\"name\":\"isSelectAllEnabled\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":155}},\"isExportEnabled\":{\"name\":\"isExportEnabled\",\"getSignature\":{\"name\":\"isExportEnabled\",\"type\":\"boolean\",\"returnType\":\"boolean\",\"line\":164}}},\"templateData\":\"<clr-modal [clrModalOpen]=\\\"open\\\" (clrModalOpenChange)=\\\"openChange.emit($event)\\\" [clrModalSize]=\\\"'sm'\\\" #modal>\\n    <h3 class=\\\"modal-title\\\">{{ dialogHeader || ('data-exporter.title' | translate) }}</h3>\\n    <div class=\\\"modal-body\\\">\\n        <button\\n            *ngIf=\\\"showSelectAll\\\"\\n            class=\\\"btn btn-sm btn-link select-all\\\"\\n            type=\\\"button\\\"\\n            (click)=\\\"onClickCheckAll()\\\"\\n            [disabled]=\\\"!isSelectAllEnabled\\\"\\n        >\\n            {{ selectAllText || ('select.all' | translate) }}\\n        </button>\\n        <ul class=\\\"list-unstyled column-selection\\\" [formGroup]=\\\"formGroup\\\">\\n            <li *ngFor=\\\"let col of columns\\\">\\n                <clr-checkbox-wrapper>\\n                    <input type=\\\"checkbox\\\" clrCheckbox [formControlName]=\\\"col.fieldName\\\" />\\n                    <label>{{ col.displayName }}</label>\\n                </clr-checkbox-wrapper>\\n            </li>\\n        </ul>\\n        <div class=\\\"progress\\\" [ngClass]=\\\"{ loop: progress == -1, pending: isRequestPending }\\\">\\n            <progress max=\\\"100\\\" value=\\\"{{ progress * 100 }}\\\"></progress>\\n        </div>\\n    </div>\\n    <hr />\\n\\n    <div class=\\\"modal-footer\\\">\\n        <button type=\\\"button\\\" class=\\\"btn btn-outline cancel\\\" (click)=\\\"open = false\\\">\\n            {{ cancelText || ('cancel' | translate) }}\\n        </button>\\n        <button type=\\\"button\\\" class=\\\"btn btn-primary export\\\" [disabled]=\\\"!isExportEnabled\\\" (click)=\\\"onClickExport()\\\">\\n            {{ exportText || ('export' | translate) }}\\n        </button>\\n    </div>\\n</clr-modal>\\n\"},{\"name\":\"DatagridComponent\",\"id\":\"component-DatagridComponent-f0a51d70e0ac8fffdc2e5de800f72d30\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid\",\"styleUrls\":[],\"styles\":[],\"templateUrl\":[\"./datagrid.component.html\"],\"viewProviders\":[],\"inputsClass\":[{\"name\":\"clrDatagridCssClass\",\"defaultValue\":\"''\",\"description\":\"<p>The CSS class to use for the Clarity datagrid.</p>\\n\",\"line\":181},{\"name\":\"clrDatarowCssClassGetter\",\"description\":\"<p>Gives the CSS class to use for a given datarow based on its relative index and entity definition.</p>\\n\",\"line\":324,\"type\":\"string\"},{\"name\":\"columns\",\"description\":\"<p>Sets the configuration of columns on the grid and updates the {@link columnsConfig} array</p>\\n\",\"line\":146,\"type\":\"[]\"},{\"name\":\"gridData\",\"description\":\"<p>Set from the caller component using this grid. The input is set upon fetching data by the caller</p>\\n\",\"line\":157,\"type\":\"\"},{\"name\":\"pagination\",\"defaultValue\":\"{\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    }\",\"description\":\"<p>The pagination information that the user should supply.</p>\\n\",\"line\":225,\"type\":\"literal type\"},{\"name\":\"paginationCallback\",\"description\":\"<p>Gives the correct string to display for the pagination.</p>\\n\",\"line\":317,\"type\":\"string\"},{\"name\":\"paginationDropdownText\",\"defaultValue\":\"''\",\"description\":\"<p>The text placed next to the pagination number dropdown.</p>\\n\",\"line\":186},{\"name\":\"selectionType\",\"description\":\"<p>Type of row selection on the grid</p>\\n\",\"line\":167,\"type\":\"\"},{\"name\":\"trackBy\",\"defaultValue\":\"(index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    }\",\"description\":\"<p>Returns an identifier for the given record at the given index.</p>\\n<p>If the record has a href, defaults to that. Else, defaults to index.</p>\\n\",\"line\":305,\"type\":\"TrackByFunction<R>\"}],\"outputsClass\":[{\"name\":\"gridRefresh\",\"defaultValue\":\"new EventEmitter<GridState<R>>()\",\"description\":\"<p>Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n{@link #GridState} is the type of value emitted</p>\\n\",\"line\":289,\"type\":\"EventEmitter<GridState<R>>\"}],\"propertiesClass\":[{\"name\":\"_columns\",\"type\":\"GridColumn<R>[]\",\"optional\":false,\"description\":\"\",\"line\":172,\"modifierKind\":[112]},{\"name\":\"_selectionType\",\"defaultValue\":\"GridSelectionType.None\",\"type\":\"GridSelectionType\",\"optional\":false,\"description\":\"\",\"line\":176,\"modifierKind\":[112]},{\"name\":\"buttons\",\"type\":\"literal type\",\"optional\":false,\"description\":\"<p>Buttons to display in the toolbar on top of data grid\\nshowHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\nenableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\nvisible but disabled when no rights)</p>\\n<p>TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n  This API is going to be refined as part of <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-21\\\">https://jira.eng.vmware.com/browse/VDUCC-21</a></p>\\n\",\"line\":203},{\"name\":\"columnsConfig\",\"type\":\"ColumnConfigInternal<R, unknown>[]\",\"optional\":false,\"description\":\"<p>Used for simplifying logic inside the HTML template to differentiate between different\\n{@link GridColumn.renderer} types.</p>\\n\",\"line\":262},{\"name\":\"datagrid\",\"type\":\"ClrDatagrid\",\"optional\":false,\"description\":\"\",\"line\":293,\"decorators\":[{\"name\":\"ViewChild\",\"stringifiedArguments\":\"ClrDatagrid, {static: true}\"}]},{\"name\":\"detailTemplate\",\"type\":\"TemplateRef<ElementRef>\",\"optional\":false,\"description\":\"\",\"line\":174,\"decorators\":[{\"name\":\"ContentChild\",\"stringifiedArguments\":\"TemplateRef, {static: false}\"}]},{\"name\":\"emptyGridPlaceholder\",\"type\":\"string\",\"optional\":false,\"description\":\"<p>When there is no data, show this message.</p>\\n<p>TODO: Try to avoid showing this before initial load.</p>\\n\",\"line\":213},{\"name\":\"expandableRowTemplate\",\"type\":\"TemplateRef<R>\",\"optional\":false,\"description\":\"<p>Inline HTML that is passed with the record/rest item as context</p>\\n<p>TODO: <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-18\\\">https://jira.eng.vmware.com/browse/VDUCC-18</a></p>\\n\",\"line\":220},{\"name\":\"GridColumnHideable\",\"defaultValue\":\"GridColumnHideable\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":171},{\"name\":\"height\",\"type\":\"number\",\"optional\":false,\"description\":\"<p>Desired height of the grid</p>\\n<p>TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n  Also investigate if we can set this through CSS instead of an input\\n  The above to-do is going to be worked as part of <a href=\\\"https://jira.eng.vmware.com/browse/VDUCC-25\\\">https://jira.eng.vmware.com/browse/VDUCC-25</a></p>\\n\",\"line\":251},{\"name\":\"isLoading\",\"defaultValue\":\"false\",\"type\":\"\",\"optional\":false,\"description\":\"<p>Loading indicator on the grid</p>\\n\",\"line\":256},{\"name\":\"items\",\"type\":\"R[]\",\"optional\":false,\"description\":\"<p>List of items used for displaying rows on the grid</p>\\n\",\"line\":267},{\"name\":\"multiSelection\",\"defaultValue\":\"[]\",\"type\":\"R[]\",\"optional\":false,\"description\":\"<p>The value of the multi selection.</p>\\n\",\"line\":277},{\"name\":\"numericFilter\",\"type\":\"ClrDatagridFilter\",\"optional\":false,\"description\":\"\",\"line\":291,\"decorators\":[{\"name\":\"ViewChild\",\"stringifiedArguments\":\"ClrDatagridFilter, {static: false}\"}]},{\"name\":\"paginationComponent\",\"type\":\"ClrDatagridPagination\",\"optional\":false,\"description\":\"<p>The pagination display within the datagrid.</p>\\n\",\"line\":298,\"decorators\":[{\"name\":\"ViewChild\",\"stringifiedArguments\":\"ClrDatagridPagination, {static: false}\"}]},{\"name\":\"selectionChanged\",\"type\":\"EventEmitter<R[]>\",\"optional\":false,\"description\":\"<p>Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\nelement in case of single selection</p>\\n\",\"line\":192},{\"name\":\"singleSelected\",\"defaultValue\":\"undefined\",\"type\":\"R\",\"optional\":false,\"description\":\"<p>The value of the single selection.</p>\\n\",\"line\":272},{\"name\":\"totalItems\",\"type\":\"number\",\"optional\":true,\"description\":\"<p>The total number of items that could be displayed in the grid.</p>\\n\",\"line\":282}],\"methodsClass\":[{\"name\":\"clearSelectionInformation\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":360,\"modifierKind\":[112]},{\"name\":\"getColumnsConfig\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":443,\"description\":\"<p>Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\nof renderers which is required in the HTML template.</p>\\n\",\"modifierKind\":[112]},{\"name\":\"getDatagridSelection\",\"args\":[],\"optional\":false,\"returnType\":\"R[]\",\"typeParameters\":[],\"line\":380,\"description\":\"<p>Returns the items selected in the VCD datagrid.</p>\\n\"},{\"name\":\"gridStateChanged\",\"args\":[{\"name\":\"state\",\"type\":\"ClrDatagridStateInterface\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":393,\"description\":\"<p>Called when the {@param state} of the Clarity datagrid changes.</p>\\n\",\"jsdoctags\":[{\"name\":\"state\",\"type\":\"ClrDatagridStateInterface\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"isColumnHideable\",\"args\":[{\"name\":\"column\",\"type\":\"GridColumn<R>\"}],\"optional\":false,\"returnType\":\"boolean\",\"typeParameters\":[],\"line\":421,\"jsdoctags\":[{\"name\":\"column\",\"type\":\"GridColumn<R>\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"ngOnInit\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":328},{\"name\":\"paginationCallbackWrapper\",\"args\":[{\"name\":\"paginationData\",\"type\":\"ClrDatagridPagination\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":435,\"description\":\"<p>Updates the pagination data and makes the callback.</p>\\n\",\"jsdoctags\":[{\"name\":\"paginationData\",\"type\":\"ClrDatagridPagination\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"resetToPageOne\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":417,\"description\":\"<p>Resets the pagination to page 1.</p>\\n\"},{\"name\":\"sameItemsAsPageSize\",\"args\":[],\"optional\":false,\"returnType\":\"boolean\",\"typeParameters\":[],\"line\":428,\"description\":\"<p>Says if the number of items matches the page size.</p>\\n\"},{\"name\":\"updateSelectedItems\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":333,\"modifierKind\":[112]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>Component used for saving the time required for developing a data grid. It takes different properties required for\\nrendering as Inputs and Outputs.</p>\\n<p>Example usage in a component:\\nIn the component view, different properties required for the grid are wired as Inputs and Outputs.\\n&lt;vcd-datagrid\\n    (onGridRefresh)=&quot;fetchData()&quot;\\n    [columns]=&quot;columns&quot;\\n    [gridData]=&quot;gridData&quot;&gt;\\n  </vcd-datagrid></p>\\n\",\"rawdescription\":\"Component used for saving the time required for developing a data grid. It takes different properties required for\\nrendering as Inputs and Outputs.\\n\\nExample usage in a component:\\nIn the component view, different properties required for the grid are wired as Inputs and Outputs.\\n<vcd-datagrid\\n    (onGridRefresh)=\\\"fetchData()\\\"\\n    [columns]=\\\"columns\\\"\\n    [gridData]=\\\"gridData\\\">\\n  </vcd-datagrid>\",\"type\":\"component\",\"sourceCode\":\"import {\\n    Component,\\n    EventEmitter,\\n    Input,\\n    OnInit,\\n    Output,\\n    TemplateRef,\\n    ViewChild,\\n    ContentChild,\\n    ElementRef,\\n    TrackByFunction,\\n} from '@angular/core';\\nimport { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';\\nimport { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';\\nimport { ComponentRendererSpec } from './interfaces/component-renderer.interface';\\n\\n/**\\n * Different types of row selection on the grid\\n */\\nexport enum GridSelectionType {\\n    /**\\n     * For selecting multiple rows\\n     */\\n    Multi = 'MULTI',\\n    /**\\n     * For selecting only one row at a time\\n     */\\n    Single = 'SINGLE',\\n    /**\\n     * Disables the selection\\n     */\\n    None = 'NONE',\\n}\\n\\n/**\\n * TODO: This API is going to have more properties and is going to be defined as part of\\n *  https://jira.eng.vmware.com/browse/VDUCC-21\\n */\\n// tslint:disable-next-line:no-empty-interface\\nexport interface Button {}\\n\\n/**\\n * Representation of data required for rendering contents of cells and pagination information\\n */\\nexport interface GridDataFetchResult<R> {\\n    /**\\n     * Items to be listed in the grid\\n     */\\n    items: R[];\\n    /**\\n     * Total number of items\\n     */\\n    totalItems?: number;\\n}\\n\\n/**\\n * The information about the currently sorted column.\\n */\\nexport interface SortedColumn {\\n    /**\\n     * Whether the column is sorted normally or reversed.\\n     */\\n    reverse: boolean;\\n    /**\\n     * The name of the column that is sorted.\\n     */\\n    name: string;\\n}\\n\\n/**\\n * Representation an entity that has a href property.\\n */\\ninterface HasHref {\\n    href?: string;\\n}\\n\\n/**\\n * The information about pagionation that will be exposed.\\n */\\nexport interface PagionationInformation {\\n    /**\\n     * What page is currently selected.\\n     */\\n    pageNumber: number;\\n    /**\\n     * How many items belong on a page.\\n     */\\n    itemsPerPage: number;\\n}\\n/**\\n * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as\\n * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.\\n * TODO: This interface is going to defined as part of working on the following tasks:\\n *  https://jira.eng.vmware.com/browse/VDUCC-14\\n *  https://jira.eng.vmware.com/browse/VDUCC-15\\n *  https://jira.eng.vmware.com/browse/VDUCC-20\\n */\\nexport interface GridState<R> {\\n    /**\\n     * The currently sorted column in the datagrid.\\n     */\\n    sortColumn?: SortedColumn;\\n    /**\\n     * The pagination information that the datagrid should show.\\n     */\\n    pagination: PagionationInformation;\\n}\\n\\n/**\\n * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}\\n * types.\\n */\\ninterface ColumnConfigInternal<R, T> extends GridColumn<R> {\\n    fieldName?: string;\\n    fieldRenderer?: FunctionRenderer<R>;\\n    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;\\n}\\n\\n/**\\n * Component used for saving the time required for developing a data grid. It takes different properties required for\\n * rendering as Inputs and Outputs.\\n *\\n * Example usage in a component:\\n * In the component view, different properties required for the grid are wired as Inputs and Outputs.\\n * <vcd-datagrid\\n *    (onGridRefresh)=\\\"fetchData()\\\"\\n *    [columns]=\\\"columns\\\"\\n *    [gridData]=\\\"gridData\\\">\\n *  </vcd-datagrid>\\n *\\n */\\n@Component({\\n    selector: 'vcd-datagrid',\\n    templateUrl: './datagrid.component.html',\\n})\\nexport class DatagridComponent<R> implements OnInit {\\n    /**\\n     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array\\n     */\\n    @Input()\\n    set columns(cols: GridColumn<R>[]) {\\n        this._columns = cols;\\n        this.getColumnsConfig();\\n    }\\n    get columns(): GridColumn<R>[] {\\n        return this._columns;\\n    }\\n\\n    /**\\n     * Set from the caller component using this grid. The input is set upon fetching data by the caller\\n     */\\n    @Input() set gridData(result: GridDataFetchResult<R>) {\\n        this.isLoading = false;\\n        this.items = result.items;\\n        this.totalItems = result.totalItems;\\n        this.updateSelectedItems();\\n    }\\n\\n    /**\\n     * Type of row selection on the grid\\n     */\\n    @Input() set selectionType(selectionType: GridSelectionType) {\\n        this._selectionType = selectionType;\\n        this.clearSelectionInformation();\\n    }\\n    GridColumnHideable = GridColumnHideable;\\n    private _columns: GridColumn<R>[];\\n\\n    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;\\n\\n    private _selectionType: GridSelectionType = GridSelectionType.None;\\n\\n    /**\\n     * The CSS class to use for the Clarity datagrid.\\n     */\\n    @Input() clrDatagridCssClass = '';\\n\\n    /**\\n     * The text placed next to the pagination number dropdown.\\n     */\\n    @Input() paginationDropdownText = '';\\n\\n    /**\\n     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one\\n     * element in case of single selection\\n     */\\n    selectionChanged: EventEmitter<R[]>;\\n\\n    /**\\n     * Buttons to display in the toolbar on top of data grid\\n     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)\\n     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always\\n     * visible but disabled when no rights)\\n     *\\n     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.\\n     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21\\n     */\\n    buttons: {\\n        showHide: Button[];\\n        enableDisable: Button[];\\n    };\\n\\n    /**\\n     * When there is no data, show this message.\\n     *\\n     * TODO: Try to avoid showing this before initial load.\\n     */\\n    emptyGridPlaceholder: string;\\n\\n    /**\\n     * Inline HTML that is passed with the record/rest item as context\\n     *\\n     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18\\n     */\\n    expandableRowTemplate: TemplateRef<R>;\\n\\n    /**\\n     * The pagination information that the user should supply.\\n     */\\n    @Input() pagination: {\\n        /**\\n         * Available page size options in the dropdown\\n         */\\n        pageSizeOptions: number[];\\n\\n        /**\\n         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined\\n         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)\\n         *\\n         * Magic: Auto calculates the size based on available height of the container\\n         */\\n        // TODO: implement 'Magic'\\n        pageSize: number; // | 'Magic';\\n    } = {\\n        pageSize: 10,\\n        pageSizeOptions: [10, 20, 50, 100],\\n    };\\n\\n    /**\\n     * Desired height of the grid\\n     *\\n     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.\\n     *  Also investigate if we can set this through CSS instead of an input\\n     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25\\n     */\\n    height: number;\\n\\n    /**\\n     * Loading indicator on the grid\\n     */\\n    isLoading = false;\\n\\n    /**\\n     * Used for simplifying logic inside the HTML template to differentiate between different\\n     * {@link GridColumn.renderer} types.\\n     */\\n    columnsConfig: ColumnConfigInternal<R, unknown>[];\\n\\n    /**\\n     * List of items used for displaying rows on the grid\\n     */\\n    items: R[];\\n\\n    /**\\n     * The value of the single selection.\\n     */\\n    singleSelected: R = undefined;\\n\\n    /**\\n     * The value of the multi selection.\\n     */\\n    multiSelection: R[] = [];\\n\\n    /**\\n     * The total number of items that could be displayed in the grid.\\n     */\\n    totalItems?: number;\\n\\n    /**\\n     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change\\n     * {@link #GridState} is the type of value emitted\\n     */\\n    @Output()\\n    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();\\n\\n    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;\\n\\n    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;\\n\\n    /**\\n     * The pagination display within the datagrid.\\n     */\\n    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;\\n\\n    /**\\n     * Returns an identifier for the given record at the given index.\\n     *\\n     * If the record has a href, defaults to that. Else, defaults to index.\\n     */\\n    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {\\n        return record && (record.href || index);\\n        // tslint:disable-next-line: semicolon\\n    };\\n\\n    /**\\n     * Gives the correct string to display for the pagination.\\n     *\\n     * @param firstItem the index of the first item displayed.\\n     * @param lastItem the index of the last item displayed.\\n     * @param totalItems the total number of items that could be displayed.\\n     */\\n    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {\\n        return `${firstItem} - ${lastItem} of ${totalItems} rows`;\\n    }\\n\\n    /**\\n     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.\\n     */\\n    @Input() clrDatarowCssClassGetter(row: R, index: number): string {\\n        return '';\\n    }\\n\\n    ngOnInit(): void {\\n        this.isLoading = true;\\n        this.clearSelectionInformation();\\n    }\\n\\n    private updateSelectedItems(): void {\\n        if (this._selectionType === GridSelectionType.Single) {\\n            // Tries to find the currently selected item. If it isn't found, clears the selection.\\n            const found = this.items.find(\\n                (item, itemIndex) =>\\n                    this.trackBy(itemIndex, item) ===\\n                    this.trackBy(\\n                        this.items.indexOf(this.datagrid.selection.currentSingle),\\n                        this.datagrid.selection.currentSingle\\n                    )\\n            );\\n            if (!found) {\\n                this.datagrid.selection.currentSingle = undefined;\\n            }\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.\\n            if (this.datagrid.selection.current) {\\n                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {\\n                    const found = this.items.find(\\n                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)\\n                    );\\n                    return found;\\n                });\\n            }\\n        }\\n    }\\n\\n    private clearSelectionInformation(): void {\\n        if (!this.datagrid) {\\n            return;\\n        }\\n        if (this._selectionType === GridSelectionType.Single) {\\n            this.datagrid.selected = undefined;\\n            this.datagrid.singleSelected = this.singleSelected;\\n        } else if (this._selectionType === GridSelectionType.Multi) {\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = this.multiSelection;\\n        } else if (this._selectionType === GridSelectionType.None) {\\n            this.datagrid.selected = [];\\n            this.datagrid.singleSelected = undefined;\\n            this.datagrid.selected = undefined;\\n        }\\n    }\\n\\n    /**\\n     * Returns the items selected in the VCD datagrid.\\n     */\\n    getDatagridSelection(): R[] {\\n        if (this.datagrid.selection.currentSingle) {\\n            return [this.datagrid.selection.currentSingle];\\n        }\\n        if (this.datagrid.selection.current) {\\n            return this.datagrid.selection.current;\\n        }\\n        return [];\\n    }\\n\\n    /**\\n     * Called when the {@param state} of the Clarity datagrid changes.\\n     */\\n    gridStateChanged(state: ClrDatagridStateInterface): void {\\n        // Update pagination information.\\n        const pagination = {\\n            pageNumber: state.page ? state.page.current : 1,\\n            itemsPerPage: state.page ? state.page.size : 10,\\n        };\\n\\n        // Update the sorting information.\\n        const toEmit: GridState<R> = {\\n            pagination,\\n        };\\n        if (state.sort && typeof state.sort.by === 'string') {\\n            toEmit.sortColumn = {\\n                name: state.sort.by,\\n                reverse: state.sort.reverse,\\n            };\\n        }\\n\\n        this.gridRefresh.emit(toEmit);\\n    }\\n\\n    /**\\n     * Resets the pagination to page 1.\\n     */\\n    resetToPageOne(): void {\\n        this.paginationComponent.currentPage = 1;\\n    }\\n\\n    isColumnHideable(column: GridColumn<R>): boolean {\\n        return column && column.hideable && column.hideable !== GridColumnHideable.Never;\\n    }\\n\\n    /**\\n     * Says if the number of items matches the page size.\\n     */\\n    sameItemsAsPageSize(): boolean {\\n        return this.pagination.pageSize === this.items.length;\\n    }\\n\\n    /**\\n     * Updates the pagination data and makes the callback.\\n     */\\n    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {\\n        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);\\n    }\\n\\n    /**\\n     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds\\n     * of renderers which is required in the HTML template.\\n     */\\n    private getColumnsConfig(): void {\\n        this.columnsConfig = this.columns.map(column => {\\n            const columnConfig: ColumnConfigInternal<R, unknown> = {\\n                ...column,\\n            };\\n\\n            if (column.renderer instanceof Function) {\\n                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;\\n            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {\\n                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;\\n            } else {\\n                columnConfig.fieldName = column.renderer as string;\\n            }\\n\\n            return columnConfig;\\n        });\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\",\"implements\":[\"OnInit\"],\"accessors\":{\"columns\":{\"name\":\"columns\",\"setSignature\":{\"name\":\"columns\",\"type\":\"void\",\"args\":[{\"name\":\"cols\",\"type\":\"[]\"}],\"returnType\":\"void\",\"line\":146,\"description\":\"<p>Sets the configuration of columns on the grid and updates the {@link columnsConfig} array</p>\\n\",\"jsdoctags\":[{\"name\":\"cols\",\"type\":\"[]\",\"tagName\":{\"text\":\"param\"}}]},\"getSignature\":{\"name\":\"columns\",\"type\":\"[]\",\"returnType\":\"GridColumn[]\",\"line\":150}},\"gridData\":{\"name\":\"gridData\",\"setSignature\":{\"name\":\"gridData\",\"type\":\"void\",\"args\":[{\"name\":\"result\",\"type\":\"\"}],\"returnType\":\"void\",\"line\":157,\"description\":\"<p>Set from the caller component using this grid. The input is set upon fetching data by the caller</p>\\n\",\"jsdoctags\":[{\"name\":\"result\",\"type\":\"\",\"tagName\":{\"text\":\"param\"}}]}},\"selectionType\":{\"name\":\"selectionType\",\"setSignature\":{\"name\":\"selectionType\",\"type\":\"void\",\"args\":[{\"name\":\"selectionType\",\"type\":\"\"}],\"returnType\":\"void\",\"line\":167,\"description\":\"<p>Type of row selection on the grid</p>\\n\",\"jsdoctags\":[{\"name\":\"selectionType\",\"type\":\"\",\"tagName\":{\"text\":\"param\"}}]}}},\"templateData\":\"<clr-datagrid [clrDgLoading]=\\\"isLoading\\\" [ngClass]=\\\"this.clrDatagridCssClass\\\" (clrDgRefresh)=\\\"gridStateChanged($event)\\\">\\n    <clr-dg-column\\n        *ngFor=\\\"let column of columnsConfig\\\"\\n        [clrDgField]=\\\"column.queryFieldName\\\"\\n        (clrDgSortOrderChange)=\\\"resetToPageOne()\\\"\\n    >\\n        <ng-container *ngIf=\\\"isColumnHideable(column); else notHideable\\\">\\n            <ng-container *clrDgHideableColumn=\\\"{ hidden: column.hideable === GridColumnHideable.Hidden }\\\">{{\\n                column.displayName\\n            }}</ng-container>\\n        </ng-container>\\n        <ng-template #notHideable>{{ column.displayName }}</ng-template>\\n    </clr-dg-column>\\n\\n    <clr-dg-row\\n        *ngFor=\\\"let restItem of items; let i = index\\\"\\n        [ngForTrackBy]=\\\"trackBy\\\"\\n        [ngClass]=\\\"this.clrDatarowCssClassGetter(restItem, i)\\\"\\n        [clrDgItem]=\\\"restItem\\\"\\n    >\\n        <clr-dg-cell *ngFor=\\\"let column of columnsConfig\\\">\\n            <!-- Default renderer -->\\n            <ng-container *ngIf=\\\"column.fieldName\\\">{{ restItem | nestedProperty: column.fieldName }}</ng-container>\\n\\n            <!-- Renderer is a function -->\\n            <ng-container *ngIf=\\\"column.fieldRenderer\\\">{{\\n                restItem | functionRenderer: column.fieldRenderer\\n            }}</ng-container>\\n\\n            <!-- Renderer is a componentRenderer -->\\n            <ng-template\\n                *ngIf=\\\"column.fieldColumnRendererSpec\\\"\\n                [vcdComponentRendererOutlet]=\\\"{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }\\\"\\n            >\\n            </ng-template>\\n        </clr-dg-cell>\\n        <ng-container ngProjectAs=\\\"clr-dg-row-detail\\\" *ngIf=\\\"detailTemplate !== undefined\\\">\\n            <clr-dg-row-detail *clrIfExpanded>\\n                <ng-content *ngTemplateOutlet=\\\"detailTemplate; context: { record: restItem }\\\"> </ng-content>\\n            </clr-dg-row-detail>\\n        </ng-container>\\n    </clr-dg-row>\\n    <clr-dg-row *ngIf=\\\"sameItemsAsPageSize()\\\"> </clr-dg-row>\\n\\n    <clr-dg-footer>\\n        <clr-dg-pagination #paginationData [clrDgTotalItems]=\\\"totalItems\\\" [(clrDgPageSize)]=\\\"this.pagination.pageSize\\\">\\n            <clr-dg-page-size [clrPageSizeOptions]=\\\"this.pagination.pageSizeOptions\\\">{{\\n                paginationDropdownText\\n            }}</clr-dg-page-size>\\n            {{ paginationCallbackWrapper(paginationData) }}\\n        </clr-dg-pagination>\\n    </clr-dg-footer>\\n</clr-datagrid>\\n\"}],\"modules\":[{\"name\":\"CliptextModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"CliptextComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"CliptextComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"ComponentsModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[]},{\"type\":\"imports\",\"elements\":[{\"name\":\"CliptextModule\"},{\"name\":\"DataExporterModule\"},{\"name\":\"DatagridModule\"}]},{\"type\":\"exports\",\"elements\":[{\"name\":\"CliptextModule\"},{\"name\":\"DataExporterModule\"},{\"name\":\"DatagridModule\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DataExporterModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DataExporterComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DataExporterComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"BoldTextRendererComponent\"},{\"name\":\"ComponentRendererOutletDirective\"},{\"name\":\"DatagridComponent\"},{\"name\":\"FunctionRendererPipe\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"BoldTextRendererComponent\"},{\"name\":\"DatagridComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"PipesModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"NestedPropertyPipe\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"NestedPropertyPipe\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]}],\"miscellaneous\":{\"variables\":[{\"name\":\"CELL_TAG\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-cell'\"},{\"name\":\"COLUMN_CSS_SELECTOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'.datagrid-column-title'\"},{\"name\":\"COLUMN_SELECTOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-column'\"},{\"name\":\"Css\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/data-exporter/data-exporter.wo.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    SelectAll: '.select-all',\\n    SelectColumn: '.column-selection label',\\n}\"},{\"name\":\"DATE_OBJECT_CLASS\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"string\",\"defaultValue\":\"'[object Date]'\"},{\"name\":\"declarations\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/pipes.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[NestedPropertyPipe]\"},{\"name\":\"directives\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[DatagridComponent, ComponentRendererOutletDirective]\"},{\"name\":\"OBJECT_PROPERTY_SEPARATOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"string\",\"defaultValue\":\"'.'\"},{\"name\":\"pipes\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[FunctionRendererPipe]\"},{\"name\":\"renderers\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[BoldTextRendererComponent]\"},{\"name\":\"ROW_TAG\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-row'\"}],\"functions\":[{\"name\":\"encodeValue\",\"file\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Returns a cell&#39;s cellValue encoded against spaces, quotes, and CSV injection character</p>\\n\",\"args\":[{\"name\":\"cellValue\"}],\"returnType\":\"string\",\"jsdoctags\":[{\"name\":{\"pos\":1756,\"end\":1765,\"flags\":0,\"escapedText\":\"cellValue\"},\"tagName\":{\"pos\":1750,\"end\":1755,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Cell cellValue to be encoded</p>\\n\"}]},{\"name\":\"isFindParamsObject\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"\",\"args\":[{\"name\":\"params\"}],\"returnType\":\"FindParams<T>\",\"jsdoctags\":[{\"name\":\"params\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"isNullOrUndefined\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Utility method for covering the &#39;null&#39; and &#39;undefined&#39; checks as &#39;value == null&#39; is equivalent to &#39;value === null || value === undefined&#39;</p>\\n\",\"args\":[{\"name\":\"value\"}],\"returnType\":\"boolean\",\"jsdoctags\":[{\"name\":\"value\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"processRow\",\"file\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Returns a string</p>\\n\",\"args\":[{\"name\":\"row\"}],\"returnType\":\"string\",\"jsdoctags\":[{\"name\":{\"pos\":1470,\"end\":1473,\"flags\":0,\"escapedText\":\"row\"},\"tagName\":{\"pos\":1464,\"end\":1469,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>A list of cells to be turned into a CSV string, separated by commas</p>\\n\"}]},{\"name\":\"RendererSpec\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Utility function to enforce type safety on output of the config function. The output is used as value context\\ninside ComponentRenderer&#39;s template</p>\\n<p>Example usage:\\nconst gridColumn = {\\n   renderer: RendererSpec&lt;SomeRecord, IconRendererConfiguration&gt;(IconComponentRendererCtor, (r: SomeRecord) =&gt; v)\\n}</p>\\n<p>In the above example, this method helps in making sure that the value &quot;v&quot; returned by the config function is of\\nIconRendererConfiguration type</p>\\n\",\"args\":[{\"name\":\"componentRendererSpec\"}],\"returnType\":\"ComponentRendererSpec<R, C>\",\"jsdoctags\":[{\"name\":\"componentRendererSpec\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"WithGridBoldRenderer\",\"file\":\"projects/components/src/datagrid/renderers/bold-text-renderer.wo.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Mixin that allows {@link ClrDatagridWidgetObject} to read information from {@link BoldTextRendererComponent}</p>\\n\",\"args\":[{\"name\":\"Base\"}],\"jsdoctags\":[{\"name\":\"Base\",\"tagName\":{\"text\":\"param\"}}]}],\"typealiases\":[{\"name\":\"ComponentRendererConstructor\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"Type<ComponentRenderer<V>>\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"description\":\"<p>Used for the type safety of {@link ComponentRendererSpec#type}</p>\\n\",\"kind\":161},{\"name\":\"FunctionRenderer\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"function\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\",\"description\":\"<p>Column renderer as a function. Defined in calling component when the cell value is calculated from different\\nproperties.</p>\\n\",\"kind\":162},{\"name\":\"InlineSpec\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"\\\"undefined\\\" | string\",\"file\":\"projects/components/src/cliptext/cliptext.component.ts\",\"description\":\"\",\"kind\":168}],\"enumerations\":[{\"name\":\"GridColumnHideable\",\"childs\":[{\"name\":\"Never\",\"value\":\"NEVER\"},{\"name\":\"Shown\",\"value\":\"SHOWN\"},{\"name\":\"Hidden\",\"value\":\"HIDDEN\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\"},{\"name\":\"GridColumnSortDirection\",\"childs\":[{\"name\":\"Asc\",\"value\":\"ASCENDING\"},{\"name\":\"Desc\",\"value\":\"DESCENDING\"},{\"name\":\"None\",\"value\":\"NONE\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"<p>The sorting direction of the column values</p>\\n\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\"},{\"name\":\"GridSelectionType\",\"childs\":[{\"name\":\"Multi\",\"value\":\"MULTI\"},{\"name\":\"Single\",\"value\":\"SINGLE\"},{\"name\":\"None\",\"value\":\"NONE\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"<p>Different types of row selection on the grid</p>\\n\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\"},{\"name\":\"Position\",\"childs\":[{\"name\":\"TOP\",\"value\":\"TOP\"},{\"name\":\"BOTTOM\",\"value\":\"BOTTOM\"},{\"name\":\"BEFORE\",\"value\":\"BEFORE\"},{\"name\":\"AFTER\",\"value\":\"AFTER\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"\",\"file\":\"projects/components/src/cliptext/cliptext.component.ts\"}],\"groupedVariables\":{\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\":[{\"name\":\"CELL_TAG\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-cell'\"},{\"name\":\"COLUMN_CSS_SELECTOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'.datagrid-column-title'\"},{\"name\":\"COLUMN_SELECTOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-column'\"},{\"name\":\"ROW_TAG\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"string\",\"defaultValue\":\"'clr-dg-row'\"}],\"projects/components/src/data-exporter/data-exporter.wo.ts\":[{\"name\":\"Css\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/data-exporter/data-exporter.wo.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    SelectAll: '.select-all',\\n    SelectColumn: '.column-selection label',\\n}\"}],\"projects/components/src/common/pipes/nested-property.pipe.ts\":[{\"name\":\"DATE_OBJECT_CLASS\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"string\",\"defaultValue\":\"'[object Date]'\"},{\"name\":\"OBJECT_PROPERTY_SEPARATOR\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"string\",\"defaultValue\":\"'.'\"}],\"projects/components/src/common/pipes/pipes.module.ts\":[{\"name\":\"declarations\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/common/pipes/pipes.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[NestedPropertyPipe]\"}],\"projects/components/src/datagrid/datagrid.module.ts\":[{\"name\":\"directives\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[DatagridComponent, ComponentRendererOutletDirective]\"},{\"name\":\"pipes\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[FunctionRendererPipe]\"},{\"name\":\"renderers\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"[]\",\"defaultValue\":\"[BoldTextRendererComponent]\"}]},\"groupedFunctions\":{\"projects/components/src/data-exporter/csv-exporter.service.ts\":[{\"name\":\"encodeValue\",\"file\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Returns a cell&#39;s cellValue encoded against spaces, quotes, and CSV injection character</p>\\n\",\"args\":[{\"name\":\"cellValue\"}],\"returnType\":\"string\",\"jsdoctags\":[{\"name\":{\"pos\":1756,\"end\":1765,\"flags\":0,\"escapedText\":\"cellValue\"},\"tagName\":{\"pos\":1750,\"end\":1755,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>Cell cellValue to be encoded</p>\\n\"}]},{\"name\":\"processRow\",\"file\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Returns a string</p>\\n\",\"args\":[{\"name\":\"row\"}],\"returnType\":\"string\",\"jsdoctags\":[{\"name\":{\"pos\":1470,\"end\":1473,\"flags\":0,\"escapedText\":\"row\"},\"tagName\":{\"pos\":1464,\"end\":1469,\"flags\":0,\"escapedText\":\"param\"},\"comment\":\"<p>A list of cells to be turned into a CSV string, separated by commas</p>\\n\"}]}],\"projects/components/src/utils/test/widget-object.ts\":[{\"name\":\"isFindParamsObject\",\"file\":\"projects/components/src/utils/test/widget-object.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"\",\"args\":[{\"name\":\"params\"}],\"returnType\":\"FindParams<T>\",\"jsdoctags\":[{\"name\":\"params\",\"tagName\":{\"text\":\"param\"}}]}],\"projects/components/src/common/pipes/nested-property.pipe.ts\":[{\"name\":\"isNullOrUndefined\",\"file\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Utility method for covering the &#39;null&#39; and &#39;undefined&#39; checks as &#39;value == null&#39; is equivalent to &#39;value === null || value === undefined&#39;</p>\\n\",\"args\":[{\"name\":\"value\"}],\"returnType\":\"boolean\",\"jsdoctags\":[{\"name\":\"value\",\"tagName\":{\"text\":\"param\"}}]}],\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\":[{\"name\":\"RendererSpec\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Utility function to enforce type safety on output of the config function. The output is used as value context\\ninside ComponentRenderer&#39;s template</p>\\n<p>Example usage:\\nconst gridColumn = {\\n   renderer: RendererSpec&lt;SomeRecord, IconRendererConfiguration&gt;(IconComponentRendererCtor, (r: SomeRecord) =&gt; v)\\n}</p>\\n<p>In the above example, this method helps in making sure that the value &quot;v&quot; returned by the config function is of\\nIconRendererConfiguration type</p>\\n\",\"args\":[{\"name\":\"componentRendererSpec\"}],\"returnType\":\"ComponentRendererSpec<R, C>\",\"jsdoctags\":[{\"name\":\"componentRendererSpec\",\"tagName\":{\"text\":\"param\"}}]}],\"projects/components/src/datagrid/renderers/bold-text-renderer.wo.ts\":[{\"name\":\"WithGridBoldRenderer\",\"file\":\"projects/components/src/datagrid/renderers/bold-text-renderer.wo.ts\",\"ctype\":\"miscellaneous\",\"subtype\":\"function\",\"description\":\"<p>Mixin that allows {@link ClrDatagridWidgetObject} to read information from {@link BoldTextRendererComponent}</p>\\n\",\"args\":[{\"name\":\"Base\"}],\"jsdoctags\":[{\"name\":\"Base\",\"tagName\":{\"text\":\"param\"}}]}]},\"groupedEnumerations\":{\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\":[{\"name\":\"GridColumnHideable\",\"childs\":[{\"name\":\"Never\",\"value\":\"NEVER\"},{\"name\":\"Shown\",\"value\":\"SHOWN\"},{\"name\":\"Hidden\",\"value\":\"HIDDEN\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\"},{\"name\":\"GridColumnSortDirection\",\"childs\":[{\"name\":\"Asc\",\"value\":\"ASCENDING\"},{\"name\":\"Desc\",\"value\":\"DESCENDING\"},{\"name\":\"None\",\"value\":\"NONE\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"<p>The sorting direction of the column values</p>\\n\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\"}],\"projects/components/src/datagrid/datagrid.component.ts\":[{\"name\":\"GridSelectionType\",\"childs\":[{\"name\":\"Multi\",\"value\":\"MULTI\"},{\"name\":\"Single\",\"value\":\"SINGLE\"},{\"name\":\"None\",\"value\":\"NONE\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"<p>Different types of row selection on the grid</p>\\n\",\"file\":\"projects/components/src/datagrid/datagrid.component.ts\"}],\"projects/components/src/cliptext/cliptext.component.ts\":[{\"name\":\"Position\",\"childs\":[{\"name\":\"TOP\",\"value\":\"TOP\"},{\"name\":\"BOTTOM\",\"value\":\"BOTTOM\"},{\"name\":\"BEFORE\",\"value\":\"BEFORE\"},{\"name\":\"AFTER\",\"value\":\"AFTER\"}],\"ctype\":\"miscellaneous\",\"subtype\":\"enum\",\"description\":\"\",\"file\":\"projects/components/src/cliptext/cliptext.component.ts\"}]},\"groupedTypeAliases\":{\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\":[{\"name\":\"ComponentRendererConstructor\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"Type<ComponentRenderer<V>>\",\"file\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"description\":\"<p>Used for the type safety of {@link ComponentRendererSpec#type}</p>\\n\",\"kind\":161}],\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\":[{\"name\":\"FunctionRenderer\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"function\",\"file\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\",\"description\":\"<p>Column renderer as a function. Defined in calling component when the cell value is calculated from different\\nproperties.</p>\\n\",\"kind\":162}],\"projects/components/src/cliptext/cliptext.component.ts\":[{\"name\":\"InlineSpec\",\"ctype\":\"miscellaneous\",\"subtype\":\"typealias\",\"rawtype\":\"\\\"undefined\\\" | string\",\"file\":\"projects/components/src/cliptext/cliptext.component.ts\",\"description\":\"\",\"kind\":168}]}},\"routes\":[],\"coverage\":{\"count\":60,\"status\":\"good\",\"files\":[{\"filePath\":\"projects/components/src/cliptext/cliptext.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"CliptextComponent\",\"coveragePercent\":21,\"coverageCount\":\"3/14\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/cliptext/cliptext.wo.ts\",\"type\":\"class\",\"linktype\":\"classe\",\"name\":\"CliptextWidgetObject\",\"coveragePercent\":75,\"coverageCount\":\"9/12\",\"status\":\"good\"},{\"filePath\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"pipe\",\"linktype\":\"pipe\",\"name\":\"NestedPropertyPipe\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"isNullOrUndefined\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"DATE_OBJECT_CLASS\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/common/pipes/nested-property.pipe.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"OBJECT_PROPERTY_SEPARATOR\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/common/pipes/pipes.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"declarations\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"type\":\"injectable\",\"linktype\":\"injectable\",\"name\":\"CsvExporterService\",\"coveragePercent\":66,\"coverageCount\":\"2/3\",\"status\":\"good\"},{\"filePath\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"encodeValue\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/data-exporter/csv-exporter.service.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"processRow\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DataExporterComponent\",\"coveragePercent\":50,\"coverageCount\":\"11/22\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"DataExportRequestEvent\",\"coveragePercent\":100,\"coverageCount\":\"4/4\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/data-exporter/data-exporter.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"ExportColumn\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/data-exporter/data-exporter.wo.ts\",\"type\":\"class\",\"linktype\":\"classe\",\"name\":\"DataExporterWidgetObject\",\"coveragePercent\":64,\"coverageCount\":\"9/14\",\"status\":\"good\"},{\"filePath\":\"projects/components/src/data-exporter/data-exporter.wo.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"Css\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridComponent\",\"coveragePercent\":74,\"coverageCount\":\"29/39\",\"status\":\"good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Button\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"ColumnConfigInternal\",\"coveragePercent\":25,\"coverageCount\":\"1/4\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"GridDataFetchResult\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"GridState\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"HasHref\",\"coveragePercent\":50,\"coverageCount\":\"1/2\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"PagionationInformation\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"SortedColumn\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"directives\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"pipes\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/datagrid/datagrid.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"renderers\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/datagrid/directives/component-renderer-outlet.directive.ts\",\"type\":\"directive\",\"linktype\":\"directive\",\"name\":\"ComponentRendererOutletDirective\",\"coveragePercent\":37,\"coverageCount\":\"3/8\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/datagrid/directives/component-renderer-outlet.directive.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"ComponentRendererType\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"ComponentRenderer\",\"coveragePercent\":100,\"coverageCount\":\"2/2\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"ComponentRendererSpec\",\"coveragePercent\":100,\"coverageCount\":\"3/3\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/interfaces/component-renderer.interface.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"RendererSpec\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/interfaces/datagrid-column.interface.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"GridColumn\",\"coveragePercent\":100,\"coverageCount\":\"7/7\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/pipes/function-renderer.pipe.ts\",\"type\":\"pipe\",\"linktype\":\"pipe\",\"name\":\"FunctionRendererPipe\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/renderers/bold-text-renderer.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"BoldTextRendererComponent\",\"coveragePercent\":50,\"coverageCount\":\"1/2\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/datagrid/renderers/bold-text-renderer.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"BoldTextRendererConfig\",\"coveragePercent\":100,\"coverageCount\":\"2/2\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/datagrid/renderers/bold-text-renderer.wo.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"WithGridBoldRenderer\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"class\",\"linktype\":\"classe\",\"name\":\"ClrDatagridWidgetObject\",\"coveragePercent\":86,\"coverageCount\":\"20/23\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"CELL_TAG\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"COLUMN_CSS_SELECTOR\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"COLUMN_SELECTOR\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/utils/test/datagrid/datagrid.wo.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"ROW_TAG\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"class\",\"linktype\":\"classe\",\"name\":\"WidgetFinder\",\"coveragePercent\":71,\"coverageCount\":\"5/7\",\"status\":\"good\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"class\",\"linktype\":\"classe\",\"name\":\"WidgetObject\",\"coveragePercent\":80,\"coverageCount\":\"8/10\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"FindableWidget\",\"coveragePercent\":50,\"coverageCount\":\"1/2\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"FindParams\",\"coveragePercent\":100,\"coverageCount\":\"4/4\",\"status\":\"very-good\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"HasFinder\",\"coveragePercent\":50,\"coverageCount\":\"1/2\",\"status\":\"medium\"},{\"filePath\":\"projects/components/src/utils/test/widget-object.ts\",\"type\":\"function\",\"linksubtype\":\"function\",\"name\":\"isFindParamsObject\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"}]}}");
            /***/ 
        }),
        /***/ "./gen/examples-doc/documentation.json": 
        /*!*********************************************!*\
          !*** ./gen/examples-doc/documentation.json ***!
          \*********************************************/
        /*! exports provided: pipes, interfaces, injectables, classes, directives, components, modules, miscellaneous, routes, coverage, default */
        /***/ (function (module) {
            module.exports = JSON.parse("{\"pipes\":[],\"interfaces\":[{\"name\":\"Data\",\"id\":\"interface-Data-d745f6d5a4a5bb557f1b96be23f49b9d\",\"file\":\"projects/examples/src/components/datagrid/datagrid-css-classes.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the css classes per row capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-css-classes-example',\\n    styles: [\\n        `\\n            ::ng-deep .yellow-row {\\n                background-color: greenyellow;\\n            }\\n\\n            ::ng-deep .red-row {\\n                background-color: lightcoral;\\n            }\\n        `,\\n    ],\\n    template: `\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [clrDatarowCssClassGetter]=\\\"clrDatarowCssClassGetter\\\"\\n        ></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridCssClassesExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'warn' }, { value: 'error' }, { value: 'ok' }, { value: 'ok' }, { value: 'error' }],\\n            totalItems: 2,\\n        };\\n    }\\n\\n    clrDatarowCssClassGetter(entity: Data, index: number): string {\\n        if (entity.value === 'warn') {\\n            return 'yellow-row';\\n        } else if (entity.value === 'error') {\\n            return 'red-row';\\n        } else {\\n            return '';\\n        }\\n    }\\n}\\n\",\"properties\":[{\"name\":\"value\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[]},{\"name\":\"Data\",\"id\":\"interface-Data-ed5094bfcbc72782aeb9ff7246ee9ae2-1\",\"file\":\"projects/examples/src/components/datagrid/datagrid-detail-row.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component, ContentChild, TemplateRef, ElementRef } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridColumnHideable, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the show/hide columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-show-hide-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\">\\n            <ng-template let-record=\\\"record\\\"> DETAILS: {{ record.value }} </ng-template>\\n        </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridDetailRowExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'a' }, { value: 'b' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"value\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[],\"isDuplicate\":true,\"duplicateId\":1,\"duplicateName\":\"Data-1\"},{\"name\":\"Data\",\"id\":\"interface-Data-bd859050236a078c4c03fec0f1245e90-2\",\"file\":\"projects/examples/src/components/datagrid/datagrid-pagination-example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the pagination capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-pagination-example',\\n    template: `\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [pagination]=\\\"paginationInfo\\\"\\n        >\\n        </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridPaginationExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    paginationInfo = {\\n        pageSize: 2,\\n        pageSizeOptions: [2, 20, 50, 100],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        const data: Data[] = [];\\n        for (let i = 1; i < 155; i++) {\\n            data.push({ value: String(i) });\\n        }\\n        this.gridData = {\\n            items: data.slice(\\n                (eventData.pagination.pageNumber - 1) * eventData.pagination.itemsPerPage,\\n                eventData.pagination.pageNumber * eventData.pagination.itemsPerPage\\n            ),\\n            totalItems: data.length,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"value\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[],\"isDuplicate\":true,\"duplicateId\":2,\"duplicateName\":\"Data-2\"},{\"name\":\"Data\",\"id\":\"interface-Data-bfe0a1dfabaaaf93df0cbbef17446bee-3\",\"file\":\"projects/examples/src/components/datagrid/datagrid-row-select.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridState, GridColumn, GridSelectionType } from '@vcd/ui-components';\\n\\ninterface Data {\\n    href: string;\\n}\\n\\n/**\\n * Logs the selected row to the console when the selection changes.\\n * Allows for multi, single, or no selection.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-row-select-example',\\n    template: `\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Single\\\">Single Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Multi\\\">Multi Select Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.None\\\">No Select Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"this.newData()\\\">New Data</button>\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [selectionType]=\\\"selectionType\\\"\\n            (selectionChanged)=\\\"selectionChanged($event)\\\"\\n        ></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridRowSelectExampleComponent {\\n    selectionType = GridSelectionType.Multi;\\n    GridSelectionType = GridSelectionType;\\n\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'href',\\n        },\\n    ];\\n\\n    selectionChanged(selected: Data[]): void {\\n        console.log(selected);\\n    }\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ href: 'a' }, { href: 'b' }, { href: 'c' }],\\n            totalItems: 2,\\n        };\\n    }\\n\\n    newData(): void {\\n        this.gridData = {\\n            items: [{ href: 'a' }, { href: 'b' }, { href: 'd' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"href\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[],\"isDuplicate\":true,\"duplicateId\":3,\"duplicateName\":\"Data-3\"},{\"name\":\"Data\",\"id\":\"interface-Data-db141c6e324d8959ae67c54d63effc4d-4\",\"file\":\"projects/examples/src/components/datagrid/datagrid-show-hide.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridColumn, GridColumnHideable, GridDataFetchResult, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the show/hide columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-show-hide-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridShowHideExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Shown Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Shown,\\n        },\\n        {\\n            displayName: 'Hidden Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Hidden,\\n        },\\n        {\\n            displayName: 'Always Shown',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Never,\\n        },\\n        {\\n            displayName: 'Always Shown Way #2',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'a' }, { value: 'b' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"value\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[],\"isDuplicate\":true,\"duplicateId\":4,\"duplicateName\":\"Data-4\"},{\"name\":\"Data\",\"id\":\"interface-Data-01cf71f7044a6b84f666b0a2a1f9d0ba-5\",\"file\":\"projects/examples/src/components/datagrid/datagrid-sort.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n    someBool: boolean;\\n}\\n\\n/**\\n * A component that holds an example of the sorting columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-sort-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"> </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridSortExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n            queryFieldName: 'a',\\n        },\\n        {\\n            displayName: 'Boolean',\\n            renderer: 'someBool',\\n            queryFieldName: 'b',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        let data = [\\n            { value: 'a', someBool: true },\\n            { value: 'b', someBool: false },\\n            { value: 'c', someBool: true },\\n            { value: 'a', someBool: false },\\n            { value: 'f', someBool: true },\\n            { value: 'c', someBool: true },\\n        ];\\n        if (eventData.sortColumn) {\\n            if (eventData.sortColumn.name === 'a') {\\n                data = data.sort((a, b) => a.value.localeCompare(b.value));\\n                if (eventData.sortColumn.reverse) {\\n                    data = data.reverse();\\n                }\\n            }\\n            if (eventData.sortColumn.name === 'b') {\\n                data = data.sort((a, b) => (a.someBool === b.someBool ? 0 : a.someBool ? -1 : 1));\\n                if (eventData.sortColumn.reverse) {\\n                    data = data.reverse();\\n                }\\n            }\\n        }\\n        this.gridData = {\\n            items: data,\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"someBool\",\"type\":\"boolean\",\"optional\":false,\"description\":\"\",\"line\":11},{\"name\":\"value\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":10}],\"indexSignatures\":[],\"kind\":150,\"methods\":[],\"isDuplicate\":true,\"duplicateId\":5,\"duplicateName\":\"Data-5\"},{\"name\":\"MockRecord\",\"id\":\"interface-MockRecord-9c5d2c20b6e06a2d9dab41437da8fca6\",\"file\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport {\\n    BoldTextRendererComponent,\\n    GridColumn,\\n    GridDataFetchResult,\\n    GridState,\\n    RendererSpec,\\n} from '@vcd/ui-components';\\n\\ninterface MockRecord {\\n    name: string;\\n    city: string;\\n    state: string;\\n    details: {\\n        gender: string;\\n    };\\n    age: number;\\n}\\n\\nconst mockData: MockRecord[] = [\\n    {\\n        name: 'Person 1',\\n        city: 'Palo Alto',\\n        state: 'CA',\\n        details: {\\n            gender: 'Male',\\n        },\\n        age: 30,\\n    },\\n    {\\n        name: 'Person 2',\\n        city: 'Boston',\\n        state: 'MA',\\n        details: {\\n            gender: 'Female',\\n        },\\n        age: 60,\\n    },\\n];\\n\\n@Component({\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n    `,\\n    selector: 'vcd-datagrd-three-rendererers-example',\\n})\\nexport class DatagridThreeRenderersExampleComponent {\\n    gridData: GridDataFetchResult<MockRecord> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<MockRecord>[] = [\\n        {\\n            displayName: 'Component Renderer',\\n            renderer: RendererSpec({\\n                type: BoldTextRendererComponent,\\n                config: record => ({\\n                    text: record.name,\\n                }),\\n            }),\\n        },\\n        {\\n            displayName: 'Function Renderer',\\n            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,\\n        },\\n\\n        {\\n            displayName: 'Default Renderer',\\n            renderer: 'details.gender',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<MockRecord>): void {\\n        this.gridData = {\\n            items: mockData,\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"properties\":[{\"name\":\"age\",\"type\":\"number\",\"optional\":false,\"description\":\"\",\"line\":22},{\"name\":\"city\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":17},{\"name\":\"details\",\"type\":\"literal type\",\"optional\":false,\"description\":\"\",\"line\":19},{\"name\":\"name\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":16},{\"name\":\"state\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":18}],\"indexSignatures\":[],\"kind\":150,\"methods\":[]},{\"name\":\"SideNavEntries\",\"id\":\"interface-SideNavEntries-3e13834856e331f3b361f4a70791d1d3\",\"file\":\"projects/examples/src/app/app.component.ts\",\"type\":\"interface\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { Documentation, DocumentationEntry } from '@vcd/ui-doc-lib';\\nimport { Router } from '@angular/router';\\n\\ninterface SideNavEntries {\\n    title: string;\\n    path: string;\\n}\\n\\n@Component({\\n    selector: 'vcd-examples-app',\\n    templateUrl: './app.component.html',\\n    styleUrls: ['./app.component.scss'],\\n})\\nexport class AppComponent {\\n    /**\\n     * Gets the registered documentation entries {@link Documentation.getAllEntries} and sets them on a array to display\\n     * on the side navigation\\n     */\\n    sideNavEntries: SideNavEntries[] = Documentation.getAllEntries().map((entry: DocumentationEntry) => ({\\n        title: entry.displayName,\\n        path: entry.urlSegment,\\n    }));\\n\\n    constructor(router: Router) {\\n        /**\\n         * Gets the Angular routes to be navigated in the app components's router outlet\\n         * Loading the routes in {@link AppRoutingModule} is causing the following error: ERROR in Cannot read property\\n         * 'loadChildren' of undefined https://stackoverflow.com/questions/44233195/dynamically-adding-routes-in-angular\\n         * TODO: https://jira.eng.vmware.com/browse/VDUCC-72\\n         */\\n        router.resetConfig(Documentation.getRoutes());\\n    }\\n}\\n\",\"properties\":[{\"name\":\"path\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":12},{\"name\":\"title\",\"type\":\"string\",\"optional\":false,\"description\":\"\",\"line\":11}],\"indexSignatures\":[],\"kind\":150,\"methods\":[]}],\"injectables\":[],\"classes\":[],\"directives\":[],\"components\":[{\"name\":\"AppComponent\",\"id\":\"component-AppComponent-3e13834856e331f3b361f4a70791d1d3\",\"file\":\"projects/examples/src/app/app.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-examples-app\",\"styleUrls\":[\"./app.component.scss\"],\"styles\":[],\"templateUrl\":[\"./app.component.html\"],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"sideNavEntries\",\"defaultValue\":\"Documentation.getAllEntries().map((entry: DocumentationEntry) => ({\\n        title: entry.displayName,\\n        path: entry.urlSegment,\\n    }))\",\"type\":\"SideNavEntries[]\",\"optional\":false,\"description\":\"<p>Gets the registered documentation entries {@link Documentation.getAllEntries} and sets them on a array to display\\non the side navigation</p>\\n\",\"line\":25}],\"methodsClass\":[],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"\",\"rawdescription\":\"\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { Documentation, DocumentationEntry } from '@vcd/ui-doc-lib';\\nimport { Router } from '@angular/router';\\n\\ninterface SideNavEntries {\\n    title: string;\\n    path: string;\\n}\\n\\n@Component({\\n    selector: 'vcd-examples-app',\\n    templateUrl: './app.component.html',\\n    styleUrls: ['./app.component.scss'],\\n})\\nexport class AppComponent {\\n    /**\\n     * Gets the registered documentation entries {@link Documentation.getAllEntries} and sets them on a array to display\\n     * on the side navigation\\n     */\\n    sideNavEntries: SideNavEntries[] = Documentation.getAllEntries().map((entry: DocumentationEntry) => ({\\n        title: entry.displayName,\\n        path: entry.urlSegment,\\n    }));\\n\\n    constructor(router: Router) {\\n        /**\\n         * Gets the Angular routes to be navigated in the app components's router outlet\\n         * Loading the routes in {@link AppRoutingModule} is causing the following error: ERROR in Cannot read property\\n         * 'loadChildren' of undefined https://stackoverflow.com/questions/44233195/dynamically-adding-routes-in-angular\\n         * TODO: https://jira.eng.vmware.com/browse/VDUCC-72\\n         */\\n        router.resetConfig(Documentation.getRoutes());\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":[{\"data\":\"\",\"styleUrl\":\"./app.component.scss\"}],\"stylesData\":\"\",\"constructorObj\":{\"name\":\"constructor\",\"description\":\"\",\"args\":[{\"name\":\"router\",\"type\":\"Router\"}],\"line\":28,\"jsdoctags\":[{\"name\":\"router\",\"type\":\"Router\",\"tagName\":{\"text\":\"param\"}}]},\"templateData\":\"<clr-main-container>\\n    <clr-header class=\\\"header-6\\\">\\n        <div class=\\\"branding\\\">\\n            <a routerLink=\\\"/\\\" class=\\\"nav-nlink\\\">\\n                <clr-icon shape=\\\"vm-bug\\\"></clr-icon>\\n                <span class=\\\"title\\\">{{ 'app.title' | translate }}</span>\\n            </a>\\n        </div>\\n    </clr-header>\\n\\n    <div class=\\\"content-container\\\">\\n        <nav class=\\\"sidenav\\\" [clr-nav-level]=\\\"2\\\">\\n            <section class=\\\"sidenav-content\\\">\\n                <section class=\\\"nav-group\\\">\\n                    <label>Components</label>\\n                    <ul class=\\\"nav-list\\\">\\n                        <ng-container *ngFor=\\\"let entry of sideNavEntries\\\">\\n                            <li>\\n                                <a class=\\\"nav-link\\\" [routerLink]=\\\"entry.path\\\" [routerLinkActive]=\\\"['active']\\\">\\n                                    {{ entry.title }}\\n                                </a>\\n                            </li>\\n                        </ng-container>\\n                    </ul>\\n                </section>\\n            </section>\\n        </nav>\\n\\n        <main class=\\\"content-area\\\">\\n            <router-outlet></router-outlet>\\n        </main>\\n    </div>\\n</clr-main-container>\\n\"},{\"name\":\"CliptextDatagridExampleComponent\",\"id\":\"component-CliptextDatagridExampleComponent-2243495459d93a7e91f4bfeab8c7052c\",\"file\":\"projects/examples/src/components/cliptext/cliptext-datagrid.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-cliptext-datagrid-example\",\"styleUrls\":[],\"styles\":[\"\\n            clr-datagrid .clip-text-width {\\n                width: 200px;\\n            }\\n        \"],\"template\":\"Resize the column and observe the text in the row where the textclip is used. Hover over the cell to see the\\nfull text.\\n\\n<clr-datagrid>\\n    <clr-dg-column class=\\\"clip-text-width\\\">Text</clr-dg-column>\\n    <clr-dg-column>Clipping</clr-dg-column>\\n\\n    <clr-dg-row>\\n        <clr-dg-cell>\\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\\n            dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula non.\\n            Etiam ac pulvinar odio.\\n        </clr-dg-cell>\\n        <clr-dg-cell>\\n            No\\n        </clr-dg-cell>\\n    </clr-dg-row>\\n\\n    <clr-dg-row>\\n        <clr-dg-cell>\\n            <vcd-cliptext>\\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\\n                dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula\\n                non. Etiam ac pulvinar odio.\\n            </vcd-cliptext>\\n        </clr-dg-cell>\\n        <clr-dg-cell>\\n            Yes\\n        </clr-dg-cell>\\n    </clr-dg-row>\\n</clr-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[],\"methodsClass\":[],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"\",\"rawdescription\":\"\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\n\\n@Component({\\n    selector: 'vcd-cliptext-datagrid-example',\\n    styles: [\\n        `\\n            clr-datagrid .clip-text-width {\\n                width: 200px;\\n            }\\n        `,\\n    ],\\n    template: `\\n        Resize the column and observe the text in the row where the textclip is used. Hover over the cell to see the\\n        full text.\\n\\n        <clr-datagrid>\\n            <clr-dg-column class=\\\"clip-text-width\\\">Text</clr-dg-column>\\n            <clr-dg-column>Clipping</clr-dg-column>\\n\\n            <clr-dg-row>\\n                <clr-dg-cell>\\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\\n                    dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula non.\\n                    Etiam ac pulvinar odio.\\n                </clr-dg-cell>\\n                <clr-dg-cell>\\n                    No\\n                </clr-dg-cell>\\n            </clr-dg-row>\\n\\n            <clr-dg-row>\\n                <clr-dg-cell>\\n                    <vcd-cliptext>\\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\\n                        dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula\\n                        non. Etiam ac pulvinar odio.\\n                    </vcd-cliptext>\\n                </clr-dg-cell>\\n                <clr-dg-cell>\\n                    Yes\\n                </clr-dg-cell>\\n            </clr-dg-row>\\n        </clr-datagrid>\\n    `,\\n})\\nexport class CliptextDatagridExampleComponent {}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\\n            clr-datagrid .clip-text-width {\\n                width: 200px;\\n            }\\n        \\n\"},{\"name\":\"CliptextDynamicInlineExampleComponent\",\"id\":\"component-CliptextDynamicInlineExampleComponent-8740f46a6567cb461929f3417f2afd7d\",\"file\":\"projects/examples/src/components/cliptext/cliptext-dynamic-inline.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-cliptext-dynamic-inline-example\",\"styleUrls\":[],\"styles\":[\"\\n            vcd-cliptext {\\n                font-weight: bold;\\n            }\\n        \"],\"template\":\"<label>Dynamic text:</label>\\n<input placeholder=\\\"Write some text\\\" [formControl]=\\\"dynamicText\\\" />\\n<p>\\n    Modify the input above and observe the text:\\n    <vcd-cliptext [inlineWidth]=\\\"'200px'\\\">{{ dynamicText.value }}</vcd-cliptext>\\n    You can try with long and short text. There is no tooltip when the text fits the provided width.\\n</p>\\n<p>The toolptip is updated upon display.</p>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"dynamicText\",\"defaultValue\":\"new FormControl('Dynamic text goes here')\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":31}],\"methodsClass\":[],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"\",\"rawdescription\":\"\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { FormControl } from '@angular/forms';\\n\\n@Component({\\n    selector: 'vcd-cliptext-dynamic-inline-example',\\n    styles: [\\n        `\\n            vcd-cliptext {\\n                font-weight: bold;\\n            }\\n        `,\\n    ],\\n\\n    template: `\\n        <label>Dynamic text:</label>\\n        <input placeholder=\\\"Write some text\\\" [formControl]=\\\"dynamicText\\\" />\\n        <p>\\n            Modify the input above and observe the text:\\n            <vcd-cliptext [inlineWidth]=\\\"'200px'\\\">{{ dynamicText.value }}</vcd-cliptext>\\n            You can try with long and short text. There is no tooltip when the text fits the provided width.\\n        </p>\\n        <p>The toolptip is updated upon display.</p>\\n    `,\\n})\\nexport class CliptextDynamicInlineExampleComponent {\\n    dynamicText = new FormControl('Dynamic text goes here');\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\\n            vcd-cliptext {\\n                font-weight: bold;\\n            }\\n        \\n\"},{\"name\":\"DataExporterExampleComponent\",\"id\":\"component-DataExporterExampleComponent-a50bd36570d214d1c5597a4be9a178b7\",\"file\":\"projects/examples/src/components/data-exporter/data-exporter.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-data-exporter-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<h2>Data Exporter</h2>\\n<button (click)=\\\"dataExporterOpen = true\\\">\\n    Show Modal\\n</button>\\n<vcd-data-exporter\\n    *ngIf=\\\"dataExporterOpen\\\"\\n    [(open)]=\\\"dataExporterOpen\\\"\\n    (dataExportRequest)=\\\"onExportRequest($event)\\\"\\n    [columns]=\\\"exportColumns\\\"\\n>\\n</vcd-data-exporter>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"dataExporterOpen\",\"defaultValue\":\"false\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":31},{\"name\":\"exportColumns\",\"defaultValue\":\"[\\n        { fieldName: 'name', displayName: 'Name' },\\n        { fieldName: 'desc', displayName: 'Description' },\\n    ]\",\"type\":\"ExportColumn[]\",\"optional\":false,\"description\":\"\",\"line\":26}],\"methodsClass\":[{\"name\":\"onExportRequest\",\"args\":[{\"name\":\"request\",\"type\":\"DataExportRequestEvent\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":33,\"jsdoctags\":[{\"name\":\"request\",\"type\":\"DataExportRequestEvent\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"\",\"rawdescription\":\"\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { DataExportRequestEvent, ExportColumn } from '@vcd/ui-components';\\n\\n@Component({\\n    selector: 'vcd-data-exporter-example',\\n    template: `\\n        <h2>Data Exporter</h2>\\n        <button (click)=\\\"dataExporterOpen = true\\\">\\n            Show Modal\\n        </button>\\n        <vcd-data-exporter\\n            *ngIf=\\\"dataExporterOpen\\\"\\n            [(open)]=\\\"dataExporterOpen\\\"\\n            (dataExportRequest)=\\\"onExportRequest($event)\\\"\\n            [columns]=\\\"exportColumns\\\"\\n        >\\n        </vcd-data-exporter>\\n    `,\\n})\\nexport class DataExporterExampleComponent {\\n    exportColumns: ExportColumn[] = [\\n        { fieldName: 'name', displayName: 'Name' },\\n        { fieldName: 'desc', displayName: 'Description' },\\n    ];\\n\\n    dataExporterOpen = false;\\n\\n    onExportRequest(request: DataExportRequestEvent): void {\\n        let currentProgress = 0;\\n\\n        const updateProgress = () => {\\n            currentProgress += 0.01;\\n            if (currentProgress < 1) {\\n                request.updateProgress(currentProgress);\\n                setTimeout(updateProgress, 50);\\n            } else {\\n                request.exportData([\\n                    { name: 'Jack', desc: 'Tis what tis' },\\n                    { name: 'Jill', desc: 'Still tis what tis' },\\n                ]);\\n            }\\n        };\\n        updateProgress();\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridCssClassesExampleComponent\",\"id\":\"component-DatagridCssClassesExampleComponent-d745f6d5a4a5bb557f1b96be23f49b9d\",\"file\":\"projects/examples/src/components/datagrid/datagrid-css-classes.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-css-classes-example\",\"styleUrls\":[],\"styles\":[\"\\n            ::ng-deep .yellow-row {\\n                background-color: greenyellow;\\n            }\\n\\n            ::ng-deep .red-row {\\n                background-color: lightcoral;\\n            }\\n        \"],\"template\":\"<vcd-datagrid\\n    [gridData]=\\\"gridData\\\"\\n    (gridRefresh)=\\\"refresh($event)\\\"\\n    [columns]=\\\"columns\\\"\\n    [clrDatarowCssClassGetter]=\\\"clrDatarowCssClassGetter\\\"\\n></vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'value',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":43},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":39}],\"methodsClass\":[{\"name\":\"clrDatarowCssClassGetter\",\"args\":[{\"name\":\"entity\",\"type\":\"Data\"},{\"name\":\"index\",\"type\":\"number\"}],\"optional\":false,\"returnType\":\"string\",\"typeParameters\":[],\"line\":57,\"jsdoctags\":[{\"name\":\"entity\",\"type\":\"Data\",\"tagName\":{\"text\":\"param\"}},{\"name\":\"index\",\"type\":\"number\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":50,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A component that holds an example of the css classes per row capability.</p>\\n\",\"rawdescription\":\"A component that holds an example of the css classes per row capability.\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the css classes per row capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-css-classes-example',\\n    styles: [\\n        `\\n            ::ng-deep .yellow-row {\\n                background-color: greenyellow;\\n            }\\n\\n            ::ng-deep .red-row {\\n                background-color: lightcoral;\\n            }\\n        `,\\n    ],\\n    template: `\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [clrDatarowCssClassGetter]=\\\"clrDatarowCssClassGetter\\\"\\n        ></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridCssClassesExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'warn' }, { value: 'error' }, { value: 'ok' }, { value: 'ok' }, { value: 'error' }],\\n            totalItems: 2,\\n        };\\n    }\\n\\n    clrDatarowCssClassGetter(entity: Data, index: number): string {\\n        if (entity.value === 'warn') {\\n            return 'yellow-row';\\n        } else if (entity.value === 'error') {\\n            return 'red-row';\\n        } else {\\n            return '';\\n        }\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\\n            ::ng-deep .yellow-row {\\n                background-color: greenyellow;\\n            }\\n\\n            ::ng-deep .red-row {\\n                background-color: lightcoral;\\n            }\\n        \\n\"},{\"name\":\"DatagridDetailRowExampleComponent\",\"id\":\"component-DatagridDetailRowExampleComponent-ed5094bfcbc72782aeb9ff7246ee9ae2\",\"file\":\"projects/examples/src/components/datagrid/datagrid-detail-row.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-show-hide-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\">\\n    <ng-template let-record=\\\"record\\\"> DETAILS: {{ record.value }} </ng-template>\\n</vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":29},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":25}],\"methodsClass\":[{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":36,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A component that holds an example of the show/hide columns capability.</p>\\n\",\"rawdescription\":\"A component that holds an example of the show/hide columns capability.\",\"type\":\"component\",\"sourceCode\":\"import { Component, ContentChild, TemplateRef, ElementRef } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridColumnHideable, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the show/hide columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-show-hide-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\">\\n            <ng-template let-record=\\\"record\\\"> DETAILS: {{ record.value }} </ng-template>\\n        </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridDetailRowExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'a' }, { value: 'b' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridPaginationExampleComponent\",\"id\":\"component-DatagridPaginationExampleComponent-bd859050236a078c4c03fec0f1245e90\",\"file\":\"projects/examples/src/components/datagrid/datagrid-pagination-example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-pagination-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<vcd-datagrid\\n    [gridData]=\\\"gridData\\\"\\n    (gridRefresh)=\\\"refresh($event)\\\"\\n    [columns]=\\\"columns\\\"\\n    [pagination]=\\\"paginationInfo\\\"\\n>\\n</vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":38},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":29},{\"name\":\"paginationInfo\",\"defaultValue\":\"{\\n        pageSize: 2,\\n        pageSizeOptions: [2, 20, 50, 100],\\n    }\",\"type\":\"object\",\"optional\":false,\"description\":\"\",\"line\":33}],\"methodsClass\":[{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":45,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A component that holds an example of the pagination capability.</p>\\n\",\"rawdescription\":\"A component that holds an example of the pagination capability.\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the pagination capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-pagination-example',\\n    template: `\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [pagination]=\\\"paginationInfo\\\"\\n        >\\n        </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridPaginationExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    paginationInfo = {\\n        pageSize: 2,\\n        pageSizeOptions: [2, 20, 50, 100],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        const data: Data[] = [];\\n        for (let i = 1; i < 155; i++) {\\n            data.push({ value: String(i) });\\n        }\\n        this.gridData = {\\n            items: data.slice(\\n                (eventData.pagination.pageNumber - 1) * eventData.pagination.itemsPerPage,\\n                eventData.pagination.pageNumber * eventData.pagination.itemsPerPage\\n            ),\\n            totalItems: data.length,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridRowSelectExampleComponent\",\"id\":\"component-DatagridRowSelectExampleComponent-bfe0a1dfabaaaf93df0cbbef17446bee\",\"file\":\"projects/examples/src/components/datagrid/datagrid-row-select.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-row-select-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Single\\\">Single Select</button>\\n<button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Multi\\\">Multi Select Select</button>\\n<button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.None\\\">No Select Select</button>\\n<button class=\\\"btn btn-primary\\\" (click)=\\\"this.newData()\\\">New Data</button>\\n<vcd-datagrid\\n    [gridData]=\\\"gridData\\\"\\n    (gridRefresh)=\\\"refresh($event)\\\"\\n    [columns]=\\\"columns\\\"\\n    [selectionType]=\\\"selectionType\\\"\\n    (selectionChanged)=\\\"selectionChanged($event)\\\"\\n></vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'href',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":41},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":37},{\"name\":\"GridSelectionType\",\"defaultValue\":\"GridSelectionType\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":35},{\"name\":\"selectionType\",\"defaultValue\":\"GridSelectionType.Multi\",\"type\":\"\",\"optional\":false,\"description\":\"\",\"line\":34}],\"methodsClass\":[{\"name\":\"newData\",\"args\":[],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":59},{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":52,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]},{\"name\":\"selectionChanged\",\"args\":[{\"name\":\"selected\",\"type\":\"Data[]\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":48,\"jsdoctags\":[{\"name\":\"selected\",\"type\":\"Data[]\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>Logs the selected row to the console when the selection changes.\\nAllows for multi, single, or no selection.</p>\\n\",\"rawdescription\":\"Logs the selected row to the console when the selection changes.\\nAllows for multi, single, or no selection.\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridState, GridColumn, GridSelectionType } from '@vcd/ui-components';\\n\\ninterface Data {\\n    href: string;\\n}\\n\\n/**\\n * Logs the selected row to the console when the selection changes.\\n * Allows for multi, single, or no selection.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-row-select-example',\\n    template: `\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Single\\\">Single Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.Multi\\\">Multi Select Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"selectionType = GridSelectionType.None\\\">No Select Select</button>\\n        <button class=\\\"btn btn-primary\\\" (click)=\\\"this.newData()\\\">New Data</button>\\n        <vcd-datagrid\\n            [gridData]=\\\"gridData\\\"\\n            (gridRefresh)=\\\"refresh($event)\\\"\\n            [columns]=\\\"columns\\\"\\n            [selectionType]=\\\"selectionType\\\"\\n            (selectionChanged)=\\\"selectionChanged($event)\\\"\\n        ></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridRowSelectExampleComponent {\\n    selectionType = GridSelectionType.Multi;\\n    GridSelectionType = GridSelectionType;\\n\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Some Column',\\n            renderer: 'href',\\n        },\\n    ];\\n\\n    selectionChanged(selected: Data[]): void {\\n        console.log(selected);\\n    }\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ href: 'a' }, { href: 'b' }, { href: 'c' }],\\n            totalItems: 2,\\n        };\\n    }\\n\\n    newData(): void {\\n        this.gridData = {\\n            items: [{ href: 'a' }, { href: 'b' }, { href: 'd' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridShowHideExampleComponent\",\"id\":\"component-DatagridShowHideExampleComponent-db141c6e324d8959ae67c54d63effc4d\",\"file\":\"projects/examples/src/components/datagrid/datagrid-show-hide.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-show-hide-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Shown Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Shown,\\n        },\\n        {\\n            displayName: 'Hidden Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Hidden,\\n        },\\n        {\\n            displayName: 'Always Shown',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Never,\\n        },\\n        {\\n            displayName: 'Always Shown Way #2',\\n            renderer: 'value',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":27},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":23}],\"methodsClass\":[{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":49,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A component that holds an example of the show/hide columns capability.</p>\\n\",\"rawdescription\":\"A component that holds an example of the show/hide columns capability.\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridColumn, GridColumnHideable, GridDataFetchResult, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n}\\n\\n/**\\n * A component that holds an example of the show/hide columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-show-hide-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n    `,\\n})\\nexport class DatagridShowHideExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Shown Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Shown,\\n        },\\n        {\\n            displayName: 'Hidden Initially',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Hidden,\\n        },\\n        {\\n            displayName: 'Always Shown',\\n            renderer: 'value',\\n            hideable: GridColumnHideable.Never,\\n        },\\n        {\\n            displayName: 'Always Shown Way #2',\\n            renderer: 'value',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        this.gridData = {\\n            items: [{ value: 'a' }, { value: 'b' }],\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridSortExampleComponent\",\"id\":\"component-DatagridSortExampleComponent-01cf71f7044a6b84f666b0a2a1f9d0ba\",\"file\":\"projects/examples/src/components/datagrid/datagrid-sort.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrid-sort-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"> </vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n            queryFieldName: 'a',\\n        },\\n        {\\n            displayName: 'Boolean',\\n            renderer: 'someBool',\\n            queryFieldName: 'b',\\n        },\\n    ]\",\"type\":\"GridColumn<Data>[]\",\"optional\":false,\"description\":\"\",\"line\":28},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<Data>\",\"optional\":false,\"description\":\"\",\"line\":24}],\"methodsClass\":[{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":41,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<Data>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"<p>A component that holds an example of the sorting columns capability.</p>\\n\",\"rawdescription\":\"A component that holds an example of the sorting columns capability.\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';\\n\\ninterface Data {\\n    value: string;\\n    someBool: boolean;\\n}\\n\\n/**\\n * A component that holds an example of the sorting columns capability.\\n */\\n@Component({\\n    selector: 'vcd-datagrid-sort-example',\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"> </vcd-datagrid>\\n    `,\\n})\\nexport class DatagridSortExampleComponent {\\n    gridData: GridDataFetchResult<Data> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<Data>[] = [\\n        {\\n            displayName: 'Column',\\n            renderer: 'value',\\n            queryFieldName: 'a',\\n        },\\n        {\\n            displayName: 'Boolean',\\n            renderer: 'someBool',\\n            queryFieldName: 'b',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<Data>): void {\\n        let data = [\\n            { value: 'a', someBool: true },\\n            { value: 'b', someBool: false },\\n            { value: 'c', someBool: true },\\n            { value: 'a', someBool: false },\\n            { value: 'f', someBool: true },\\n            { value: 'c', someBool: true },\\n        ];\\n        if (eventData.sortColumn) {\\n            if (eventData.sortColumn.name === 'a') {\\n                data = data.sort((a, b) => a.value.localeCompare(b.value));\\n                if (eventData.sortColumn.reverse) {\\n                    data = data.reverse();\\n                }\\n            }\\n            if (eventData.sortColumn.name === 'b') {\\n                data = data.sort((a, b) => (a.someBool === b.someBool ? 0 : a.someBool ? -1 : 1));\\n                if (eventData.sortColumn.reverse) {\\n                    data = data.reverse();\\n                }\\n            }\\n        }\\n        this.gridData = {\\n            items: data,\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"},{\"name\":\"DatagridThreeRenderersExampleComponent\",\"id\":\"component-DatagridThreeRenderersExampleComponent-9c5d2c20b6e06a2d9dab41437da8fca6\",\"file\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"encapsulation\":[],\"entryComponents\":[],\"inputs\":[],\"outputs\":[],\"providers\":[],\"selector\":\"vcd-datagrd-three-rendererers-example\",\"styleUrls\":[],\"styles\":[],\"template\":\"<vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n\",\"templateUrl\":[],\"viewProviders\":[],\"inputsClass\":[],\"outputsClass\":[],\"propertiesClass\":[{\"name\":\"columns\",\"defaultValue\":\"[\\n        {\\n            displayName: 'Component Renderer',\\n            renderer: RendererSpec({\\n                type: BoldTextRendererComponent,\\n                config: record => ({\\n                    text: record.name,\\n                }),\\n            }),\\n        },\\n        {\\n            displayName: 'Function Renderer',\\n            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,\\n        },\\n\\n        {\\n            displayName: 'Default Renderer',\\n            renderer: 'details.gender',\\n        },\\n    ]\",\"type\":\"GridColumn<MockRecord>[]\",\"optional\":false,\"description\":\"\",\"line\":57},{\"name\":\"gridData\",\"defaultValue\":\"{\\n        items: [],\\n    }\",\"type\":\"GridDataFetchResult<MockRecord>\",\"optional\":false,\"description\":\"\",\"line\":53}],\"methodsClass\":[{\"name\":\"refresh\",\"args\":[{\"name\":\"eventData\",\"type\":\"GridState<MockRecord>\"}],\"optional\":false,\"returnType\":\"void\",\"typeParameters\":[],\"line\":78,\"jsdoctags\":[{\"name\":\"eventData\",\"type\":\"GridState<MockRecord>\",\"tagName\":{\"text\":\"param\"}}]}],\"hostBindings\":[],\"hostListeners\":[],\"description\":\"\",\"rawdescription\":\"\",\"type\":\"component\",\"sourceCode\":\"import { Component } from '@angular/core';\\nimport {\\n    BoldTextRendererComponent,\\n    GridColumn,\\n    GridDataFetchResult,\\n    GridState,\\n    RendererSpec,\\n} from '@vcd/ui-components';\\n\\ninterface MockRecord {\\n    name: string;\\n    city: string;\\n    state: string;\\n    details: {\\n        gender: string;\\n    };\\n    age: number;\\n}\\n\\nconst mockData: MockRecord[] = [\\n    {\\n        name: 'Person 1',\\n        city: 'Palo Alto',\\n        state: 'CA',\\n        details: {\\n            gender: 'Male',\\n        },\\n        age: 30,\\n    },\\n    {\\n        name: 'Person 2',\\n        city: 'Boston',\\n        state: 'MA',\\n        details: {\\n            gender: 'Female',\\n        },\\n        age: 60,\\n    },\\n];\\n\\n@Component({\\n    template: `\\n        <vcd-datagrid [gridData]=\\\"gridData\\\" (gridRefresh)=\\\"refresh($event)\\\" [columns]=\\\"columns\\\"></vcd-datagrid>\\n    `,\\n    selector: 'vcd-datagrd-three-rendererers-example',\\n})\\nexport class DatagridThreeRenderersExampleComponent {\\n    gridData: GridDataFetchResult<MockRecord> = {\\n        items: [],\\n    };\\n\\n    columns: GridColumn<MockRecord>[] = [\\n        {\\n            displayName: 'Component Renderer',\\n            renderer: RendererSpec({\\n                type: BoldTextRendererComponent,\\n                config: record => ({\\n                    text: record.name,\\n                }),\\n            }),\\n        },\\n        {\\n            displayName: 'Function Renderer',\\n            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,\\n        },\\n\\n        {\\n            displayName: 'Default Renderer',\\n            renderer: 'details.gender',\\n        },\\n    ];\\n\\n    refresh(eventData: GridState<MockRecord>): void {\\n        this.gridData = {\\n            items: mockData,\\n            totalItems: 2,\\n        };\\n    }\\n}\\n\",\"assetsDirs\":[],\"styleUrlsData\":\"\",\"stylesData\":\"\"}],\"modules\":[{\"name\":\"AppModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"AppComponent\"}]},{\"type\":\"imports\",\"elements\":[{\"name\":\"AppRoutingModule\"},{\"name\":\"CliptextExamplesModule\"},{\"name\":\"DataExporterExamplesModule\"},{\"name\":\"DatagridExamplesModule\"}]},{\"type\":\"exports\",\"elements\":[]},{\"type\":\"bootstrap\",\"elements\":[{\"name\":\"AppComponent\"}]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"AppRoutingModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"CliptextDatagridExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"CliptextDatagridExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"CliptextDatagridExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"CliptextDynamicInlineExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"CliptextDynamicInlineExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"CliptextDynamicInlineExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"CliptextExamplesModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[]},{\"type\":\"imports\",\"elements\":[{\"name\":\"CliptextDatagridExampleModule\"},{\"name\":\"CliptextDynamicInlineExampleModule\"}]},{\"type\":\"exports\",\"elements\":[]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DataExporterExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DataExporterExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DataExporterExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DataExporterExamplesModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[]},{\"type\":\"imports\",\"elements\":[{\"name\":\"DataExporterExampleModule\"}]},{\"type\":\"exports\",\"elements\":[]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridCssClassesExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridCssClassesExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridCssClassesExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridDetailRowExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridDetailRowExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridDetailRowExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridExamplesModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[]},{\"type\":\"imports\",\"elements\":[{\"name\":\"DatagridCssClassesExampleModule\"},{\"name\":\"DatagridDetailRowExampleModule\"},{\"name\":\"DatagridPagionationExampleModule\"},{\"name\":\"DatagridRowSelectExampleModule\"},{\"name\":\"DatagridShowHideExampleModule\"},{\"name\":\"DatagridSortExampleModule\"},{\"name\":\"DatagridThreeRenderersExampleModule\"}]},{\"type\":\"exports\",\"elements\":[]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridPagionationExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridPaginationExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridPaginationExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridRowSelectExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridRowSelectExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridRowSelectExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridShowHideExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridShowHideExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridShowHideExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridSortExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridSortExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridSortExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]},{\"name\":\"DatagridThreeRenderersExampleModule\",\"children\":[{\"type\":\"providers\",\"elements\":[]},{\"type\":\"declarations\",\"elements\":[{\"name\":\"DatagridThreeRenderersExampleComponent\"}]},{\"type\":\"imports\",\"elements\":[]},{\"type\":\"exports\",\"elements\":[{\"name\":\"DatagridThreeRenderersExampleComponent\"}]},{\"type\":\"bootstrap\",\"elements\":[]},{\"type\":\"classes\",\"elements\":[]}]}],\"miscellaneous\":{\"variables\":[{\"name\":\"ASSET_URL\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"\",\"defaultValue\":\"new InjectionToken('ASSETS')\"},{\"name\":\"docJson1\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"CompodocSchema\",\"defaultValue\":\"componentsDocumentationJson\",\"description\":\"<p>The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and\\nthe doc jsons are given as null to the DocLibModule.\\nNOTE: The following two has to be exported otherwise the AoT compiler won&#39;t see it.</p>\\n\"},{\"name\":\"docJson2\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"CompodocSchema\",\"defaultValue\":\"examplesDocumentationJson\"},{\"name\":\"environment\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/environments/environment.prod.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    production: true,\\n}\"},{\"name\":\"environment\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/environments/environment.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    production: false,\\n}\"},{\"name\":\"mockData\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"MockRecord[]\",\"defaultValue\":\"[\\n    {\\n        name: 'Person 1',\\n        city: 'Palo Alto',\\n        state: 'CA',\\n        details: {\\n            gender: 'Male',\\n        },\\n        age: 30,\\n    },\\n    {\\n        name: 'Person 2',\\n        city: 'Boston',\\n        state: 'MA',\\n        details: {\\n            gender: 'Female',\\n        },\\n        age: 60,\\n    },\\n]\"},{\"name\":\"sbInfo\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"StackBlitzInfo\",\"defaultValue\":\"{\\n    templateId: 'vcd-ui-cc-starter-clarity-v8-yhe4yg',\\n    projectName: 'VMware Cloud Director UI Components',\\n    moduleFinder(componentName: string): string {\\n        return componentName.replace('ExampleComponent', 'ExampleModule');\\n    },\\n}\"}],\"functions\":[],\"typealiases\":[],\"enumerations\":[],\"groupedVariables\":{\"projects/examples/src/app/app.module.ts\":[{\"name\":\"ASSET_URL\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"\",\"defaultValue\":\"new InjectionToken('ASSETS')\"},{\"name\":\"docJson1\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"CompodocSchema\",\"defaultValue\":\"componentsDocumentationJson\",\"description\":\"<p>The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and\\nthe doc jsons are given as null to the DocLibModule.\\nNOTE: The following two has to be exported otherwise the AoT compiler won&#39;t see it.</p>\\n\"},{\"name\":\"docJson2\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"CompodocSchema\",\"defaultValue\":\"examplesDocumentationJson\"},{\"name\":\"sbInfo\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/app/app.module.ts\",\"type\":\"StackBlitzInfo\",\"defaultValue\":\"{\\n    templateId: 'vcd-ui-cc-starter-clarity-v8-yhe4yg',\\n    projectName: 'VMware Cloud Director UI Components',\\n    moduleFinder(componentName: string): string {\\n        return componentName.replace('ExampleComponent', 'ExampleModule');\\n    },\\n}\"}],\"projects/examples/src/environments/environment.prod.ts\":[{\"name\":\"environment\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/environments/environment.prod.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    production: true,\\n}\"}],\"projects/examples/src/environments/environment.ts\":[{\"name\":\"environment\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/environments/environment.ts\",\"type\":\"object\",\"defaultValue\":\"{\\n    production: false,\\n}\"}],\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\":[{\"name\":\"mockData\",\"ctype\":\"miscellaneous\",\"subtype\":\"variable\",\"file\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"MockRecord[]\",\"defaultValue\":\"[\\n    {\\n        name: 'Person 1',\\n        city: 'Palo Alto',\\n        state: 'CA',\\n        details: {\\n            gender: 'Male',\\n        },\\n        age: 30,\\n    },\\n    {\\n        name: 'Person 2',\\n        city: 'Boston',\\n        state: 'MA',\\n        details: {\\n            gender: 'Female',\\n        },\\n        age: 60,\\n    },\\n]\"}]},\"groupedFunctions\":{},\"groupedEnumerations\":{},\"groupedTypeAliases\":{}},\"routes\":[],\"coverage\":{\"count\":10,\"status\":\"low\",\"files\":[{\"filePath\":\"projects/examples/src/app/app.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"AppComponent\",\"coveragePercent\":33,\"coverageCount\":\"1/3\",\"status\":\"medium\"},{\"filePath\":\"projects/examples/src/app/app.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"SideNavEntries\",\"coveragePercent\":0,\"coverageCount\":\"0/3\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/app/app.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"ASSET_URL\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/app/app.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"docJson1\",\"coveragePercent\":100,\"coverageCount\":\"1/1\",\"status\":\"very-good\"},{\"filePath\":\"projects/examples/src/app/app.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"docJson2\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/app/app.module.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"sbInfo\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/cliptext/cliptext-datagrid.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"CliptextDatagridExampleComponent\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/cliptext/cliptext-dynamic-inline.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"CliptextDynamicInlineExampleComponent\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/data-exporter/data-exporter.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DataExporterExampleComponent\",\"coveragePercent\":0,\"coverageCount\":\"0/4\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-css-classes.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridCssClassesExampleComponent\",\"coveragePercent\":20,\"coverageCount\":\"1/5\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-css-classes.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-detail-row.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridDetailRowExampleComponent\",\"coveragePercent\":25,\"coverageCount\":\"1/4\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-detail-row.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-pagination-example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridPaginationExampleComponent\",\"coveragePercent\":20,\"coverageCount\":\"1/5\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-pagination-example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-row-select.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridRowSelectExampleComponent\",\"coveragePercent\":12,\"coverageCount\":\"1/8\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-row-select.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-show-hide.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridShowHideExampleComponent\",\"coveragePercent\":25,\"coverageCount\":\"1/4\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-show-hide.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/2\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-sort.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridSortExampleComponent\",\"coveragePercent\":25,\"coverageCount\":\"1/4\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-sort.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"Data\",\"coveragePercent\":0,\"coverageCount\":\"0/3\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"component\",\"linktype\":\"component\",\"name\":\"DatagridThreeRenderersExampleComponent\",\"coveragePercent\":0,\"coverageCount\":\"0/4\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"interface\",\"linktype\":\"interface\",\"name\":\"MockRecord\",\"coveragePercent\":0,\"coverageCount\":\"0/6\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/components/datagrid/datagrid-three-renderers.example.component.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"mockData\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/environments/environment.prod.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"environment\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"},{\"filePath\":\"projects/examples/src/environments/environment.ts\",\"type\":\"variable\",\"linktype\":\"miscellaneous\",\"linksubtype\":\"variable\",\"name\":\"environment\",\"coveragePercent\":0,\"coverageCount\":\"0/1\",\"status\":\"low\"}]}}");
            /***/ 
        }),
        /***/ "./src/app/app-routing.module.ts": 
        /*!***************************************!*\
          !*** ./src/app/app-routing.module.ts ***!
          \***************************************/
        /*! exports provided: AppRoutingModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () { return AppRoutingModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var AppRoutingModule = /** @class */ (function () {
                function AppRoutingModule() {
                }
                return AppRoutingModule;
            }());
            AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
                    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot([])],
                    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
                })
            ], AppRoutingModule);
            /***/ 
        }),
        /***/ "./src/app/app.component.scss": 
        /*!************************************!*\
          !*** ./src/app/app.component.scss ***!
          \************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0cy9leGFtcGxlcy9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");
            /***/ 
        }),
        /***/ "./src/app/app.component.ts": 
        /*!**********************************!*\
          !*** ./src/app/app.component.ts ***!
          \**********************************/
        /*! exports provided: AppComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function () { return AppComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/ui-doc-lib */ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var AppComponent = /** @class */ (function () {
                function AppComponent(router) {
                    /**
                     * Gets the registered documentation entries {@link Documentation.getAllEntries} and sets them on a array to display
                     * on the side navigation
                     */
                    this.sideNavEntries = _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_2__["Documentation"].getAllEntries().map(function (entry) { return ({
                        title: entry.displayName,
                        path: entry.urlSegment,
                    }); });
                    /**
                     * Gets the Angular routes to be navigated in the app components's router outlet
                     * Loading the routes in {@link AppRoutingModule} is causing the following error: ERROR in Cannot read property
                     * 'loadChildren' of undefined https://stackoverflow.com/questions/44233195/dynamically-adding-routes-in-angular
                     * TODO: https://jira.eng.vmware.com/browse/VDUCC-72
                     */
                    router.resetConfig(_vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_2__["Documentation"].getRoutes());
                }
                return AppComponent;
            }());
            AppComponent.ctorParameters = function () { return [
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
            ]; };
            AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-examples-app',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
                })
            ], AppComponent);
            /***/ 
        }),
        /***/ "./src/app/app.module.ts": 
        /*!*******************************!*\
          !*** ./src/app/app.module.ts ***!
          \*******************************/
        /*! exports provided: docJson1, docJson2, sbInfo, AppModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docJson1", function () { return docJson1; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docJson2", function () { return docJson2; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sbInfo", function () { return sbInfo; });
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function () { return AppModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
            /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm2015/http.js");
            /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm2015/animations.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_common_locales_fr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/locales/fr */ "../../node_modules/@angular/common/locales/fr.js");
            /* harmony import */ var _angular_common_locales_fr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __webpack_require__.n(_angular_common_locales_fr__WEBPACK_IMPORTED_MODULE_6__);
            /* harmony import */ var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/locales/es */ "../../node_modules/@angular/common/locales/es.js");
            /* harmony import */ var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __webpack_require__.n(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_7__);
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
            /* harmony import */ var _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @vcd/ui-doc-lib */ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js");
            /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
            /* harmony import */ var _components_cliptext_cliptext_examples_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/cliptext/cliptext.examples.module */ "./src/components/cliptext/cliptext.examples.module.ts");
            /* harmony import */ var _components_data_exporter_data_exporter_examples_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/data-exporter/data-exporter.examples.module */ "./src/components/data-exporter/data-exporter.examples.module.ts");
            /* harmony import */ var _gen_components_doc_documentation_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../gen/components-doc/documentation.json */ "./gen/components-doc/documentation.json");
            var _gen_components_doc_documentation_json__WEBPACK_IMPORTED_MODULE_15___namespace = /*#__PURE__*/ __webpack_require__.t(/*! ../../gen/components-doc/documentation.json */ "./gen/components-doc/documentation.json", 1);
            /* harmony import */ var _gen_examples_doc_documentation_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../gen/examples-doc/documentation.json */ "./gen/examples-doc/documentation.json");
            var _gen_examples_doc_documentation_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/ __webpack_require__.t(/*! ../../gen/examples-doc/documentation.json */ "./gen/examples-doc/documentation.json", 1);
            /* harmony import */ var _components_datagrid_datagrid_examples_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/datagrid/datagrid.examples.module */ "./src/components/datagrid/datagrid.examples.module.ts");
            /* harmony import */ var _vcd_i18n__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @vcd/i18n */ "../../dist/i18n/fesm2015/vcd-i18n.js");
            /* harmony import */ var projects_components_src_datagrid__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! projects/components/src/datagrid */ "../components/src/datagrid/index.ts");
            /* harmony import */ var projects_components_src_public_api__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! projects/components/src/public-api */ "../components/src/public-api.ts");
            /* harmony import */ var projects_components_src_cliptext__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! projects/components/src/cliptext */ "../components/src/cliptext/index.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["registerLocaleData"])(_angular_common_locales_fr__WEBPACK_IMPORTED_MODULE_6___default.a, 'fr');
            Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["registerLocaleData"])(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_7___default.a, 'es');
            var ASSET_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('ASSETS');
            /**
             * The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and
             * the doc jsons are given as null to the DocLibModule.
             * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
             */
            var docJson1 = _gen_components_doc_documentation_json__WEBPACK_IMPORTED_MODULE_15__;
            var docJson2 = _gen_examples_doc_documentation_json__WEBPACK_IMPORTED_MODULE_16__;
            var sbInfo = {
                templateId: 'vcd-ui-cc-starter-clarity-v8-yhe4yg',
                projectName: 'VMware Cloud Director UI Components',
                moduleFinder: function (componentName) {
                    return componentName.replace('ExampleComponent', 'ExampleModule');
                },
            };
            var AppModule = /** @class */ (function () {
                function AppModule(translationService) {
                    translationService.registerTranslations();
                }
                return AppModule;
            }());
            AppModule.ctorParameters = function () { return [
                { type: _vcd_i18n__WEBPACK_IMPORTED_MODULE_18__["TranslationService"] }
            ]; };
            AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]],
                    imports: [
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                        _vcd_i18n__WEBPACK_IMPORTED_MODULE_18__["I18nModule"].forChild(ASSET_URL, true),
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                        _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
                        _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_11__["DocLibModule"],
                        _clr_angular__WEBPACK_IMPORTED_MODULE_9__["ClarityModule"],
                        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                        _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_11__["DocLibModule"].forRoot([docJson1, docJson2], sbInfo),
                        _components_cliptext_cliptext_examples_module__WEBPACK_IMPORTED_MODULE_13__["CliptextExamplesModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                        _components_datagrid_datagrid_examples_module__WEBPACK_IMPORTED_MODULE_17__["DatagridExamplesModule"],
                        _components_data_exporter_data_exporter_examples_module__WEBPACK_IMPORTED_MODULE_14__["DataExporterExamplesModule"],
                        projects_components_src_datagrid__WEBPACK_IMPORTED_MODULE_19__["DatagridModule"],
                        projects_components_src_public_api__WEBPACK_IMPORTED_MODULE_20__["DataExporterModule"],
                        projects_components_src_cliptext__WEBPACK_IMPORTED_MODULE_21__["CliptextModule"],
                    ],
                    providers: [
                        {
                            provide: ASSET_URL,
                            useFactory: function () { return 'assets/translations'; },
                        },
                    ],
                    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]],
                })
            ], AppModule);
            /***/ 
        }),
        /***/ "./src/components/cliptext/cliptext-datagrid.example.component.ts": 
        /*!************************************************************************!*\
          !*** ./src/components/cliptext/cliptext-datagrid.example.component.ts ***!
          \************************************************************************/
        /*! exports provided: CliptextDatagridExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextDatagridExampleComponent", function () { return CliptextDatagridExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CliptextDatagridExampleComponent = /** @class */ (function () {
                function CliptextDatagridExampleComponent() {
                }
                return CliptextDatagridExampleComponent;
            }());
            CliptextDatagridExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-cliptext-datagrid-example',
                    template: "\n        Resize the column and observe the text in the row where the textclip is used. Hover over the cell to see the\n        full text.\n\n        <clr-datagrid>\n            <clr-dg-column class=\"clip-text-width\">Text</clr-dg-column>\n            <clr-dg-column>Clipping</clr-dg-column>\n\n            <clr-dg-row>\n                <clr-dg-cell>\n                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\n                    dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula non.\n                    Etiam ac pulvinar odio.\n                </clr-dg-cell>\n                <clr-dg-cell>\n                    No\n                </clr-dg-cell>\n            </clr-dg-row>\n\n            <clr-dg-row>\n                <clr-dg-cell>\n                    <vcd-cliptext>\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,\n                        dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula\n                        non. Etiam ac pulvinar odio.\n                    </vcd-cliptext>\n                </clr-dg-cell>\n                <clr-dg-cell>\n                    Yes\n                </clr-dg-cell>\n            </clr-dg-row>\n        </clr-datagrid>\n    ",
                    styles: ["\n            clr-datagrid .clip-text-width {\n                width: 200px;\n            }\n        "]
                })
            ], CliptextDatagridExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/cliptext/cliptext-datagrid.example.module.ts": 
        /*!*********************************************************************!*\
          !*** ./src/components/cliptext/cliptext-datagrid.example.module.ts ***!
          \*********************************************************************/
        /*! exports provided: CliptextDatagridExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextDatagridExampleModule", function () { return CliptextDatagridExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cliptext-datagrid.example.component */ "./src/components/cliptext/cliptext-datagrid.example.component.ts");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CliptextDatagridExampleModule = /** @class */ (function () {
                function CliptextDatagridExampleModule() {
                }
                return CliptextDatagridExampleModule;
            }());
            CliptextDatagridExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_3__["CliptextDatagridExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__["CliptextModule"]],
                    exports: [_cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_3__["CliptextDatagridExampleComponent"]],
                    entryComponents: [_cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_3__["CliptextDatagridExampleComponent"]],
                })
            ], CliptextDatagridExampleModule);
            /***/ 
        }),
        /***/ "./src/components/cliptext/cliptext-dynamic-inline.example.component.ts": 
        /*!******************************************************************************!*\
          !*** ./src/components/cliptext/cliptext-dynamic-inline.example.component.ts ***!
          \******************************************************************************/
        /*! exports provided: CliptextDynamicInlineExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextDynamicInlineExampleComponent", function () { return CliptextDynamicInlineExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CliptextDynamicInlineExampleComponent = /** @class */ (function () {
                function CliptextDynamicInlineExampleComponent() {
                    this.dynamicText = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('Dynamic text goes here');
                }
                return CliptextDynamicInlineExampleComponent;
            }());
            CliptextDynamicInlineExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-cliptext-dynamic-inline-example',
                    template: "\n        <label>Dynamic text:</label>\n        <input placeholder=\"Write some text\" [formControl]=\"dynamicText\" />\n        <p>\n            Modify the input above and observe the text:\n            <vcd-cliptext [inlineWidth]=\"'200px'\">{{ dynamicText.value }}</vcd-cliptext>\n            You can try with long and short text. There is no tooltip when the text fits the provided width.\n        </p>\n        <p>The toolptip is updated upon display.</p>\n    ",
                    styles: ["\n            vcd-cliptext {\n                font-weight: bold;\n            }\n        "]
                })
            ], CliptextDynamicInlineExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/cliptext/cliptext-dynamic-inline.example.module.ts": 
        /*!***************************************************************************!*\
          !*** ./src/components/cliptext/cliptext-dynamic-inline.example.module.ts ***!
          \***************************************************************************/
        /*! exports provided: CliptextDynamicInlineExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextDynamicInlineExampleModule", function () { return CliptextDynamicInlineExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliptext-dynamic-inline.example.component */ "./src/components/cliptext/cliptext-dynamic-inline.example.component.ts");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var CliptextDynamicInlineExampleModule = /** @class */ (function () {
                function CliptextDynamicInlineExampleModule() {
                }
                return CliptextDynamicInlineExampleModule;
            }());
            CliptextDynamicInlineExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_6__["CliptextDynamicInlineExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__["CliptextModule"]],
                    exports: [_cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_6__["CliptextDynamicInlineExampleComponent"]],
                    entryComponents: [_cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_6__["CliptextDynamicInlineExampleComponent"]],
                })
            ], CliptextDynamicInlineExampleModule);
            /***/ 
        }),
        /***/ "./src/components/cliptext/cliptext.examples.module.ts": 
        /*!*************************************************************!*\
          !*** ./src/components/cliptext/cliptext.examples.module.ts ***!
          \*************************************************************/
        /*! exports provided: CliptextExamplesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CliptextExamplesModule", function () { return CliptextExamplesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/ui-doc-lib */ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cliptext-datagrid.example.component */ "./src/components/cliptext/cliptext-datagrid.example.component.ts");
            /* harmony import */ var _cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cliptext-dynamic-inline.example.component */ "./src/components/cliptext/cliptext-dynamic-inline.example.component.ts");
            /* harmony import */ var _cliptext_datagrid_example_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cliptext-datagrid.example.module */ "./src/components/cliptext/cliptext-datagrid.example.module.ts");
            /* harmony import */ var _cliptext_dynamic_inline_example_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cliptext-dynamic-inline.example.module */ "./src/components/cliptext/cliptext-dynamic-inline.example.module.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_2__["Documentation"].registerDocumentationEntry({
                component: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_3__["CliptextComponent"],
                displayName: 'Cliptext',
                urlSegment: 'cliptext',
                examples: [
                    {
                        component: _cliptext_datagrid_example_component__WEBPACK_IMPORTED_MODULE_4__["CliptextDatagridExampleComponent"],
                        forComponent: null,
                        title: 'Cliptext in a datagrid',
                    },
                    {
                        component: _cliptext_dynamic_inline_example_component__WEBPACK_IMPORTED_MODULE_5__["CliptextDynamicInlineExampleComponent"],
                        forComponent: null,
                        title: 'Dynamic Inline Text',
                    },
                ],
            });
            var CliptextExamplesModule = /** @class */ (function () {
                function CliptextExamplesModule() {
                }
                return CliptextExamplesModule;
            }());
            CliptextExamplesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_cliptext_datagrid_example_module__WEBPACK_IMPORTED_MODULE_6__["CliptextDatagridExampleModule"], _cliptext_dynamic_inline_example_module__WEBPACK_IMPORTED_MODULE_7__["CliptextDynamicInlineExampleModule"]],
                })
            ], CliptextExamplesModule);
            /***/ 
        }),
        /***/ "./src/components/data-exporter/data-exporter.example.component.ts": 
        /*!*************************************************************************!*\
          !*** ./src/components/data-exporter/data-exporter.example.component.ts ***!
          \*************************************************************************/
        /*! exports provided: DataExporterExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterExampleComponent", function () { return DataExporterExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DataExporterExampleComponent = /** @class */ (function () {
                function DataExporterExampleComponent() {
                    this.exportColumns = [
                        { fieldName: 'name', displayName: 'Name' },
                        { fieldName: 'desc', displayName: 'Description' },
                    ];
                    this.dataExporterOpen = false;
                }
                DataExporterExampleComponent.prototype.onExportRequest = function (request) {
                    var currentProgress = 0;
                    var updateProgress = function () {
                        currentProgress += 0.01;
                        if (currentProgress < 1) {
                            request.updateProgress(currentProgress);
                            setTimeout(updateProgress, 50);
                        }
                        else {
                            request.exportData([
                                { name: 'Jack', desc: 'Tis what tis' },
                                { name: 'Jill', desc: 'Still tis what tis' },
                            ]);
                        }
                    };
                    updateProgress();
                };
                return DataExporterExampleComponent;
            }());
            DataExporterExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-data-exporter-example',
                    template: "\n        <h2>Data Exporter</h2>\n        <button (click)=\"dataExporterOpen = true\">\n            Show Modal\n        </button>\n        <vcd-data-exporter\n            *ngIf=\"dataExporterOpen\"\n            [(open)]=\"dataExporterOpen\"\n            (dataExportRequest)=\"onExportRequest($event)\"\n            [columns]=\"exportColumns\"\n        >\n        </vcd-data-exporter>\n    ",
                })
            ], DataExporterExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/data-exporter/data-exporter.example.module.ts": 
        /*!**********************************************************************!*\
          !*** ./src/components/data-exporter/data-exporter.example.module.ts ***!
          \**********************************************************************/
        /*! exports provided: DataExporterExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterExampleModule", function () { return DataExporterExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-exporter.example.component */ "./src/components/data-exporter/data-exporter.example.component.ts");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DataExporterExampleModule = /** @class */ (function () {
                function DataExporterExampleModule() {
                }
                return DataExporterExampleModule;
            }());
            DataExporterExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__["DataExporterExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__["DataExporterModule"]],
                    exports: [_data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__["DataExporterExampleComponent"]],
                    entryComponents: [_data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__["DataExporterExampleComponent"]],
                })
            ], DataExporterExampleModule);
            /***/ 
        }),
        /***/ "./src/components/data-exporter/data-exporter.examples.module.ts": 
        /*!***********************************************************************!*\
          !*** ./src/components/data-exporter/data-exporter.examples.module.ts ***!
          \***********************************************************************/
        /*! exports provided: DataExporterExamplesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataExporterExamplesModule", function () { return DataExporterExamplesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-exporter.example.component */ "./src/components/data-exporter/data-exporter.example.component.ts");
            /* harmony import */ var _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vcd/ui-doc-lib */ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _data_exporter_example_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-exporter.example.module */ "./src/components/data-exporter/data-exporter.example.module.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_3__["Documentation"].registerDocumentationEntry({
                component: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__["DataExporterComponent"],
                displayName: 'Data Exporter',
                urlSegment: 'dataExporter',
                examples: [
                    {
                        component: _data_exporter_example_component__WEBPACK_IMPORTED_MODULE_2__["DataExporterExampleComponent"],
                        forComponent: null,
                        title: 'Data Exporter example',
                    },
                ],
            });
            var DataExporterExamplesModule = /** @class */ (function () {
                function DataExporterExamplesModule() {
                }
                return DataExporterExamplesModule;
            }());
            DataExporterExamplesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [_data_exporter_example_module__WEBPACK_IMPORTED_MODULE_5__["DataExporterExampleModule"]],
                })
            ], DataExporterExamplesModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-css-classes.example.component.ts": 
        /*!***************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-css-classes.example.component.ts ***!
          \***************************************************************************/
        /*! exports provided: DatagridCssClassesExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridCssClassesExampleComponent", function () { return DatagridCssClassesExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A component that holds an example of the css classes per row capability.
             */
            var DatagridCssClassesExampleComponent = /** @class */ (function () {
                /**
                 * A component that holds an example of the css classes per row capability.
                 */
                function DatagridCssClassesExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Some Column',
                            renderer: 'value',
                        },
                    ];
                }
                DatagridCssClassesExampleComponent.prototype.refresh = function (eventData) {
                    this.gridData = {
                        items: [{ value: 'warn' }, { value: 'error' }, { value: 'ok' }, { value: 'ok' }, { value: 'error' }],
                        totalItems: 2,
                    };
                };
                DatagridCssClassesExampleComponent.prototype.clrDatarowCssClassGetter = function (entity, index) {
                    if (entity.value === 'warn') {
                        return 'yellow-row';
                    }
                    else if (entity.value === 'error') {
                        return 'red-row';
                    }
                    else {
                        return '';
                    }
                };
                return DatagridCssClassesExampleComponent;
            }());
            DatagridCssClassesExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-css-classes-example',
                    template: "\n        <vcd-datagrid\n            [gridData]=\"gridData\"\n            (gridRefresh)=\"refresh($event)\"\n            [columns]=\"columns\"\n            [clrDatarowCssClassGetter]=\"clrDatarowCssClassGetter\"\n        ></vcd-datagrid>\n    ",
                    styles: ["\n            ::ng-deep .yellow-row {\n                background-color: greenyellow;\n            }\n\n            ::ng-deep .red-row {\n                background-color: lightcoral;\n            }\n        "]
                })
            ], DatagridCssClassesExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-css-classes.example.module.ts": 
        /*!************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-css-classes.example.module.ts ***!
          \************************************************************************/
        /*! exports provided: DatagridCssClassesExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridCssClassesExampleModule", function () { return DatagridCssClassesExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datagrid-css-classes.example.component */ "./src/components/datagrid/datagrid-css-classes.example.component.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridCssClassesExampleModule = /** @class */ (function () {
                function DatagridCssClassesExampleModule() {
                }
                return DatagridCssClassesExampleModule;
            }());
            DatagridCssClassesExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridCssClassesExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__["DatagridModule"]],
                    exports: [_datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridCssClassesExampleComponent"]],
                    entryComponents: [_datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridCssClassesExampleComponent"]],
                })
            ], DatagridCssClassesExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-detail-row.example.component.ts": 
        /*!**************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-detail-row.example.component.ts ***!
          \**************************************************************************/
        /*! exports provided: DatagridDetailRowExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridDetailRowExampleComponent", function () { return DatagridDetailRowExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A component that holds an example of the show/hide columns capability.
             */
            var DatagridDetailRowExampleComponent = /** @class */ (function () {
                /**
                 * A component that holds an example of the show/hide columns capability.
                 */
                function DatagridDetailRowExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Column',
                            renderer: 'value',
                        },
                    ];
                }
                DatagridDetailRowExampleComponent.prototype.refresh = function (eventData) {
                    this.gridData = {
                        items: [{ value: 'a' }, { value: 'b' }],
                        totalItems: 2,
                    };
                };
                return DatagridDetailRowExampleComponent;
            }());
            DatagridDetailRowExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-show-hide-example',
                    template: "\n        <vcd-datagrid [gridData]=\"gridData\" (gridRefresh)=\"refresh($event)\" [columns]=\"columns\">\n            <ng-template let-record=\"record\"> DETAILS: {{ record.value }} </ng-template>\n        </vcd-datagrid>\n    ",
                })
            ], DatagridDetailRowExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-detail-row.example.module.ts": 
        /*!***********************************************************************!*\
          !*** ./src/components/datagrid/datagrid-detail-row.example.module.ts ***!
          \***********************************************************************/
        /*! exports provided: DatagridDetailRowExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridDetailRowExampleModule", function () { return DatagridDetailRowExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datagrid-detail-row.example.component */ "./src/components/datagrid/datagrid-detail-row.example.component.ts");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridDetailRowExampleModule = /** @class */ (function () {
                function DatagridDetailRowExampleModule() {
                }
                return DatagridDetailRowExampleModule;
            }());
            DatagridDetailRowExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridDetailRowExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__["DatagridModule"]],
                    exports: [_datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridDetailRowExampleComponent"]],
                    entryComponents: [_datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridDetailRowExampleComponent"]],
                })
            ], DatagridDetailRowExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-pagination-example.component.ts": 
        /*!**************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-pagination-example.component.ts ***!
          \**************************************************************************/
        /*! exports provided: DatagridPaginationExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridPaginationExampleComponent", function () { return DatagridPaginationExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A component that holds an example of the pagination capability.
             */
            var DatagridPaginationExampleComponent = /** @class */ (function () {
                /**
                 * A component that holds an example of the pagination capability.
                 */
                function DatagridPaginationExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.paginationInfo = {
                        pageSize: 2,
                        pageSizeOptions: [2, 20, 50, 100],
                    };
                    this.columns = [
                        {
                            displayName: 'Column',
                            renderer: 'value',
                        },
                    ];
                }
                DatagridPaginationExampleComponent.prototype.refresh = function (eventData) {
                    var data = [];
                    for (var i = 1; i < 155; i++) {
                        data.push({ value: String(i) });
                    }
                    this.gridData = {
                        items: data.slice((eventData.pagination.pageNumber - 1) * eventData.pagination.itemsPerPage, eventData.pagination.pageNumber * eventData.pagination.itemsPerPage),
                        totalItems: data.length,
                    };
                };
                return DatagridPaginationExampleComponent;
            }());
            DatagridPaginationExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-pagination-example',
                    template: "\n        <vcd-datagrid\n            [gridData]=\"gridData\"\n            (gridRefresh)=\"refresh($event)\"\n            [columns]=\"columns\"\n            [pagination]=\"paginationInfo\"\n        >\n        </vcd-datagrid>\n    ",
                })
            ], DatagridPaginationExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-pagination-example.module.ts": 
        /*!***********************************************************************!*\
          !*** ./src/components/datagrid/datagrid-pagination-example.module.ts ***!
          \***********************************************************************/
        /*! exports provided: DatagridPagionationExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridPagionationExampleModule", function () { return DatagridPagionationExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datagrid-pagination-example.component */ "./src/components/datagrid/datagrid-pagination-example.component.ts");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridPagionationExampleModule = /** @class */ (function () {
                function DatagridPagionationExampleModule() {
                }
                return DatagridPagionationExampleModule;
            }());
            DatagridPagionationExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridPaginationExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__["DatagridModule"]],
                    exports: [_datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridPaginationExampleComponent"]],
                    entryComponents: [_datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridPaginationExampleComponent"]],
                })
            ], DatagridPagionationExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-row-select.example.component.ts": 
        /*!**************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-row-select.example.component.ts ***!
          \**************************************************************************/
        /*! exports provided: DatagridRowSelectExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridRowSelectExampleComponent", function () { return DatagridRowSelectExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * Logs the selected row to the console when the selection changes.
             * Allows for multi, single, or no selection.
             */
            var DatagridRowSelectExampleComponent = /** @class */ (function () {
                /**
                 * Logs the selected row to the console when the selection changes.
                 * Allows for multi, single, or no selection.
                 */
                function DatagridRowSelectExampleComponent() {
                    this.selectionType = _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["GridSelectionType"].Multi;
                    this.GridSelectionType = _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["GridSelectionType"];
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Some Column',
                            renderer: 'href',
                        },
                    ];
                }
                DatagridRowSelectExampleComponent.prototype.selectionChanged = function (selected) {
                    console.log(selected);
                };
                DatagridRowSelectExampleComponent.prototype.refresh = function (eventData) {
                    this.gridData = {
                        items: [{ href: 'a' }, { href: 'b' }, { href: 'c' }],
                        totalItems: 2,
                    };
                };
                DatagridRowSelectExampleComponent.prototype.newData = function () {
                    this.gridData = {
                        items: [{ href: 'a' }, { href: 'b' }, { href: 'd' }],
                        totalItems: 2,
                    };
                };
                return DatagridRowSelectExampleComponent;
            }());
            DatagridRowSelectExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-row-select-example',
                    template: "\n        <button class=\"btn btn-primary\" (click)=\"selectionType = GridSelectionType.Single\">Single Select</button>\n        <button class=\"btn btn-primary\" (click)=\"selectionType = GridSelectionType.Multi\">Multi Select Select</button>\n        <button class=\"btn btn-primary\" (click)=\"selectionType = GridSelectionType.None\">No Select Select</button>\n        <button class=\"btn btn-primary\" (click)=\"this.newData()\">New Data</button>\n        <vcd-datagrid\n            [gridData]=\"gridData\"\n            (gridRefresh)=\"refresh($event)\"\n            [columns]=\"columns\"\n            [selectionType]=\"selectionType\"\n            (selectionChanged)=\"selectionChanged($event)\"\n        ></vcd-datagrid>\n    ",
                })
            ], DatagridRowSelectExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-row-select.example.module.ts": 
        /*!***********************************************************************!*\
          !*** ./src/components/datagrid/datagrid-row-select.example.module.ts ***!
          \***********************************************************************/
        /*! exports provided: DatagridRowSelectExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridRowSelectExampleModule", function () { return DatagridRowSelectExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datagrid-row-select.example.component */ "./src/components/datagrid/datagrid-row-select.example.component.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridRowSelectExampleModule = /** @class */ (function () {
                function DatagridRowSelectExampleModule() {
                }
                return DatagridRowSelectExampleModule;
            }());
            DatagridRowSelectExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridRowSelectExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__["DatagridModule"]],
                    exports: [_datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridRowSelectExampleComponent"]],
                    entryComponents: [_datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridRowSelectExampleComponent"]],
                })
            ], DatagridRowSelectExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-show-hide.example.component.ts": 
        /*!*************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-show-hide.example.component.ts ***!
          \*************************************************************************/
        /*! exports provided: DatagridShowHideExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridShowHideExampleComponent", function () { return DatagridShowHideExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A component that holds an example of the show/hide columns capability.
             */
            var DatagridShowHideExampleComponent = /** @class */ (function () {
                /**
                 * A component that holds an example of the show/hide columns capability.
                 */
                function DatagridShowHideExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Shown Initially',
                            renderer: 'value',
                            hideable: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"].Shown,
                        },
                        {
                            displayName: 'Hidden Initially',
                            renderer: 'value',
                            hideable: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"].Hidden,
                        },
                        {
                            displayName: 'Always Shown',
                            renderer: 'value',
                            hideable: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["GridColumnHideable"].Never,
                        },
                        {
                            displayName: 'Always Shown Way #2',
                            renderer: 'value',
                        },
                    ];
                }
                DatagridShowHideExampleComponent.prototype.refresh = function (eventData) {
                    this.gridData = {
                        items: [{ value: 'a' }, { value: 'b' }],
                        totalItems: 2,
                    };
                };
                return DatagridShowHideExampleComponent;
            }());
            DatagridShowHideExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-show-hide-example',
                    template: "\n        <vcd-datagrid [gridData]=\"gridData\" (gridRefresh)=\"refresh($event)\" [columns]=\"columns\"></vcd-datagrid>\n    ",
                })
            ], DatagridShowHideExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-show-hide.example.module.ts": 
        /*!**********************************************************************!*\
          !*** ./src/components/datagrid/datagrid-show-hide.example.module.ts ***!
          \**********************************************************************/
        /*! exports provided: DatagridShowHideExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridShowHideExampleModule", function () { return DatagridShowHideExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datagrid-show-hide.example.component */ "./src/components/datagrid/datagrid-show-hide.example.component.ts");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridShowHideExampleModule = /** @class */ (function () {
                function DatagridShowHideExampleModule() {
                }
                return DatagridShowHideExampleModule;
            }());
            DatagridShowHideExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridShowHideExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_6__["DatagridModule"]],
                    exports: [_datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridShowHideExampleComponent"]],
                    entryComponents: [_datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridShowHideExampleComponent"]],
                })
            ], DatagridShowHideExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-sort.example.component.ts": 
        /*!********************************************************************!*\
          !*** ./src/components/datagrid/datagrid-sort.example.component.ts ***!
          \********************************************************************/
        /*! exports provided: DatagridSortExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridSortExampleComponent", function () { return DatagridSortExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            /**
             * A component that holds an example of the sorting columns capability.
             */
            var DatagridSortExampleComponent = /** @class */ (function () {
                /**
                 * A component that holds an example of the sorting columns capability.
                 */
                function DatagridSortExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Column',
                            renderer: 'value',
                            queryFieldName: 'a',
                        },
                        {
                            displayName: 'Boolean',
                            renderer: 'someBool',
                            queryFieldName: 'b',
                        },
                    ];
                }
                DatagridSortExampleComponent.prototype.refresh = function (eventData) {
                    var data = [
                        { value: 'a', someBool: true },
                        { value: 'b', someBool: false },
                        { value: 'c', someBool: true },
                        { value: 'a', someBool: false },
                        { value: 'f', someBool: true },
                        { value: 'c', someBool: true },
                    ];
                    if (eventData.sortColumn) {
                        if (eventData.sortColumn.name === 'a') {
                            data = data.sort(function (a, b) { return a.value.localeCompare(b.value); });
                            if (eventData.sortColumn.reverse) {
                                data = data.reverse();
                            }
                        }
                        if (eventData.sortColumn.name === 'b') {
                            data = data.sort(function (a, b) { return (a.someBool === b.someBool ? 0 : a.someBool ? -1 : 1); });
                            if (eventData.sortColumn.reverse) {
                                data = data.reverse();
                            }
                        }
                    }
                    this.gridData = {
                        items: data,
                        totalItems: 2,
                    };
                };
                return DatagridSortExampleComponent;
            }());
            DatagridSortExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'vcd-datagrid-sort-example',
                    template: "\n        <vcd-datagrid [gridData]=\"gridData\" (gridRefresh)=\"refresh($event)\" [columns]=\"columns\"> </vcd-datagrid>\n    ",
                })
            ], DatagridSortExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-sort.example.module.ts": 
        /*!*****************************************************************!*\
          !*** ./src/components/datagrid/datagrid-sort.example.module.ts ***!
          \*****************************************************************/
        /*! exports provided: DatagridSortExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridSortExampleModule", function () { return DatagridSortExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datagrid-sort.example.component */ "./src/components/datagrid/datagrid-sort.example.component.ts");
            /*!
             * Copyright 2020 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridSortExampleModule = /** @class */ (function () {
                function DatagridSortExampleModule() {
                }
                return DatagridSortExampleModule;
            }());
            DatagridSortExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridSortExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_5__["DatagridModule"]],
                    exports: [_datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridSortExampleComponent"]],
                    entryComponents: [_datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridSortExampleComponent"]],
                })
            ], DatagridSortExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-three-renderers.example.component.ts": 
        /*!*******************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-three-renderers.example.component.ts ***!
          \*******************************************************************************/
        /*! exports provided: DatagridThreeRenderersExampleComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridThreeRenderersExampleComponent", function () { return DatagridThreeRenderersExampleComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var mockData = [
                {
                    name: 'Person 1',
                    city: 'Palo Alto',
                    state: 'CA',
                    details: {
                        gender: 'Male',
                    },
                    age: 30,
                },
                {
                    name: 'Person 2',
                    city: 'Boston',
                    state: 'MA',
                    details: {
                        gender: 'Female',
                    },
                    age: 60,
                },
            ];
            var DatagridThreeRenderersExampleComponent = /** @class */ (function () {
                function DatagridThreeRenderersExampleComponent() {
                    this.gridData = {
                        items: [],
                    };
                    this.columns = [
                        {
                            displayName: 'Component Renderer',
                            renderer: Object(_vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["RendererSpec"])({
                                type: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_2__["BoldTextRendererComponent"],
                                config: function (record) { return ({
                                    text: record.name,
                                }); },
                            }),
                        },
                        {
                            displayName: 'Function Renderer',
                            renderer: function (record) { return record.city + ", " + record.state; },
                        },
                        {
                            displayName: 'Default Renderer',
                            renderer: 'details.gender',
                        },
                    ];
                }
                DatagridThreeRenderersExampleComponent.prototype.refresh = function (eventData) {
                    this.gridData = {
                        items: mockData,
                        totalItems: 2,
                    };
                };
                return DatagridThreeRenderersExampleComponent;
            }());
            DatagridThreeRenderersExampleComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    template: "\n        <vcd-datagrid [gridData]=\"gridData\" (gridRefresh)=\"refresh($event)\" [columns]=\"columns\"></vcd-datagrid>\n    ",
                    selector: 'vcd-datagrd-three-rendererers-example',
                })
            ], DatagridThreeRenderersExampleComponent);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid-three-renderers.example.module.ts": 
        /*!****************************************************************************!*\
          !*** ./src/components/datagrid/datagrid-three-renderers.example.module.ts ***!
          \****************************************************************************/
        /*! exports provided: DatagridThreeRenderersExampleModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridThreeRenderersExampleModule", function () { return DatagridThreeRenderersExampleModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "../../node_modules/@clr/angular/fesm2015/clr-angular.js");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datagrid-three-renderers.example.component */ "./src/components/datagrid/datagrid-three-renderers.example.component.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            var DatagridThreeRenderersExampleModule = /** @class */ (function () {
                function DatagridThreeRenderersExampleModule() {
                }
                return DatagridThreeRenderersExampleModule;
            }());
            DatagridThreeRenderersExampleModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridThreeRenderersExampleComponent"]],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClarityModule"], _vcd_ui_components__WEBPACK_IMPORTED_MODULE_4__["DatagridModule"]],
                    exports: [_datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridThreeRenderersExampleComponent"]],
                    entryComponents: [_datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridThreeRenderersExampleComponent"]],
                })
            ], DatagridThreeRenderersExampleModule);
            /***/ 
        }),
        /***/ "./src/components/datagrid/datagrid.examples.module.ts": 
        /*!*************************************************************!*\
          !*** ./src/components/datagrid/datagrid.examples.module.ts ***!
          \*************************************************************/
        /*! exports provided: DatagridExamplesModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatagridExamplesModule", function () { return DatagridExamplesModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datagrid-show-hide.example.component */ "./src/components/datagrid/datagrid-show-hide.example.component.ts");
            /* harmony import */ var _vcd_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vcd/ui-components */ "../../dist/components/fesm2015/vcd-ui-components.js");
            /* harmony import */ var _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vcd/ui-doc-lib */ "../../dist/doc-lib/fesm2015/vcd-ui-doc-lib.js");
            /* harmony import */ var _datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datagrid-css-classes.example.component */ "./src/components/datagrid/datagrid-css-classes.example.component.ts");
            /* harmony import */ var _datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datagrid-three-renderers.example.component */ "./src/components/datagrid/datagrid-three-renderers.example.component.ts");
            /* harmony import */ var _datagrid_three_renderers_example_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./datagrid-three-renderers.example.module */ "./src/components/datagrid/datagrid-three-renderers.example.module.ts");
            /* harmony import */ var _datagrid_css_classes_example_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./datagrid-css-classes.example.module */ "./src/components/datagrid/datagrid-css-classes.example.module.ts");
            /* harmony import */ var _datagrid_show_hide_example_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./datagrid-show-hide.example.module */ "./src/components/datagrid/datagrid-show-hide.example.module.ts");
            /* harmony import */ var _datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./datagrid-detail-row.example.component */ "./src/components/datagrid/datagrid-detail-row.example.component.ts");
            /* harmony import */ var _datagrid_detail_row_example_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./datagrid-detail-row.example.module */ "./src/components/datagrid/datagrid-detail-row.example.module.ts");
            /* harmony import */ var _datagrid_sort_example_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./datagrid-sort.example.module */ "./src/components/datagrid/datagrid-sort.example.module.ts");
            /* harmony import */ var _datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./datagrid-sort.example.component */ "./src/components/datagrid/datagrid-sort.example.component.ts");
            /* harmony import */ var _datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./datagrid-row-select.example.component */ "./src/components/datagrid/datagrid-row-select.example.component.ts");
            /* harmony import */ var _datagrid_row_select_example_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./datagrid-row-select.example.module */ "./src/components/datagrid/datagrid-row-select.example.module.ts");
            /* harmony import */ var _datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./datagrid-pagination-example.component */ "./src/components/datagrid/datagrid-pagination-example.component.ts");
            /* harmony import */ var _datagrid_pagination_example_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./datagrid-pagination-example.module */ "./src/components/datagrid/datagrid-pagination-example.module.ts");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            _vcd_ui_doc_lib__WEBPACK_IMPORTED_MODULE_4__["Documentation"].registerDocumentationEntry({
                component: _vcd_ui_components__WEBPACK_IMPORTED_MODULE_3__["DatagridComponent"],
                displayName: 'Datagrid',
                urlSegment: 'datagrid',
                examples: [
                    {
                        component: _datagrid_three_renderers_example_component__WEBPACK_IMPORTED_MODULE_6__["DatagridThreeRenderersExampleComponent"],
                        forComponent: null,
                        title: 'Example with 3 types of grid renderers',
                    },
                    {
                        component: _datagrid_css_classes_example_component__WEBPACK_IMPORTED_MODULE_5__["DatagridCssClassesExampleComponent"],
                        forComponent: null,
                        title: 'Component that holds an example of the css classes per row capability',
                    },
                    {
                        component: _datagrid_show_hide_example_component__WEBPACK_IMPORTED_MODULE_2__["DatagridShowHideExampleComponent"],
                        forComponent: null,
                        title: 'Show/Hide datagrid columns example',
                    },
                    {
                        component: _datagrid_detail_row_example_component__WEBPACK_IMPORTED_MODULE_10__["DatagridDetailRowExampleComponent"],
                        forComponent: null,
                        title: 'Detail row datagrid example',
                    },
                    {
                        component: _datagrid_sort_example_component__WEBPACK_IMPORTED_MODULE_13__["DatagridSortExampleComponent"],
                        forComponent: null,
                        title: 'Shows the sorting capability of the datagrid',
                    },
                    {
                        component: _datagrid_row_select_example_component__WEBPACK_IMPORTED_MODULE_14__["DatagridRowSelectExampleComponent"],
                        forComponent: null,
                        title: 'Select datagrid row example',
                    },
                    {
                        component: _datagrid_pagination_example_component__WEBPACK_IMPORTED_MODULE_16__["DatagridPaginationExampleComponent"],
                        forComponent: null,
                        title: 'Pagination functionality and text customization example',
                    },
                ],
            });
            /**
             * A module that imports all data grid example modules
             */
            var DatagridExamplesModule = /** @class */ (function () {
                function DatagridExamplesModule() {
                }
                return DatagridExamplesModule;
            }());
            DatagridExamplesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    imports: [
                        _datagrid_three_renderers_example_module__WEBPACK_IMPORTED_MODULE_7__["DatagridThreeRenderersExampleModule"],
                        _datagrid_css_classes_example_module__WEBPACK_IMPORTED_MODULE_8__["DatagridCssClassesExampleModule"],
                        _datagrid_show_hide_example_module__WEBPACK_IMPORTED_MODULE_9__["DatagridShowHideExampleModule"],
                        _datagrid_detail_row_example_module__WEBPACK_IMPORTED_MODULE_11__["DatagridDetailRowExampleModule"],
                        _datagrid_sort_example_module__WEBPACK_IMPORTED_MODULE_12__["DatagridSortExampleModule"],
                        _datagrid_row_select_example_module__WEBPACK_IMPORTED_MODULE_15__["DatagridRowSelectExampleModule"],
                        _datagrid_pagination_example_module__WEBPACK_IMPORTED_MODULE_17__["DatagridPagionationExampleModule"],
                    ],
                })
            ], DatagridExamplesModule);
            /***/ 
        }),
        /***/ "./src/environments/environment.ts": 
        /*!*****************************************!*\
          !*** ./src/environments/environment.ts ***!
          \*****************************************/
        /*! exports provided: environment */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function () { return environment; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            // This file can be replaced during build by using the `fileReplacements` array.
            // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
            // The list of file replacements can be found in `angular.json`.
            var environment = {
                production: false,
            };
            /*
             * For easier debugging in development mode, you can import the following file
             * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
             *
             * This import should be commented out in production mode because it will have a negative impact
             * on performance if an error is thrown.
             */
            // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
            /***/ 
        }),
        /***/ "./src/main.ts": 
        /*!*********************!*\
          !*** ./src/main.ts ***!
          \*********************/
        /*! no exports provided */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
            /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
            /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
            /* harmony import */ var _vcd_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vcd/i18n */ "../../dist/i18n/fesm2015/vcd-i18n.js");
            /*!
             * Copyright 2019 VMware, Inc.
             * SPDX-License-Identifier: BSD-2-Clause
             */
            if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
            }
            Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])([
                {
                    provide: _vcd_i18n__WEBPACK_IMPORTED_MODULE_5__["BOOTSTRAP_DETAILS"],
                    useValue: {
                        locale: 'en',
                    },
                },
            ])
                .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
                .catch(function (err) { return console.error(err); });
            /***/ 
        }),
        /***/ 0: 
        /*!***************************!*\
          !*** multi ./src/main.ts ***!
          \***************************/
        /*! no static exports found */
        /***/ (function (module, exports, __webpack_require__) {
            module.exports = __webpack_require__(/*! /home/travis/build/vmware/vmware-cloud-director-ui-components/projects/examples/src/main.ts */ "./src/main.ts");
            /***/ 
        })
    }, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
//# sourceMappingURL=main-es5.js.map
//# sourceMappingURL=main-es5.js.map