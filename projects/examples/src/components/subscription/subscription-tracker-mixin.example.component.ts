/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionTrackerMixin } from '@vcd/ui-components';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Automatically destroy subscriptions when components are destroyed by using the {@link SubscriptionTrackerMixin}.
 */
@Component({
    selector: 'vcd-subscription-tracker-mixin-example-sub',
    template: `
        <h1>This is a Sub Component</h1>
    `,
})
// Use an empty class as its base class instead of Object to support IE11
// See https://github.com/microsoft/TypeScript/issues/37601
export class SubscriptionTrackerMixinExampleSubComponent extends SubscriptionTrackerMixin(class {}) implements OnInit {
    @Input()
    observable: Observable<number>;

    ngOnInit(): void {
        this.subscribe(this.observable, value => console.log(value));
    }
}

/**
 * Console log's when the subscription publishes until you destroy the component.
 */
@Component({
    selector: 'vcd-subscription-tracker-mixin-example',
    template: `
        <button (click)="this.pushToObservable()">Push to Observable</button>
        <button (click)="shouldOpen = !shouldOpen">{{ shouldOpen ? 'Close' : 'Open' }} Sub Component</button>
        <vcd-subscription-tracker-mixin-example-sub *ngIf="shouldOpen" [observable]="observable">
        </vcd-subscription-tracker-mixin-example-sub>
    `,
})
export class SubscriptionTrackerMixinExampleComponent {
    shouldOpen = false;
    observable = new BehaviorSubject(Math.random());

    pushToObservable(): void {
        this.observable.next(Math.random());
    }
}
