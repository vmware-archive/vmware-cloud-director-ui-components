/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Directive, EventEmitter, Host, Input, OnDestroy, Output } from '@angular/core';
import { MessageFormatTranslationService, TranslationService, TranslationSet } from '@vcd/i18n';
import {
    EntityActionExtensionComponent,
    EntityActionExtensionMenuEntry,
    EntityActionExtensionMenuItem,
    EntityActionExtensionSubmenu,
    _EntityActionExtensionComponent,
} from '@vcd/sdk/common';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionItem } from '../../common/interfaces';
import { SubscriptionTracker } from '../../common/subscription';
import { ActionMenuComponent } from '../action-menu.component';

/**
 * Provided by the calling component of {@link EntityActionExtensionComponentsDirective} as input
 */
export interface EntityActionComponentContainer {
    /**
     * Every component referenced by an entity action extension point must inherit from this. Used for retrieving the extension action item
     * contents
     */
    componentInstance: _EntityActionExtensionComponent;
    /**
     * Translation set to be used for translation of action item texts when displayed
     */
    translations?: TranslationSet;
}

/**
 * Event emitted when a plugin action is clicked.
 */
export interface EntityActionExtensionMenuItemClickEvent {
    /**
     * Every component referenced by an entity action extension point must inherit from this. used for performing action when a extension
     * action item is clicked
     */
    component: _EntityActionExtensionComponent;
    /**
     * The Identifier of the entity that the action is being called for
     */
    entityUrn: string;
    /**
     * The URN of the clicked menu item
     */
    menuItemUrn: string;
}

/**
 * To fetch {@link EntityActionExtensionMenuEntry} items asynchronously and map them to {@link ActionItem}. Injected on
 * to {@link ActionMenuComponent} to provide it the extension actions and use it's contextual actions dropdown view to
 * display the extension actions
 */
@Directive({
    selector: 'vcd-action-menu[vcdEntityActionExtensionContainers]',
})
export class EntityActionExtensionComponentsDirective implements OnDestroy {
    /**
     * List of objects which are used for defining the extension action items and their translation sets
     */
    @Input()
    set vcdEntityActionExtensionContainers(components: EntityActionComponentContainer[]) {
        this._entityActionExtensionContainers = components;
        this.prepareExtensionActionItems();
    }
    private _entityActionExtensionContainers: EntityActionComponentContainer[];

    /**
     * The URN of the entity the menu is being rendered from (e.g. the VM or vApp)
     */
    @Input()
    set entityUrn(urn: string) {
        this._entityUrn = urn;
        this.prepareExtensionActionItems();
    }
    private _entityUrn: string;

    /**
     * Emitted if a menu item is clicked.
     */
    @Output()
    menuItemClick = new EventEmitter<EntityActionExtensionMenuItemClickEvent>();

    private subTracker = new SubscriptionTracker(this);
    private subscription: Subscription;

    /**
     * Model from which the view of {@link ActionMenuComponent} renders. These are added to the end of contextual
     * actions of action menu component
     */
    extensionActionItems: ActionItem<unknown, unknown>[] = [];

    constructor(
        @Host() private actionMenu: ActionMenuComponent<unknown, unknown>,
        private translationService: TranslationService
    ) {}

    /**
     * Called when the entity or components change. Uses the {@link EntityActionExtensionComponent.getMenuEntry} to get
     * menu entry and creates the menu entries
     */
    private prepareExtensionActionItems(): void {
        if (!this._entityUrn || !this._entityActionExtensionContainers) {
            return;
        }
        if (this.subscription) {
            this.subTracker.unsubscribe(this.subscription);
        }
        const actionItemsObservables = this._entityActionExtensionContainers.map((component) =>
            this.getExtensionActionItemObservable(component)
        );

        const combinedObservableOfActionItems = combineLatest(actionItemsObservables);

        this.subscription = this.subTracker.subscribe(combinedObservableOfActionItems, (actionItems) => {
            this.extensionActionItems = actionItems;
            this.actionMenu.extensionEntityActions = this.extensionActionItems;
        });
    }

    private getExtensionActionItemObservable(
        component: EntityActionComponentContainer
    ): Observable<ActionItem<unknown, unknown>> {
        return component.componentInstance.getMenuEntry(this._entityUrn).pipe(
            map((menuEntry: EntityActionExtensionMenuEntry) => {
                if ((menuEntry as EntityActionExtensionSubmenu).children?.length) {
                    const subMenu = {
                        ...menuEntry,
                        children: [...(menuEntry as EntityActionExtensionSubmenu).children],
                    };
                    return {
                        textKey: this.translate(subMenu.text, component.translations),
                        children: subMenu.children.map((menuItem) => this.getExtensionActionItem(menuItem, component)),
                        isTranslatable: false,
                    };
                }
                return this.getExtensionActionItem(menuEntry as EntityActionExtensionMenuItem, component);
            })
        );
    }

    private getExtensionActionItem(
        menuItem: EntityActionExtensionMenuItem,
        component: EntityActionComponentContainer
    ): ActionItem<unknown, unknown> {
        return {
            busy: menuItem.busy,
            textKey: this.translate(menuItem.text, component.translations),
            disabled: () => !menuItem.enabled,
            isTranslatable: false,
            handler: () => {
                this.menuItemClick.emit({
                    component: component.componentInstance,
                    menuItemUrn: menuItem.urn,
                    entityUrn: this._entityUrn,
                });
            },
        };
    }

    private translate(text: string, translations: TranslationSet): string {
        if (!this.isExtensionTranslationPlaceholder(text)) {
            return text;
        }

        const translationString = text.split('%').filter(Boolean)[0];

        if (translations) {
            const translationService = new MessageFormatTranslationService(window.navigator.language, 'en');
            translationService.registerTranslations(translations);
            return translationService.translate(translationString);
        }

        return this.translationService.translate(translationString);
    }

    private isExtensionTranslationPlaceholder(text: string): boolean {
        return text.startsWith('%') && text.endsWith('%');
    }

    ngOnDestroy(): void {}
}
