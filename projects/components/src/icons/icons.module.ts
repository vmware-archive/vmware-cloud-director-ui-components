/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import {
    ClarityIcons,
    loadChartIconSet,
    loadCommerceIconSet,
    loadCoreIconSet,
    loadEssentialIconSet,
    loadMediaIconSet,
    loadMiniIconSet,
    loadSocialIconSet,
    loadTechnologyIconSet,
    loadTextEditIconSet,
    loadTravelIconSet,
} from '@cds/core/icon';

@NgModule({
    imports: [CdsIconModule],
    exports: [CdsIconModule],
})
export class IconsModule {
    constructor() {
        // Add all icons from Clarity
        loadChartIconSet();
        loadCommerceIconSet();
        loadCoreIconSet();
        loadEssentialIconSet();
        loadMediaIconSet();
        loadMiniIconSet();
        loadTechnologyIconSet();
        loadSocialIconSet();
        loadTextEditIconSet();
        loadTravelIconSet();
    }
}
