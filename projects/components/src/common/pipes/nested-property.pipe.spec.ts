/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NestedPropertyPipe } from './nested-property.pipe';

describe('NestedPropertyPipe', () => {
    const nestedPropertyPipe = new NestedPropertyPipe();

    it('returns null if item or property is not provided', () => {
        expect(nestedPropertyPipe.transform(null, 'prop')).toBeNull();
        expect(nestedPropertyPipe.transform({}, null)).toBeNull();
    });

    describe('for a nested object', () => {
        const item = {
            prop1: 'value1',
            prop2: {
                deepProp1: 'value2',
                deepProp2: {
                    deeperProp: 'value3',
                },
            },
        };
        it('returns correct value for any property of the object', () => {
            expect(nestedPropertyPipe.transform(item, 'prop1')).toEqual('value1');
            expect(nestedPropertyPipe.transform(item, 'prop2.deepProp1')).toEqual('value2');
            expect(nestedPropertyPipe.transform(item, 'prop2.deepProp2.deeperProp')).toEqual('value3');
        });

        it('returns null if a unavailable property is provided', () => {
            expect(nestedPropertyPipe.transform(item, 'prop2.notAvailable')).toEqual(null);
        });
    });
});
