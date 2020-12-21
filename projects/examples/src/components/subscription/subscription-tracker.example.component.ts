/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionTracker } from '@vcd/ui-components';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Automatically destroy subscriptions when components are destroyed by using the {@link SubscriptionTracker}.
 */
@Component({
    selector: 'vcd-subscription-tracker-example-sub',
    template: ` <h1>This is a Sub Component</h1> `,
})
// Use an empty class as its base class instead of Object to support IE11
// See https://github.com/microsoft/TypeScript/issues/37601
export class SubscriptionTrackerExampleSubComponent implements OnInit, OnDestroy {
    @Input()
    observable: Observable<number>;

    private subscriptionTracker = new SubscriptionTracker(this);

    ngOnInit(): void {
        this.subscriptionTracker.subscribe(this.observable, (value) => console.log(value));
    }

    ngOnDestroy(): void {}
}

/**
 * Console log's when the subscription publishes until you destroy the component.
 */
@Component({
    selector: 'vcd-subscription-tracker-example',
    template: `
        <button (click)="this.pushToObservable()">Push to Observable</button>
        <button (click)="shouldOpen = !shouldOpen">{{ shouldOpen ? 'Close' : 'Open' }} Sub Component</button>
        <vcd-subscription-tracker-example-sub *ngIf="shouldOpen" [observable]="observable">
        </vcd-subscription-tracker-example-sub>
    `,
})
export class SubscriptionTrackerExampleComponent {
    shouldOpen = false;
    observable = new BehaviorSubject(Math.random());

    pushToObservable(): void {
        this.observable.next(Math.random());
    }
}
