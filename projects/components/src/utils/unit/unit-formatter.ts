/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { CommonUtil } from '../common-util';
import { Unit } from './unit';

/**
 * UnitFormatter is used to format the value with unitName in localized string
 */
@Injectable()
export class UnitFormatter {
    constructor(private translationService: TranslationService) {}

    /**
     * Converts the value of inputUnit to outPutUnit returns in
     * localized string format `${value} ${outputUnit.unitName}`
     *
     * Ex: format(1000, Unit.MB, Unit.GB, 2) = "1 GB"
     *
     * @param value - value of inputUnit
     * @param inputUnit - unit of value
     * @param outputUnit - unit to which value is converted
     * @param precision - how many digits are shown after decimal
     */
    format(value: number, inputUnit: Unit, outputUnit: Unit, precision?: number): string {
        // TODO response from getOutputValue() needs to be formatted to localized number
        return this.translationService.translate(outputUnit.getValueWithUnitTranslationKey(), [
            CommonUtil.roundTo(inputUnit.getOutputValue(value, outputUnit), precision),
        ]);
    }

    /**
     * Converts the value of inputUnit to best unit out of availableUnits and returns
     * in localized string format `${value} ${outputUnit.unitName}`
     *
     * Ex: bestFormat(1000000, Unit.KB, [Unit.KB, Unit.MB, Unit.GB]) = "1 GB"
     *
     * @param value = value of inputUnit
     * @param inputUnit - unit of value
     * @param availableUnits - list of units from which best unit is calculated
     */
    bestFormat(value: number, inputUnit: Unit, availableUnits: Unit[]): string {
        return this.format(value, inputUnit, inputUnit.findBestUnit(value, availableUnits));
    }
}
