/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DropdownComponent } from './dropdown.component';

interface HasDropdownComponent {
    dropdown: DropdownComponent<any>;
}

describe('DropdownComponent', () => {
    describe('shouldRenderAsSeparator', () => {
        beforeEach(function (this: HasDropdownComponent): void {
            this.dropdown = new DropdownComponent(null);
        });
        it('returns false when separator is the first item in the list', function (this: HasDropdownComponent): void {
            this.dropdown.items = [
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
            ];
            expect(this.dropdown.shouldRenderAsSeparator(0, this.dropdown.items[0])).toEqual(false);
        });
        it(
            'returns true only when the current item is a separator and the next item is not' + ' a separator',
            function (this: HasDropdownComponent): void {
                const separatorItemIndices = {
                    one: 1,
                    three: 3,
                    four: 4,
                };
                this.dropdown.items = [
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                ];
                expect(this.dropdown.shouldRenderAsSeparator(0, this.dropdown.items[0])).toEqual(false);
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.one,
                        this.dropdown.items[separatorItemIndices.one]
                    )
                ).toEqual(true);
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.three,
                        this.dropdown.items[separatorItemIndices.three]
                    )
                ).toEqual(false);
            }
        );
        it(
            'irrespective of number of adjacent separators, it returns false for all the separators that do not have a dropdown item ' +
                'next to them',
            function (this: HasDropdownComponent): void {
                const separatorItemIndices = {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                };
                this.dropdown.items = [
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                ];
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.one,
                        this.dropdown.items[separatorItemIndices.one]
                    )
                ).toEqual(false);
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.two,
                        this.dropdown.items[separatorItemIndices.two]
                    )
                ).toEqual(false);
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.three,
                        this.dropdown.items[separatorItemIndices.three]
                    )
                ).toEqual(false);
                expect(
                    this.dropdown.shouldRenderAsSeparator(
                        separatorItemIndices.four,
                        this.dropdown.items[separatorItemIndices.four]
                    )
                ).toEqual(true);
            }
        );
        it('returns false when separator is the last item in the list', function (this: HasDropdownComponent): void {
            this.dropdown.items = [
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
            ];
            const lastItemIndex = this.dropdown.items.length - 1;
            expect(this.dropdown.shouldRenderAsSeparator(lastItemIndex, this.dropdown.items[lastItemIndex])).toEqual(
                false
            );
        });
    });
});
