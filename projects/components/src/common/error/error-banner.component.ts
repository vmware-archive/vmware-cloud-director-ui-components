/*!
 * Copyright 2020-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

const NO_ERROR_VALUE = null;

/**
 * Component that displays the error message only if a non empty errorMessage is passed in
 */
@Component({
    selector: 'vcd-error-banner',
    templateUrl: './error-banner.component.html',
    styleUrls: ['./error-banner.component.scss'],
})
export class ErrorBannerComponent {
    private _errorMessage: string | null = NO_ERROR_VALUE;

    closed = true;

    /**
     * Emits events when the error banner is dismissed.
     */
    @Output() dismissed = new EventEmitter<void>();

    /**
     * Two way bound errorMessage, will be cleared when the user dismisses the alert
     */
    @Input() get errorMessage(): string {
        return this._errorMessage;
    }

    /**
     * Sets clr-alert type
     */
    @Input() alertType: 'danger' | 'warning' | 'info' | 'success' = 'danger';

    /**
     * Marks clr-alert as closable or not
     */
    @Input() alertClosable = true;

    /**
     * Sets the error message displayed by this error banner.
     */
    set errorMessage(val: string) {
        this._errorMessage = val || NO_ERROR_VALUE;
        this.closed = !val;
    }

    /**
     * Emits an event when the error message is changed.
     */
    @Output() errorMessageChange = new EventEmitter<string>();

    /**
     * Clears the error message when the alert is closed.
     */
    onAlertClosedChange(closed: boolean): void {
        if (closed) {
            if (this._errorMessage) {
                this._errorMessage = NO_ERROR_VALUE;
                this.errorMessageChange.emit(this._errorMessage);
            }
            this.dismissed.next();
        }
    }
}
