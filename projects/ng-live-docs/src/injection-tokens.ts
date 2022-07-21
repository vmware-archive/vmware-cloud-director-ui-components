/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { InjectionToken } from '@angular/core';
import { CompodocSchema } from './compodoc/compodoc-schema';
import { StackBlitzInfo } from './interfaces';

/**
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */

/**
 * Token that makes the documentation JSONs available to the following factory function.
 */
export const DOCUMENTATION_DATA = new InjectionToken<CompodocSchema[]>(
    'NgLiveDocsModule.forRoot() CompoDocRetrieverService doc jsons.'
);

/**
 * A token that is used to provide the url where the raw compodoc output is located.
 */
export const COMPODOC_URL = new InjectionToken<string>('COMPODOC_URL');

/**
 * Token that makes Stqckblitz JSON data available to factory functions
 */
export const STACKBLITZ_DATA = new InjectionToken<StackBlitzInfo>(
    'NgLiveDocsModule.forRoot() StackBlitz template JSON data'
);
