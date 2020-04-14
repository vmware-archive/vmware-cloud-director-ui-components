/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import createSpy = jasmine.createSpy;
import { Subject } from 'rxjs';
import { SubscriptionTrackerMixin } from './subscription-tracker.mixin';
import { OnDestroy } from '@angular/core';

describe('SubscriptionTrackerMixin', () => {
    class SubscribeObject extends SubscriptionTrackerMixin(class {}) implements OnDestroy {
        ngOnDestroy(): void {}
    }

    describe('subscribing', () => {
        it('adds a subscription', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('adds multiple subscriptions', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.subscribe(subject, spy);
            destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
        });
        it('removes subscriptions when ngOnInit is called', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
            destroyable.ngOnDestroy();
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('unsubscribing', () => {
        it('returns a subscription so you can unsubscribe', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription = destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(1);
            destroyable.unsubscribe(subscription);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('errors if you unsubscribe to a subscription that was not created by the subscription tracker', () => {
            const destroyable = new SubscribeObject();
            const subject = new Subject<void>();
            const subscription = subject.subscribe();
            expect(() => destroyable.unsubscribe(subscription)).toThrow();
        });

        it('unsubscribe from all subscriptions when unsubscribeAll() is called', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription1 = destroyable.subscribe(subject, spy);
            const subscription2 = destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
            destroyable.unsubscribeAll();
            expect(subscription1.closed).toBe(true);
            expect(subscription2.closed).toBe(true);
        });

        it('unsubscribe from all subscriptions when ngOnDestroy() is called', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription1 = destroyable.subscribe(subject, spy);
            const subscription2 = destroyable.subscribe(subject, spy);
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
            destroyable.ngOnDestroy();
            expect(subscription1.closed).toBe(true);
            expect(subscription2.closed).toBe(true);
        });

        it('unsubscribe() from subscriptions are not called again if unsubscribeAll() is called multiple times', () => {
            const destroyable = new SubscribeObject();
            const spy = createSpy('observableSubscription');
            const subject = new Subject<void>();
            const subscription1 = destroyable.subscribe(subject, spy);
            const subscription2 = destroyable.subscribe(subject, spy);
            spyOn(subscription1, 'unsubscribe');
            spyOn(subscription2, 'unsubscribe');
            subject.next();
            expect(spy).toHaveBeenCalledTimes(2);
            destroyable.unsubscribeAll();
            expect(subscription1.unsubscribe).toHaveBeenCalledTimes(1);
            expect(subscription2.unsubscribe).toHaveBeenCalledTimes(1);
            destroyable.unsubscribeAll();
            expect(subscription1.unsubscribe).toHaveBeenCalledTimes(1);
            expect(subscription2.unsubscribe).toHaveBeenCalledTimes(1);
        });
    });
});
