/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SubscriptionTracker } from './subscription-tracker';
import createSpy = jasmine.createSpy;

describe('SubscriptionTracker', () => {
    /**
     * The Subscription tracker is typically created within Angular components. However, these specs use an
     * object that implements the OnDestroy interface for simplicity
     */
    class Destroyable implements OnDestroy {
        public tracker = new SubscriptionTracker(this);

        public ngOnDestroyCallCount = 0;

        ngOnDestroy(): void {
            this.ngOnDestroyCallCount++;
        }
    }

    describe('subscribing', () => {
        it('adds a subscription', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.tracker.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('adds multiple subscriptions', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.tracker.subscribe(subject, spy);
            destroyable.tracker.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
        });
        it('removes subscriptions when ngOnInit is called', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.tracker.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
            destroyable.ngOnDestroy();
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('unsubscribing', () => {
        it('returns a subscription so you can unsubscribe', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription = destroyable.tracker.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
            destroyable.tracker.unsubscribe(subscription);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('errors if you unsubscribe to a subscription that was not created by the subscription tracker', () => {
            const destroyable = new Destroyable();
            const subject = new Subject<void>();
            const subscription = subject.subscribe();
            expect(() => destroyable.tracker.unsubscribe(subscription)).toThrow();
        });

        it('unsubscribe from all subscriptions when unsubscribeAll() is called', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription1 = destroyable.tracker.subscribe(subject, spy);
            const subscription2 = destroyable.tracker.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
            destroyable.tracker.unsubscribeAll();
            expect(subscription1.closed).toBe(true);
            expect(subscription2.closed).toBe(true);
        });

        it('unsubscribe() from subscriptions are not called again if unsubscribeAll() is called multiple times', () => {
            const destroyable = new Destroyable();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription1 = destroyable.tracker.subscribe(subject, spy);
            const subscription2 = destroyable.tracker.subscribe(subject, spy);
            spyOn(subscription1, 'unsubscribe');
            spyOn(subscription2, 'unsubscribe');
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
            destroyable.tracker.unsubscribeAll();
            expect(subscription1.unsubscribe).toHaveBeenCalledTimes(1);
            expect(subscription2.unsubscribe).toHaveBeenCalledTimes(1);
            destroyable.tracker.unsubscribeAll();
            expect(subscription1.unsubscribe).toHaveBeenCalledTimes(1);
            expect(subscription2.unsubscribe).toHaveBeenCalledTimes(1);
        });
    });

    describe('augmenting ngOnDestroy', () => {
        it('overrides ngOnDestroy', () => {
            const destroyable = new Destroyable();
            expect(destroyable.ngOnDestroy).not.toBe(Destroyable.prototype.ngOnDestroy);
        });
        it('still calls the original ngOnDestroy with the correct `this`', () => {
            const destroyable = new Destroyable();
            destroyable.ngOnDestroy();
            expect(destroyable.ngOnDestroyCallCount).toBe(1, 'Property ngOnDestroyCallCount was not updated');
        });
    });
});
