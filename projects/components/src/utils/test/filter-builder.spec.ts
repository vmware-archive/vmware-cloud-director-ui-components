/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { FilterBuilder } from '../filter-builder';

describe('FilterBuilder', () => {
    let filter: FilterBuilder;

    beforeEach(() => {
        filter = new FilterBuilder();
    });
    afterEach(() => (filter = null));

    it('Returns an empty string if no condition is used', () => {
        expect(filter.getString()).toBe('');
    });
    it('clears the filter once the string has been retrieved', () => {
        filter
            .is('id')
            .equalTo(2)
            .getString();

        expect(filter.getString()).toBe('');
    });
    it('Applies the AND operator to multiple conditions', () => {
        const query = filter
            .is('id')
            .equalTo(2)
            .and()
            .is('name')
            .equalTo('some-name')
            .and()
            .is('age')
            .equalTo(32)
            .getString();

        expect(query).toBe('id==2;name==some-name;age==32');
    });
    it('Applies the OR operator to multiple conditions', () => {
        const query = filter
            .is('id')
            .equalTo(2)
            .or()
            .is('name')
            .equalTo('some-name')
            .or()
            .is('age')
            .equalTo(32)
            .getString();

        expect(query).toBe('id==2,name==some-name,age==32');
    });
    it('chains multiple conditions as required', () => {
        const query = filter
            .all(filter.is('id').equalTo(2), filter.is('name').equalTo('some-name'), filter.is('age').equalTo(32))
            .getString();

        expect(query).toBe('id==2;name==some-name;age==32');
    });
    it('chains multiple conditions as optional', () => {
        const query = filter
            .any(
                filter
                    .is('id')
                    .equalTo(2)
                    .and()
                    .is('age')
                    .greaterThan(32),
                filter.is('name').equalTo('some-name'),
                filter.is('age').equalTo(32)
            )
            .getString();

        expect(query).toBe('id==2;age=gt=32,name==some-name,age==32');
    });
    it('nests conditions', () => {
        const query = filter
            .is('color')
            .equalTo('blue')
            .and()
            .or(
                filter
                    .is('name')
                    .equalTo('other-name')
                    .and()
                    .is('age')
                    .equalTo(32),
                filter
                    .is('name')
                    .equalTo('some-name')
                    .and()
                    .is('age')
                    .equalTo(33)
            )
            .getString();
        expect(query).toBe('color==blue;(name==other-name;age==32,name==some-name;age==33)');
    });
    it('combines different filters', () => {
        const query = filter
            .is('color')
            .equalTo('blue')
            .and()
            .or(
                new FilterBuilder()
                    .is('name')
                    .equalTo('other-name')
                    .and()
                    .is('age')
                    .equalTo(32),
                new FilterBuilder()
                    .is('name')
                    .equalTo('some-name')
                    .and()
                    .is('age')
                    .equalTo(33)
            )
            .getString();
        expect(query).toBe('color==blue;(name==other-name;age==32,name==some-name;age==33)');
    });
    describe('Comparision operators', () => {
        describe('EQ', () => {
            it('checks for equality on strings', () => {
                expect(
                    filter
                        .is('name')
                        .equalTo('some-name')
                        .getString()
                ).toBe('name==some-name');
            });
            it('checks for equality on numbers', () => {
                expect(
                    filter
                        .is('age')
                        .equalTo(32)
                        .getString()
                ).toBe('age==32');
            });
            it('checks for equality on booleans', () => {
                expect(
                    filter
                        .is('enable')
                        .equalTo(true)
                        .getString()
                ).toBe('enable==true');
            });
            it('checks for equality when multiple values are passed', () => {
                expect(
                    filter
                        .is('name')
                        .equalTo('some-name', 'another-name', 'yet-another-name')
                        .getString()
                ).toBe('name==some-name,name==another-name,name==yet-another-name');
            });
        });

        describe('NEQ', () => {
            it('checks for inequality on strings', () => {
                expect(
                    filter
                        .is('name')
                        .notEqualTo('some-name')
                        .getString()
                ).toBe('name!=some-name');
            });
            it('checks for inequality on numbers', () => {
                expect(
                    filter
                        .is('age')
                        .notEqualTo(32)
                        .getString()
                ).toBe('age!=32');
            });
            it('checks for inequality on booleans', () => {
                expect(
                    filter
                        .is('enable')
                        .notEqualTo(true)
                        .getString()
                ).toBe('enable!=true');
            });
            it('checks for inequality when multiple values are passed', () => {
                expect(
                    filter
                        .is('name')
                        .notEqualTo('some-name', 'another-name', 'yet-another-name')
                        .getString()
                ).toBe('name!=some-name,name!=another-name,name!=yet-another-name');
            });
        });

        describe('GT', () => {
            it('compares over a single value', () => {
                expect(
                    filter
                        .is('age')
                        .greaterThan(32)
                        .getString()
                ).toBe('age=gt=32');
            });
        });

        describe('GE', () => {
            it('compares over a single value', () => {
                expect(
                    filter
                        .is('age')
                        .greaterThanOrEqualTo(32)
                        .getString()
                ).toBe('age=ge=32');
            });
        });

        describe('LT', () => {
            it('compares over a single value', () => {
                expect(
                    filter
                        .is('age')
                        .lessThan(32)
                        .getString()
                ).toBe('age=lt=32');
            });
        });

        describe('LE', () => {
            it('compares over a single value', () => {
                expect(
                    filter
                        .is('age')
                        .lessThanOrEqualTo(32)
                        .getString()
                ).toBe('age=le=32');
            });
        });
    });
});
