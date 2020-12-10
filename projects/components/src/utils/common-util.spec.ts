/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { CommonUtil } from './common-util';

describe('CommonUtil', () => {
    it('can round a number to 2 floating points by default', () => {
        expect(CommonUtil.roundTo(12.874653)).toEqual(12.87);
    });
    it('can round a number to given number of floating points', () => {
        expect(CommonUtil.roundTo(12.874653, 4)).toEqual(12.8747);
    });
    it('can round to 0 when no number is given', () => {
        expect(CommonUtil.roundTo(null)).toEqual(0);
    });

    describe('createBufferedPromise', () => {
        it(
            'returns a function that returns a promise which resolves with the output of function passed after a buffer amount of' +
                'milliseconds',
            async () => {
                const bufferedFuncOutput = `output of function passed to createBufferedPromise`;
                const functionToBeBuffered = () => bufferedFuncOutput;
                const bufferTime = 400;
                const bufferedPromise = CommonUtil.createBufferedPromise(functionToBeBuffered, null, bufferTime);
                let result;
                setTimeout(() => expect(result).toBeUndefined(), 399);
                setTimeout(() => expect(result).toBeDefined(), 401);
                result = await bufferedPromise();
                expect(result).toEqual(bufferedFuncOutput);
            }
        );
    });
});
