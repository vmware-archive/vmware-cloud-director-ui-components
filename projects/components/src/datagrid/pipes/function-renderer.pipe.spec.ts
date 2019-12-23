/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { FunctionRendererPipe } from './function-renderer.pipe';

describe('FunctionRendererPipe', () => {
    const functionRendererPipe = new FunctionRendererPipe();

    it('returns null if item or function is not provided', () => {
        expect(functionRendererPipe.transform(null, () => {})).toBeNull();
        expect(functionRendererPipe.transform({}, null)).toBeNull();
    });

    it('returns transformed value as the value returned by the function given as input', () => {
        const item = {
            prop: 'value',
        };
        const foo = (obj: any) => {
            return obj.prop;
        };
        const boo = (obj: any) => {
            return !!obj;
        };
        expect(functionRendererPipe.transform(item, foo)).toEqual('value');
        expect(functionRendererPipe.transform(item, boo)).toBeTruthy();
    });
});
