/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input } from '@angular/core';
import { ComponentRenderer } from '../../datagrid/interfaces/component-renderer.interface';
import { ComboOption } from '../select-all-checkbox/select-all-toggle.component';
import { IsSelected } from '../tabs/sharing-modal-tab.component';

interface RightsDropdownConfig<T> {
    entity: IsSelected<T>;
    shouldShowDropdown: boolean;
    rightsOptions: ComboOption[];
    rightsChangedCallback(entity: IsSelected<T>, newRightValue: string): void;
}

/**
 * A grid column renderer that shows a rights dropdown to select rights for an entity.
 * If `shouldShowDropdown` is false, displays the current right as simple text.
 */
@Component({
    selector: 'vcd-rights-dropdown-renderer',
    template: `
        <div *ngIf="!config.shouldShowDropdown; else notOwner" class="cell-content">Owner</div>
        <ng-template #notOwner>
            <select
                clrSelect
                name="options"
                [ngModel]="config.entity.accessRight.value"
                (ngModelChange)="config.rightsChangedCallback(config.entity, $event)"
                class="cell-content"
            >
                <option *ngFor="let option of config.rightsOptions" value="{{ option.value }}">
                    {{ option.display }}
                </option>
            </select>
        </ng-template>
    `,
})
export class RightsDropdownRendererComponent<T> implements ComponentRenderer<RightsDropdownConfig<T>> {
    @Input()
    config: {
        entity: IsSelected<T>;
        shouldShowDropdown: boolean;
        rightsOptions: ComboOption[];
        rightsChangedCallback(entity: IsSelected<T>, newRightValue: string): void;
    };
}
