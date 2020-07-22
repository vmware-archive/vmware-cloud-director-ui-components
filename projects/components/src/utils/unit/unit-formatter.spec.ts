/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { MessageFormatTranslationService } from '@vcd/i18n';
import { Bytes, Hertz, Percent } from './unit';
import { UnitFormatter } from './unit-formatter';

describe('UnitFormatter', () => {
    let unitFormatter: UnitFormatter;

    const translationSet = {
        en: {
            MB: 'MB',
            GB: 'GB',
            MHz: 'MHz',
            GHz: 'GHz',
            '%': '%',
            'vcd.cc.display.percent': '{0} %',
            'vcd.cc.filesize.unit.MB': '{0} MB',
            'vcd.cc.filesize.unit.GB': '{0} GB',
            'vcd.cc.cpu.speed.unit.MHz': '{0} MHz',
            'vcd.cc.cpu.speed.unit.GHz': '{0} GHz',
        },
        fr: {},
    };

    beforeEach(() => {
        const translationService = new MessageFormatTranslationService('en', 'en');
        translationService.registerTranslations(translationSet);
        unitFormatter = new UnitFormatter(translationService);
    });

    afterEach(() => {
        unitFormatter = null;
    });

    describe('Bytes', () => {
        it('display value with units', () => {
            expect(unitFormatter.format(1024, Bytes.MB, Bytes.MB)).toEqual('1024 MB');
            expect(unitFormatter.format(2, Bytes.GB, Bytes.MB)).toEqual('2048 MB');
            expect(unitFormatter.format(2500, Bytes.MB, Bytes.GB)).toEqual('2.44 GB');
            expect(unitFormatter.format(2500, Bytes.MB, Bytes.GB, 3)).toEqual('2.441 GB');
        });

        it('display value with units in best format', () => {
            expect(unitFormatter.bestFormat(1024, Bytes.MB, [Bytes.MB, Bytes.GB])).toEqual('1 GB');
            expect(unitFormatter.bestFormat(2500, Bytes.MB, [Bytes.MB, Bytes.GB])).toEqual('2.44 GB');
            expect(unitFormatter.bestFormat(3000, Bytes.GB, [Bytes.MB, Bytes.GB])).toEqual('3000 GB');
        });
    });

    describe('Hertz', () => {
        it('display value with units', () => {
            expect(unitFormatter.format(5000, Hertz.Mhz, Hertz.Ghz)).toEqual('5 GHz');
            expect(unitFormatter.format(3, Hertz.Ghz, Hertz.Mhz)).toEqual('3000 MHz');
        });

        it('display value with units in best format', () => {
            expect(unitFormatter.bestFormat(2500, Hertz.Mhz, [Hertz.Mhz, Hertz.Ghz])).toEqual('2.5 GHz');
            expect(unitFormatter.bestFormat(2500, Hertz.Ghz, [Hertz.Mhz, Hertz.Ghz])).toEqual('2500 GHz');
        });
    });

    describe('Percent', () => {
        it('display value with units', () => {
            expect(unitFormatter.format(50, Percent.ZERO_TO_100, Percent.ZERO_TO_100)).toEqual('50 %');
            expect(unitFormatter.format(50, Percent.ZERO_TO_100, Percent.ZERO_TO_1)).toEqual('0.5 %');
        });

        it('display value with units in best format', () => {
            expect(unitFormatter.bestFormat(50, Percent.ZERO_TO_100, [Percent.ZERO_TO_1])).toEqual('50 %');
            expect(unitFormatter.bestFormat(0.5, Percent.ZERO_TO_1, [Percent.ZERO_TO_1])).toEqual('50 %');
        });
    });
});
