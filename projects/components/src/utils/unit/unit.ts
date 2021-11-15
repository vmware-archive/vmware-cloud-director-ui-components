/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonUtil } from '../common-util';

/**
 * Allows you to define different types of units with unitName and
 * multiplier that converts to baseUnit.
 */
export abstract class Unit {
    private readonly _multiplier: number;
    private readonly _unitName: string;

    /**
     * @param multiplier - Value that is used to convert this to base unit
     * @param unitName - Name of the Unit. Also used to construct translation
     * keys for each type of Unit.
     */
    constructor(private multiplier: number, private unitName: string) {
        this._multiplier = multiplier;
        this._unitName = unitName;
    }

    public getMultiplier(): number {
        return this._multiplier;
    }

    public getUnitName(): string {
        return this._unitName;
    }

    /**
     * Returns the value in outputUnit for this unit
     * @param value - Value of this unit
     * @param outputUnit - Unit to which value is converted
     */
    public getOutputValue(value, outputUnit: Unit): number {
        return this.getBaseValue(value) / outputUnit.multiplier;
    }

    /**
     * Returns the value in base unit for this unit
     * @param value - Value of this unit
     */
    public getBaseValue(value: number): number {
        return value * this.multiplier;
    }

    /**
     * Translation key to be used when displaying value with unit
     *
     * Ex: 25 MB, 100 %, 2 GHz
     */
    abstract getValueWithUnitTranslationKey(): string;

    /**
     * Translation key to be used when displaying unitName
     *
     * Ex: MB, B, GHz, MHz, %
     */
    abstract getUnitNameTranslationKey(): string;

    /**
     * Returns the best unit out of available units for given value of current unit
     *
     * Best unit is a Unit whose converted value is less than 1000
     *
     * @param value - Value of this unit
     * @param availableUnits - List of available Units out of which best unit is calculated
     */
    abstract findBestUnit(value: number, availableUnits: Unit[]): Unit;
}

/**
 * Finds the bestUnit by trying groups of the comparison number
 */
abstract class NumberUnit extends Unit {
    /**
     * Calculates the best unit out of available units to display in UI cell for a given input Unit
     * and value
     *
     * Best unit is a Unit whose converted value is less than the comparison number
     *
     * @param value - Value of input Unit
     * @param availableUnits - Array of available Units to display in UI cell
     * availableUnits array should be pre-sorted ascending by multiplier
     *
     */
    findBestUnit(value: number, availableUnits: NumberUnit[] = this.getAllUnitTypes()): Unit {
        if (value >= this.getUnitMultiplier()) {
            const baseValue = this.getBaseValue(value);
            let outputNumber = baseValue;
            const unitTypes = availableUnits;
            let i = 0;
            while (outputNumber >= this.getUnitMultiplier() && i < unitTypes.length) {
                outputNumber = baseValue / unitTypes[i].getMultiplier();
                i++;
            }
            return unitTypes[i - 1];
        } else {
            return this;
        }
    }

    abstract getAllUnitTypes(): NumberUnit[];

    /**
     * Returns the number that you multiply by to get the next order unit.
     *
     * @example 1024 would be the multiplier for Byte.
     */
    protected abstract getUnitMultiplier(): number;
}

/**
 * Finds the bestUnit by trying groups of 1000
 */
export abstract class ThousandsUnit extends NumberUnit {
    getUnitMultiplier(): number {
        return 1000;
    }
}

/**
 * Finds the bestUnit by trying groups of 1024
 */
export abstract class PowerTwoUnit extends NumberUnit {
    getUnitMultiplier(): number {
        return 1024;
    }
}

export class Hertz extends ThousandsUnit {
    static valueWithUnitTranslationKeyPrefix = 'vcd.cc.cpu.speed.unit.';
    static unitNameTranslationKeyPrefix = 'vcd.cc.units.hertz.';
    static Hz = new Hertz(1, 'Hz');
    static Khz = new Hertz(1e3, 'KHz');
    static Mhz = new Hertz(1e6, 'MHz');
    static Ghz = new Hertz(1e9, 'GHz');
    static Thz = new Hertz(1e12, 'THz');
    static types = [Hertz.Hz, Hertz.Khz, Hertz.Mhz, Hertz.Ghz];

    getAllUnitTypes(): Hertz[] {
        return Hertz.types;
    }

    getValueWithUnitTranslationKey(): string {
        return Hertz.valueWithUnitTranslationKeyPrefix + this.getUnitName();
    }

    getUnitNameTranslationKey(): string {
        return Hertz.unitNameTranslationKeyPrefix + this.getUnitName();
    }
}

export class Bytes extends PowerTwoUnit {
    static valueWithUnitTranslationKeyPrefix = 'vcd.cc.filesize.unit.';
    static unitNameTranslationKeyPrefix = 'vcd.cc.units.bytes.';
    static B = new Bytes(1, 'B');
    static KB = new Bytes(1024, 'KB');
    static MB = new Bytes(1024 ** 2, 'MB');
    static GB = new Bytes(1024 ** 3, 'GB');
    static TB = new Bytes(1024 ** 4, 'TB');
    static types = [Bytes.B, Bytes.KB, Bytes.MB, Bytes.GB];

