/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionTrackerMixin } from '@vcd/ui-components';

/**
 * Automatically destroy subscriptions when components are destroyed by using the {@link SubscriptionTrackerMixin}.
 */
@Component({
    selector: 'vcd-subscription-tracker-mixin-example-sub',
    template: `
        <h1>This is a Sub Component</h1>
    `,
})
export class SubscriptionTrackerMixinExampleSubComponent extends SubscriptionTrackerMixin(Object) implements OnInit {
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
