/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

export class CommonUtil {
    /**
     * Rounds number to given floating point, 2 by default.
     * @param value number from float data type
     * @param digits how many numbers will be shown after decimal point
     */
    static roundTo(value: number, digits: number = 2): number {
        if (!value) {
            value = 0;
        }
        return Number(Math.round(Number(value + 'e' + digits)) + 'e-' + digits);
    }

    /**
     * Verifies if the passed value is of type Function
     */
    static isFunction(value: any): value is (...args: unknown[]) => unknown {
        return typeof value === 'function';
    }

    /**
     * Creates a function that when called, actually calls the function parameter `fn` after a certain amount of time,
     * which is the value of `buffer` parameter. The created function then resolves the promise it returned and the same
     * promise is reused for all the calls that get buffered
     *
     * @param fn - Function to be debounced
     * @param scope - The function scope of the parameter `fn`
     * @param buffer - How long since the last call to the debounced function to wait before calling `fn`
     * @return A function that when called, will delay the calls to the `fn` that was passed in. That function will return
     * the same promise each time a call is made and buffered. This means that callers need to be sure to ignore previous
     * calls. This is not
     */
    static createBufferedPromise<T extends (...p: any) => any>(
        fn: T,
        scope: unknown,
        buffer = 300
    ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
        let timerId: any;
        let pendingPromise: Promise<ReturnType<T>> = null;
        // tslint:disable-next-line:ban-types
        let resolver: Function;
        // tslint:disable-next-line:only-arrow-functions
        return function(): Promise<any> {
            if (!pendingPromise) {
                pendingPromise = new Promise((resolve) => {
                    resolver = resolve;
                });
            }
            const callArgs = Array.from(arguments);
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }

            timerId = setTimeout(() => {
                const retValue = fn.apply(scope, callArgs);
                resolver(retValue);
                pendingPromise = null;
                timerId = null;
            }, buffer);
            return pendingPromise;
        };
    }
}