    getAllUnitTypes(): Bytes[] {
        return Bytes.types;
    }

    getValueWithUnitTranslationKey(): string {
        return Bytes.valueWithUnitTranslationKeyPrefix + this.getUnitName();
    }

    getUnitNameTranslationKey(): string {
        return Bytes.unitNameTranslationKeyPrefix + this.getUnitName();
    }
}

/**
 * Percent is handled differently compared to other Units.
 * Can be represented in two different formats -
 * {@link ZERO_TO_100} - ex: 50 %
 * {@link ZERO_TO_1} - ex: 0.5 %
 * In both formats single unitName - "%" is used represent the value
 */
export class Percent extends Unit {
    static valueWithUnitTranslationKey = 'vcd.cc.display.percent';
    static unitTranslationKey = 'vcd.cc.units.percent';
    static ZERO_TO_1 = new Percent(1);
    static ZERO_TO_100 = new Percent(0.01);

    /**
     * Percent always has unitName as "%"
     */
    constructor(multiplier: number) {
        super(multiplier, '%');
    }

    getValueWithUnitTranslationKey(): string {
        return Percent.valueWithUnitTranslationKey;
    }

    getUnitNameTranslationKey(): string {
        return Percent.unitTranslationKey;
    }

    /**
     * Percent is always best represented in ZERO_TO_100 format
     * and so returns {@link ZERO_TO_100}
     *
     * Ex: 50 % is the display format for ZERO_TO_100 for value - 50
     */
    findBestUnit(value: number, unitList: Unit[]): Unit {
        return Percent.ZERO_TO_100;
    }
}

const SECONDS_IN_MINUTE: number = 60;
const MINUTES_IN_HOUR: number = 60;
const SECONDS_IN_HOUR: number = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
const HOURS_IN_DAY: number = 24;
const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH_ROUNDED = 30;
const DAYS_IN_YEAR_ROUNDED = 365;
const WEEKS_IN_MONTH_ROUNDED = 4;
const MONTHS_IN_YEAR = 12;
const YEARS_IN_CENTURY = 100;

/**
 * Represents a period of time.
 * The base value is in seconds.
 */
export class TimePeriod extends Unit {
    // The base unit is seconds
    static SECONDS = new TimePeriod(1, 'SECONDS', SECONDS_IN_MINUTE);
    static MINUTES = new TimePeriod(SECONDS_IN_MINUTE, 'MINUTES', MINUTES_IN_HOUR);
    static HOURS = new TimePeriod(SECONDS_IN_HOUR, 'HOURS', HOURS_IN_DAY);
    static DAYS = new TimePeriod(SECONDS_IN_DAY, 'DAYS', DAYS_IN_WEEK);
    // NOTE: rough calculation is used for the units below.
    static WEEKS = new TimePeriod(SECONDS_IN_DAY * DAYS_IN_WEEK, 'WEEKS', WEEKS_IN_MONTH_ROUNDED);
    static MONTHS = new TimePeriod(SECONDS_IN_DAY * DAYS_IN_MONTH_ROUNDED, 'MONTHS', MONTHS_IN_YEAR);
    static YEARS = new TimePeriod(SECONDS_IN_DAY * DAYS_IN_YEAR_ROUNDED, 'YEARS', YEARS_IN_CENTURY);

    static types = [
        TimePeriod.SECONDS,
        TimePeriod.MINUTES,
        TimePeriod.HOURS,
        TimePeriod.DAYS,
        TimePeriod.WEEKS,
        TimePeriod.MONTHS,
        TimePeriod.YEARS,
    ];

    static unitNameTranslationKeyPrefix = 'vcd.cc.units.timePeriod.';
    static valueWithUnitTranslationKeyPrefix = 'vcd.cc.display.timePeriod.';

    /**
     * The threshold value above which the next unit in the list is a better match to be used.
     */
    threshold: number;

    constructor(multiplier: number, unitName: string, threshold: number) {
        super(multiplier, unitName);

        this.threshold = threshold;
    }

    getAllUnitTypes(): TimePeriod[] {
        return TimePeriod.types;
    }

    getOutputValue(value: number, outputUnit: Unit): number {
        const outputValue = super.getOutputValue(value, outputUnit);

        return CommonUtil.roundTo(outputValue, 0);
    }

    getValueWithUnitTranslationKey(): string {
        return TimePeriod.valueWithUnitTranslationKeyPrefix + this.getUnitName();
    }

    findBestUnit(value: number, availableUnits: TimePeriod[] = this.getAllUnitTypes()): Unit {
        const baseValue = this.getBaseValue(value);

        const bestMatchPeriod = availableUnits.find(
            (unit: TimePeriod, index: number) =>
                baseValue / unit.getMultiplier() < unit.threshold || index === availableUnits.length - 1
        );

        return bestMatchPeriod;
    }

    getUnitNameTranslationKey(): string {
        return TimePeriod.unitNameTranslationKeyPrefix + this.getUnitName();
    }
}
