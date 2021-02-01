/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Directive, Input, OnInit } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { SharingModalComponent, SharingSelectAllToggle } from './sharing-modal.component';
import { PredefinedSharingTab, SharingTab } from './tabs/sharing-modal-tab.component';

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
        private translationService: TranslationService
    ) {}

    ngOnInit(): void {
        const host = this.hostSharingModalComponent;
        if (!host.tabs) {
            host.tabs = [];
        }
        host.tabs.push(...this.tabs);
        if (!host.selectAllToggles) {
            host.selectAllToggles = [];
        }
        host.selectAllToggles.push(...this.toggles);
    }
}
