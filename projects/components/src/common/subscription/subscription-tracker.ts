/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, PartialObserver, Subscriber, Subscription } from 'rxjs';

/**
 * An interface that knows how to subscribe and unsubscribe from observables.
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
@Injectable()
export class SubscriptionTracker implements ISubscriptionTracker, OnDestroy {
    private subscriptions: Subscription[] = [];

    subscribe<T>(
        observable: Observable<T>,
        next?: (value: T) => void,
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        const subscription = observable.subscribe({ next, error, complete });
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
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions = [];
    }

    ngOnDestroy(): void {
        this.unsubscribeAll();
    }
}
