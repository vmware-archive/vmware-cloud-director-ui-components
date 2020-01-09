/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import { HighlightService } from '../highlight.service';

@Injectable()
export class PrismHighlightService extends HighlightService {
    highlightTypescript(code: string): string {
        return this.highlight(code, Prism.languages.typescript);
    }
    highlightHtml(code: string): string {
        return this.highlight(code, Prism.languages.html);
    }
    highlightScss(code: string): string {
        return this.highlight(code, Prism.languages.scss);
    }

    private highlight(code: string, lang): string {
        return Prism.highlight(code || '', lang);
    }
}
