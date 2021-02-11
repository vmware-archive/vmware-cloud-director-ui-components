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
import { RestQueryService } from '../utils/rest-query-search.client';
import { SharingModalComponent, SharingSelectAllToggle } from './sharing-modal.component';
import { HasId, PredefinedSharingTab, SearchResult, SharingTab } from './tabs/sharing-modal-tab.component';

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
    set usersConfig(config: PredefinedSharingTab<unknown>) {
        this.tabs.push({
            id: 'users',
            title: this.translationService.translateAsync('vcd.cc.sharing.users'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.users.selected'),
            makeSearch: this.makeSearchGenerator('user'),
            entityRenderer: SharingModalUserRenderComponent,
            ...config,
        });
    }

    /**
     * The configration for the groups tab.
     * If unset, there will be no groups tab.
     */
    @Input()
    set groupsConfig(config: PredefinedSharingTab<unknown>) {
        this.tabs.push({
            id: 'groups',
            title: this.translationService.translateAsync('vcd.cc.sharing.groups'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.groups.selected'),
            makeSearch: this.makeSearchGenerator('group'),
            entityRenderer: SharingModalGroupRenderComponent,
            ...config,
        });
    }

    /**
     * The configration for the organizations tab.
     * If unset, there will be no organizations tab.
     */
    @Input()
    set orgsConfig(config: PredefinedSharingTab<unknown>) {
        this.tabs.push({
            id: 'organizations',
            title: this.translationService.translateAsync('vcd.cc.sharing.orgs'),
            selectAllText: this.translationService.translateAsync('vcd.cc.sharing.orgs.selected'),
            makeSearch: this.makeSearchGenerator('organization'),
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

    makeSearchGenerator(type: 'user'): (search: string) => Promise<SearchResult<UserType>>;
    makeSearchGenerator(type: 'organization'): (search: string) => Promise<SearchResult<OrgType>>;
    makeSearchGenerator(type: 'group'): (search: string) => Promise<SearchResult<GroupType>>;

    makeSearchGenerator<T>(type: string): (search: string) => Promise<SearchResult<T>> {
        if (!this.client) {
            return undefined;
        }
        return async (searchTerm: string) => {
            const filter = new FilterBuilder().is('name').equalTo(`*${searchTerm}*`);
            const result: any = await this.client
                .queryEntity(
                    type,
                    {
                        filter,
                        pagination: {
                            page: 1,
                            pageSize: 10,
                        },
                    },
                    {
                        links: false,
                        multisite: true,
                    }
                )
                .toPromise();
            return {
                items: result.record as HasId<T>[],
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
