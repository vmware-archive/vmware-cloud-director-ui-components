/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';
import { toSubscriber } from 'rxjs/util/toSubscriber';

/**
 * An interface that knows how to subscribe and ubsubscribe from observables.
 */
export interface ISubscriptionTracker {
    /**
     * Subscribes to the given {@param observable}. Passes along the given {@param observerOrNext}.
     * Will call the {@param complete} when complete, and {@param error} when errors happen.
     */
    subscribe<T>(
        observable: Observable<T>,
        observerOrNext?: PartialObserver<T> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription;

    /**
     * Unsubscribes from the given {@param subscription}.
     */
    unsubscribe(subscription: Subscription): Subscription;

    /**
     * Unsubscribes from all subscriptions on this {@link Subscribable}.
     */
    unsubscribeAll(): void;
}

/**
 * Components can use this to have subscriptions automatically removed when the component is destroyed
 */
export class SubscriptionTracker implements ISubscriptionTracker {
    private subscriptions: Subscription[] = [];

    /**
     * Constructs this tracker to call {@link unsubscribeAll} when {@link destroyable.ngOnDestroy} is called.
     */
    constructor(destroyable: OnDestroy) {
        const originalOnDestroy = destroyable.ngOnDestroy;
        destroyable.ngOnDestroy = () => {
            this.unsubscribeAll();
            originalOnDestroy.call(destroyable);
        };
    }

    subscribe<T>(
        observable: Observable<T>,
        observerOrNext?: PartialObserver<T> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        const subscription = observable.subscribe(toSubscriber(observerOrNext, error, complete));
        this.subscriptions.push(subscription);
        return subscription;
    }

    unsubscribe(subscription: Subscription): Subscription {
        subscription.unsubscribe();
        const indexOfSubscription = this.subscriptions.indexOf(subscription);
        if (indexOfSubscription === -1) {
            throw new Error('Unsubscribing to untracked subscription');
        }
        this.subscriptions.splice(indexOfSubscription, 1);
        return subscription;
    }

    unsubscribeAll(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
}
