/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import {
    ActionStyling,
    ContextualActionDropdownDisplayConfig,
    ContextualActionInlineDisplayConfig,
    TextIcon,
} from '../../common/interfaces';
import { DatagridContextualActionPosition } from '../datagrid.component';

/**
 * Makes the featured count as required when action menu is displayed as a dropdown and also adds the position
 * at which the actions have to displayed in a datagrid
 */
interface DatagridContextualActionDropdownDisplayConfig extends ContextualActionDropdownDisplayConfig {
    /**
     * An enum that describes where the contextual buttons should display.
     * If not specified, this defaults to {@link DatagridContextualActionPosition.TOP}
     */
    position?: DatagridContextualActionPosition;
}

/**
 * Makes the featured count as required when action menu is displayed as a inline bar and also adds the position
 * at which the actions have to displayed in a datagrid
 */
interface DatagridContextualActionInlineDisplayConfig extends ContextualActionInlineDisplayConfig {
    /**
     * An enum that describes where the contextual buttons should display.
     * If not specified, this defaults to {@link DatagridContextualActionPosition.TOP}
     */
    position?: DatagridContextualActionPosition;
}

/**
 * Display configuration for actions that are displayed in a datagrid
 */
export interface DatagridActionDisplayConfig {
    /**
     * How the contextual actions list shows up on the screen
     */
    contextual?: DatagridContextualActionDropdownDisplayConfig | DatagridContextualActionInlineDisplayConfig;

    /**
     * How the static actions list shows up on the screen
     */
    staticActionStyling?: ActionStyling;
}

/**
 * To add default values to configs if they are not provided by the caller in the input config
 */
export function getDefaultDatagridActionDisplayConfig(
    cfg: DatagridActionDisplayConfig = {}
): DatagridActionDisplayConfig {
    const defaults = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
            position: DatagridContextualActionPosition.TOP,
        },
        staticActionStyling: ActionStyling.INLINE,
    };
    return {
        contextual: { ...defaults.contextual, ...cfg.contextual },
        staticActionStyling: cfg.staticActionStyling || defaults.staticActionStyling,
    };
}
