/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Bytes, Hertz, Percent, TimePeriod } from './unit';

describe('Unit', () => {
    describe('Bytes', () => {
        it('return the value in output units', () => {
            expect(Bytes.MB.getOutputValue(1024, Bytes.MB)).toEqual(1024);
            expect(Bytes.GB.getOutputValue(2, Bytes.MB)).toEqual(2048);
        });

        it('return best unit name out of pre-sorted available units by multiplier for a value of inputUnit', () => {
            // Best unit is the unit whose convertedValue < 1000
            // AvailableUnits are pre-sorted in ascending order of multiplier
            expect(Bytes.MB.findBestUnit(512, [Bytes.MB, Bytes.GB]).getUnitName()).toEqual('MB');
            expect(Bytes.MB.findBestUnit(2048, [Bytes.MB, Bytes.GB]).getUnitName()).toEqual('GB');
            expect(Bytes.GB.findBestUnit(2, [Bytes.MB, Bytes.GB]).getUnitName()).toEqual('GB');
        });

        it('does not return best unit when available units is not pre-sorted ascending by multiplier', () => {
            // AvailableUnits arrays is not pre-sorted in ascending order of multiplier
            expect(Hertz.Mhz.findBestUnit(2048, [Bytes.MB, Bytes.TB, Bytes.GB]).getUnitName() === 'GB').toBeFalsy();
        });

        it('return the value in base units for a given inputUnit', () => {
            expect(Bytes.MB.getBaseValue(2)).toEqual(2097152);
        });
    });

    describe('Hertz', () => {
        it('return the value in output units', () => {
            expect(Hertz.Mhz.getOutputValue(5000, Hertz.Ghz)).toEqual(5);
            expect(Hertz.Ghz.getOutputValue(5, Hertz.Mhz)).toEqual(5000);
        });

        it('return best unit name out of pre-sorted available units by multiplier for a value of inputUnit', () => {
            // Best unit is the unit whose convertedValue < 1000
            // AvailableUnits array is pre-sorted in ascending order by multiplier
            expect(Hertz.Mhz.findBestUnit(2000, [Hertz.Mhz, Hertz.Ghz]).getUnitName()).toEqual('GHz');
            expect(Hertz.Mhz.findBestUnit(200, [Hertz.Mhz, Hertz.Ghz]).getUnitName()).toEqual('MHz');
            expect(Hertz.Ghz.findBestUnit(2, [Hertz.Mhz, Hertz.Ghz]).getUnitName()).toEqual('GHz');
        });

        it('does not return best unit when available units is not pre-sorted ascending by multiplier', () => {
            // AvailableUnits arrays is not pre-sorted in ascending order of multiplier
            expect(Hertz.Mhz.findBestUnit(2000, [Hertz.Mhz, Hertz.Thz, Hertz.Ghz]).getUnitName() === 'GHz').toBeFalsy();
        });

        it('return the value in base units for a given inputUnit', () => {
            expect(Hertz.Ghz.getBaseValue(2)).toEqual(2000000000);
        });
    });

    describe('Percent', () => {
        it('return the value in output units', () => {
            expect(Percent.ZERO_TO_1.getOutputValue(50, Percent.ZERO_TO_1)).toEqual(50);
            expect(Percent.ZERO_TO_100.getOutputValue(50, Percent.ZERO_TO_1)).toEqual(0.5);
            expect(Percent.ZERO_TO_100.getOutputValue(50, Percent.ZERO_TO_100)).toEqual(50);
        });

        it('return best unit name', () => {
            // For Percent ZERO_TO_100 is always the best unit
            expect(Percent.ZERO_TO_1.findBestUnit(50, [Percent.ZERO_TO_1])).toEqual(Percent.ZERO_TO_100);
            expect(Percent.ZERO_TO_1.findBestUnit(50, [Percent.ZERO_TO_100])).toEqual(Percent.ZERO_TO_100);
        });
    });

    describe('Time Period', () => {
        it('returns the value in the provided output units', () => {
            expect(TimePeriod.HOURS.getOutputValue(1, TimePeriod.HOURS)).toEqual(1);
            expect(TimePeriod.DAYS.getOutputValue(2, TimePeriod.HOURS)).toEqual(48);
            expect(TimePeriod.DAYS.getOutputValue(14, TimePeriod.WEEKS)).toEqual(2);
            expect(TimePeriod.MONTHS.getOutputValue(14, TimePeriod.YEARS)).toEqual(1);
        });

        it('returns best available unit name', () => {
            expect(TimePeriod.HOURS.findBestUnit(23, [TimePeriod.HOURS, TimePeriod.DAYS]).getUnitName()).toEqual(
                TimePeriod.HOURS.getUnitName()
            );

            expect(TimePeriod.HOURS.findBestUnit(72, [TimePeriod.HOURS, TimePeriod.DAYS]).getUnitName()).toEqual(
                TimePeriod.DAYS.getUnitName()
            );

            expect(
                TimePeriod.HOURS.findBestUnit(169, [TimePeriod.HOURS, TimePeriod.DAYS, TimePeriod.WEEKS]).getUnitName()
            ).toEqual(TimePeriod.WEEKS.getUnitName());

            expect(
                TimePeriod.DAYS.findBestUnit(68, [
                    TimePeriod.HOURS,
                    TimePeriod.DAYS,
                    TimePeriod.WEEKS,
                    TimePeriod.MONTHS,
                ]).getUnitName()
            ).toEqual(TimePeriod.MONTHS.getUnitName());

            expect(
                TimePeriod.MONTHS.findBestUnit(16, [
                    TimePeriod.HOURS,
                    TimePeriod.DAYS,
                    TimePeriod.WEEKS,
                    TimePeriod.MONTHS,
                    TimePeriod.YEARS,
                ]).getUnitName()
            ).toEqual(TimePeriod.YEARS.getUnitName());
        });

        it('returns base value', () => {
            expect(TimePeriod.HOURS.getBaseValue(2)).toEqual(2 * 3600);
        });
    });
});
