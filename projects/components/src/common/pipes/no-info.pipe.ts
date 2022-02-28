/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@vcd/i18n';

/*
 * Used to check if a value on the screen is empty. If it's empty, will return
 * the localized "vcd.cc.no.info".
 *
 * Takes a 'translateKey' argument that defaults to 'vcd.cc.no.info'
 * Usage:
 *   string | noInfo : translateKey
 * Examples:
 *   {{ "" |  noInfo }}
 *   returns: "-"
 *
 *   {{ "some text" |  noInfo }}
 *   returns: "some text"
 *
 *   {{ "" |  noInfo : "not.running" }}
 *   returns: "Not Running"
 */
@Pipe({ name: 'noInfo' })
export class NoInfoPipe implements PipeTransform {
    constructor(private translationService: TranslationService) {}

    transform(value: string | number, translateKey = 'vcd.cc.no.info'): string {
        return value ? String(value) : this.translationService.translate(translateKey);
    }
}
