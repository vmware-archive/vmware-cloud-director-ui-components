/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Observable } from 'rxjs';

// This file contains miscellaneous type definitions that are provided by another library
// but are important to link to in the documentation.
// This is because of a limitation in Compodoc in linking to assets provided by another library.

/**
 * The result of a call to either {@link TranslationService.translate} or {@link TranslationService.translateAsync}.
 * A duplicate of the @vcd/i18n LazyString.
 */
export type LazyString = string | Observable<string> | Promise<string>;
