/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class HighlightService {
    public abstract highlightTypescript(code: string): string;
    public abstract highlightHtml(code: string): string;
    public abstract highlightScss(code: string): string;
}
