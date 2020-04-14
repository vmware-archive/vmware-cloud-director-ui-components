/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { OnDestroy, Type } from '@angular/core';

import { Observable, PartialObserver, Subscription } from 'rxjs';
import { ISubscriptionTracker, SubscriptionTracker } from './subscription-tracker';

/**
 * Creates a constructor for a class that can automatically subscribe and unsubscribe from observables.
 *
 * All subscriptions are automatically removed when the component is destroyed
 */
// tslint:disable-next-line: typedef
export function SubscriptionTrackerMixin<TBase extends Type<{}>>(Base: TBase) {
    abstract class Mixin extends Base implements ISubscriptionTracker, OnDestroy {
        tracker = new SubscriptionTracker(this);

        public subscribe<T>(
            observable: Observable<T>,
            observerOrNext?: PartialObserver<T> | ((value: T) => void),
            error?: (error: any) => void,
            complete?: () => void
        ): Subscription {
            return this.tracker.subscribe(observable, observerOrNext, error, complete);
        }

        public unsubscribe(subscription: Subscription): Subscription {
            return this.tracker.unsubscribe(subscription);
        }

        unsubscribeAll(): void {
            this.tracker.unsubscribeAll();
        }

        abstract ngOnDestroy(): void;
    }
    return Mixin;
}
