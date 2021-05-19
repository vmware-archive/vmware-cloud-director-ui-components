/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    ActionItem,
    ActionStyling,
    ActionType,
    DatagridActionDisplayConfig,
    DatagridComponent,
    DatagridContextualActionPosition,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    SelectOption,
    TextIcon,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-datagrid-action-display-config-example',
    templateUrl: 'datagrid-action-display-config.example.component.html',
    styleUrls: ['datagrid-action-display-config.example.component.scss'],
})
export class DatagridActionDisplayConfigExampleComponent implements OnInit {
    @ViewChild(DatagridComponent, { static: true }) dg: DatagridComponent<any>;

    gridData: GridDataFetchResult<any> = {
        items: [],
    };

    columns: GridColumn<any>[] = [
        {
            displayName: 'Some Value',
            renderer: 'value',
        },
    ];

    actions: ActionItem<unknown, unknown>[] = [
        {
            textKey: 'Contextual 1',
            handler: () => {
                console.log('Contextual action output');
            },
            isTranslatable: false,
            icon: 'cloud',
        },
        {
            textKey: 'Featured 1',
            handler: () => null,
            isTranslatable: false,
            icon: 'user',
            actionType: ActionType.CONTEXTUAL_FEATURED,
        },
        {
            textKey: 'Nested actions',
            children: [
                {
                    textKey: 'Featured 2',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    handler: () => null,
                    isTranslatable: false,
                    icon: 'cog',
                },
                {
                    textKey: 'Featured 3',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    handler: () => null,
                    isTranslatable: false,
                    icon: 'folder',
                },
                {
                    textKey: 'Contextual 2',
                    handler: () => null,
                    isTranslatable: false,
                    icon: 'home',
                },
            ],
            isTranslatable: false,
        },
    ];

    actionDisplayConfig: DatagridActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            featuredCount: 2,
            buttonContents: TextIcon.TEXT,
            position: DatagridContextualActionPosition.TOP,
        },
    };

    selectionType = GridSelectionType.Single;

    contextualFormGroup = this.fb.group({
        ['styling']: [ActionStyling.INLINE],
        ['buttonContents']: [TextIcon.TEXT],
        ['position']: [DatagridContextualActionPosition.TOP],
        ['featuredCount']: [2],
    });

    stylingOptions: SelectOption[] = [
        {
            value: ActionStyling.INLINE,
            display: 'Inline',
        },
        {
            value: ActionStyling.DROPDOWN,
            display: 'Dropdown',
        },
    ];

    buttonContentsOptions: SelectOption[] = [
        {
            value: TextIcon.ICON,
            display: 'Icon',
        },
        {
            value: TextIcon.TEXT,
            display: 'Text',
        },
        {
            value: TextIcon.ICON_AND_TEXT,
            display: 'Icon and Text',
        },
    ];

    positionOptions: SelectOption[] = [
        {
            value: DatagridContextualActionPosition.TOP,
            display: 'Top',
        },
        {
            value: DatagridContextualActionPosition.ROW,
            display: 'In row',
        },
    ];

    constructor(private fb: FormBuilder) {}

    refresh(eventData: GridState<any>): void {
        this.gridData = {
            items: [
                { value: 'a', paused: false },
                { value: 'b', paused: true },
            ],
            totalItems: 2,
        };
    }

    ngOnInit(): void {
        this.updateFeaturedCountControl(this.actionDisplayConfig.contextual);

        this.contextualFormGroup.valueChanges.subscribe((formValue) => {
            this.updateFeaturedCountControl(formValue);
            this.updateGridSelectionType(formValue);

            this.actionDisplayConfig = {
                contextual: { ...this.contextualFormGroup.value },
            };
        });
    }

    updateFeaturedCountControl(value) {
        if (value.styling === ActionStyling.INLINE) {
            this.contextualFormGroup.get('featuredCount').enable({ onlySelf: true, emitEvent: false });
        } else {
            this.contextualFormGroup.get('featuredCount').disable({ onlySelf: true, emitEvent: false });
        }
        this.contextualFormGroup.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    updateGridSelectionType(value) {
        this.selectionType =
            value.position === DatagridContextualActionPosition.ROW ? GridSelectionType.None : GridSelectionType.Single;
    }
}
