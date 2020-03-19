/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { IdGenerator } from './id-generator';

describe('IdGenerator', () => {
    const prefix = 'testStr';
    const idGenerator = new IdGenerator(prefix);
    const id1 = idGenerator.generate();
    const id2 = idGenerator.generate();
    const id3 = idGenerator.generate();
    describe('prefix', () => {
        it('prepends the string given to constructor and a - to ID generated', () => {
            expect(id1.substring(0, prefix.length)).toEqual(prefix);
            expect(id1.charAt(prefix.length)).toEqual('-');
        });
    });

    describe('id getter', () => {
        it('generates unique ID every time it is called', () => {
            expect(id1).toEqual(`${prefix}-0`);
            expect(id2).toEqual(`${prefix}-1`);
            expect(id3).toEqual(`${prefix}-2`);
        });
    });
});
