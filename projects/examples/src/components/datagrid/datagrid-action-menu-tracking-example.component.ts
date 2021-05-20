/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ActionItem,
    ActionStyling,
    ActionType,
    CheckBoxStyling,
    DatagridActionDisplayConfig,
    DatagridComponent,
    DatagridContextualActionPosition,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    SubscriptionTracker,
    TextIcon,
} from '@vcd/ui-components';
import { of } from 'rxjs';

interface Record {
    value: string;
}

@Component({
    selector: 'vcd-datagrid-action-menu-tracking-example',
    templateUrl: 'datagrid-action-menu-tracking-example.component.html',
    styleUrls: ['datagrid-action-menu-tracking-example.component.scss'],
    providers: [SubscriptionTracker],
})
export class DatagridActionMenuTrackingExampleComponent<R extends Record> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(DatagridComponent, { static: false }) dg: DatagridComponent<R>;

    gridData: GridDataFetchResult<Record> = {
        items: [],
    };

    columns: GridColumn<R>[] = [
        {
            displayName: 'Some Value',
            renderer: 'value',
        },
    ];

    actions: ActionItem<R, unknown>[] = [];

    actionDisplayConfig: DatagridActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
            position: DatagridContextualActionPosition.TOP,
        },
        staticActionStyling: ActionStyling.INLINE,
    };

    formGroup: FormGroup;

    isActionMenuAvailable = false;

    private readonly staticActions: ActionItem<R, unknown>[] = [
        {
            textKey: 'Add',
            handler: () => {
                console.log('TODO Add!');
            },
            availability: of(this.formGroup.controls.enableActions.value),
            class: 'add',
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
    ];

    private readonly contextualActions: ActionItem<R, unknown>[] = [
        {
            textKey: 'Delete',
            handler: () => {
                console.log('TODO delete!');
            },
            availability: () => this.formGroup.controls.enableActions.value,
            class: 'delete',
            actionType: ActionType.CONTEXTUAL_FEATURED,
            isTranslatable: false,
        },
    ];

    GridSelectionType = GridSelectionType;

    CheckBoxStyling = CheckBoxStyling;

    numberOfAvailableActions = 0;
    private actionsTracker = new SubscriptionTracker();

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private subscriptionTracker: SubscriptionTracker
    ) {
        this.formGroup = this.fb.group({
            ['enableActions']: [true],
            ['contextualActions']: [true],
            ['staticActions']: [true],
        });
        this.setActions();
    }

    ngOnInit(): void {
        this.subscriptionTracker.subscribe(this.formGroup.controls.contextualActions.valueChanges, this.setActions);
        this.subscriptionTracker.subscribe(this.formGroup.controls.staticActions.valueChanges, this.setActions);
        this.subscriptionTracker.subscribe(this.formGroup.controls.enableActions.valueChanges, this.setActions);
        this.setActions();
    }

    ngAfterViewInit(): void {
        this.processActionMenuAvailability();
        this.subscriptionTracker.subscribe(this.dg.mainActionMenu.changes, this.processActionMenuAvailability);
    }

    refresh(eventData: GridState<R>): void {
        this.gridData = {
            items: [{ value: 'Value a' }, { value: 'Value b' }],
            totalItems: 2,
        };
    }

    ngOnDestroy() {
        this.actionsTracker.unsubscribeAll();
    }

    private processActionMenuAvailability = () => {
        const actionMenu = this.dg.mainActionMenu?.first;
        this.isActionMenuAvailable = !!actionMenu;
        this.actionsTracker.unsubscribeAll();
        if (actionMenu) {
            this.updateNumberOfAvailableActions();
            this.actionsTracker.subscribe(actionMenu.actionsUpdate, this.updateNumberOfAvailableActions);
        }
        this.cd.detectChanges();
    };

    private updateNumberOfAvailableActions = () => {
        this.numberOfAvailableActions = [
            ...this.dg.mainActionMenu.first?.staticActions,
            ...this.dg.mainActionMenu.first?.staticFeaturedActions,
            ...this.dg.mainActionMenu.first?.contextualActions,
        ].length;
        this.cd.detectChanges();
    };

    private setActions = () => {
        this.actions = [];
        if (this.formGroup.controls.contextualActions.value) {
            this.actions.push(...this.contextualActions);
        }
        if (this.formGroup.controls.staticActions.value) {
            this.actions.push(...this.staticActions);
        }
    };
}
