/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Directive, Inject, Input, OnInit, Optional } from '@angular/core';
import { Query, VcdApiClient } from '@vcd/angular-client';
import { GroupType, OrgType, UserType } from '@vcd/bindings/vcloud/api/rest/schema_v1_5/index';
import { TranslationService } from '@vcd/i18n';
import { ComponentRenderer } from '../datagrid/interfaces/component-renderer.interface';
import { FilterBuilder } from '../utils/filter-builder';
import { RestQueryService } from '../utils/rest/rest-query-search.client';
import { SharingModalComponent, SharingSelectAllToggle } from './sharing-modal.component';
import { HasId, PredefinedSharingTab, SearchResult, SharingTab } from './tabs/sharing-modal-tab.component';

/**
 * Given some search term, gives the complete filter.
 */
export type FilterCreator = (searchTerm: string) => FilterBuilder;

/**
 * A tab that knows how to communicate with the backend.
 */
export interface QueryableTab<T> extends PredefinedSharingTab<T> {
    /**
     * Gives the search term, provides the filter that will be sent to the backend.
     */
    filterCreator?: FilterCreator;
}

/**
 * A filter creator that knows how to filter by name.
 */
export const defaultFilterCreator: FilterCreator = (searchTerm: string) =>
    new FilterBuilder().is('name').equalTo(`*${searchTerm}*`);

/**
 * Supplies convinece bindings to the `vcd-sharing-modal` for the use case
 * of selecting users, groups, and/or organizations to share with.
 *
 * Inputs only work if applied before rendering is complete. Not dynamic.
 */
@Directive({
    selector: 'vcd-sharing-modal[vcdUsersGroupsOrgsSharingModal]',
})
export class UsersGroupsOrgsSharingModalDirective implements OnInit {
    /**
     * The configration for the users tab.
     * If unset, there will be no users tab.
     */
    @Input()
    set usersConfig(config: QueryableTab<unknown>) {
        this.tabs.push({
            id: 'users',
            title: this.translationService.translateAsync('vcd.cc.sharing.users'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.users.selected'),
            makeSearch: this.makeSearchGenerator('user', config.filterCreator || defaultFilterCreator),
            entityRenderer: SharingModalUserRenderComponent,
            ...config,
        });
    }

    /**
     * The configration for the groups tab.
     * If unset, there will be no groups tab.
     */
    @Input()
    set groupsConfig(config: QueryableTab<unknown>) {
        this.tabs.push({
            id: 'groups',
            title: this.translationService.translateAsync('vcd.cc.sharing.groups'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.groups.selected'),
            makeSearch: this.makeSearchGenerator('group', config.filterCreator || defaultFilterCreator),
            entityRenderer: SharingModalGroupRenderComponent,
            ...config,
        });
    }

    /**
     * The configration for the organizations tab.
     * If unset, there will be no organizations tab.
     */
    @Input()
    set orgsConfig(config: QueryableTab<unknown>) {
        this.tabs.push({
            id: 'organizations',
            title: this.translationService.translateAsync('vcd.cc.sharing.orgs'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.orgs.selected'),
            makeSearch: this.makeSearchGenerator('organization', config.filterCreator || defaultFilterCreator),
            entityRenderer: SharingModalOrgRenderComponent,
            ...config,
        });
    }

    /**
     * If there should be a checkbox for selecting all users and groups.
     */
    @Input()
    set showSelectAllUsersAndGroups(isEnabled: boolean) {
        if (isEnabled) {
            this.toggles.push({
                tabIds: ['users', 'groups'],
                description: this.translationService.translateAsync('vcd.cc.sharing.all.users.groups'),
            });
        }
    }

    /**
     * If there should be a checkbox for selecting all users.
     */
    @Input()
    set showSelectAllUsers(isEnabled: boolean) {
        if (isEnabled) {
            this.toggles.push({
                tabIds: ['users'],
                description: this.translationService.translateAsync('vcd.cc.sharing.all.users'),
            });
        }
    }

    /**
     * If there should be a checkbox for selecting all groups
     */
    @Input()
    set showSelectAllGroups(isEnabled: boolean) {
        if (isEnabled) {
            this.toggles.push({
                tabIds: ['groups'],
                description: this.translationService.translateAsync('vcd.cc.sharing.all.groups'),
            });
        }
    }

    /**
     * If there should be a checkbox for selecting all organizations.
     */
    @Input()
    set showSelectAllOrgs(isEnabled: boolean) {
        if (isEnabled) {
            this.toggles.push({
                tabIds: ['organizations'],
                description: this.translationService.translateAsync('vcd.cc.sharing.all.orgs'),
            });
        }
    }

    private tabs: SharingTab<unknown>[] = [];
    private toggles: SharingSelectAllToggle[] = [];

    constructor(
        private hostSharingModalComponent: SharingModalComponent,
        private translationService: TranslationService,
        @Optional() @Inject(RestQueryService) private client: RestQueryService
    ) {}

    ngOnInit(): void {
        const host = this.hostSharingModalComponent;
        if (!host.tabs) {
            host.tabs = [];
        }
        host.tabs = [...host.tabs, ...this.tabs];
        if (!host.selectAllToggles) {
            host.selectAllToggles = [];
        }
        host.selectAllToggles = [...host.selectAllToggles, ...this.toggles];
    }

    // tslint:disable-next-line: typedef
    makeSearchGenerator<T extends string>(type: T, filterCreator: FilterCreator) {
        if (!this.client) {
            return undefined;
        }
        return async (searchTerm: string) => {
            const filter = filterCreator(searchTerm);
            const result = await this.client
                .queryEntity(
                    type,
                    {
                        filter,
                        pageSize: 10,
                    },
                    {
                        links: false,
                        multisite: true,
                    }
                )
                .toPromise();
            return {
                items: result.record as HasId<typeof result.record>[],
                totalCount: result.total,
            };
        };
    }
}
@Component({
    selector: 'vcd-sharing-modal-user-renderer',
    template: ` <clr-icon [attr.size]="'1em'" [attr.shape]="'user'"></clr-icon> {{ config.name }}`,
})
export class SharingModalUserRenderComponent implements ComponentRenderer<HasId<UserType>> {
    @Input() config: HasId<UserType>;
}

@Component({
    selector: 'vcd-sharing-modal-group-renderer',
    template: ` <clr-icon [attr.size]="'1em'" [attr.shape]="'users'"></clr-icon> {{ config.name }}`,
})
export class SharingModalGroupRenderComponent implements ComponentRenderer<HasId<UserType>> {
    @Input() config: HasId<UserType>;
}

@Component({
    selector: 'vcd-sharing-modal-group-renderer',
    template: ` <clr-icon [attr.size]="'1em'" [attr.shape]="'organization'"></clr-icon> {{ config.name }}`,
})
export class SharingModalOrgRenderComponent implements ComponentRenderer<HasId<UserType>> {
    @Input() config: HasId<UserType>;
}
