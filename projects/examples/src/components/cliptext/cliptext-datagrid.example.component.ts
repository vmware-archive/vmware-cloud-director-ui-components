/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';

@Component({
    selector: 'vcd-cliptext-datagrid-example',
    styles: [
        `
            clr-datagrid .clip-text-width {
                width: 200px;
            }
        `,
    ],
    template: `
        Resize the column and observe the text in the row where the textclip is used. Hover over the cell to see the
        full text.

        <clr-datagrid>
            <clr-dg-column class="clip-text-width">Text</clr-dg-column>
            <clr-dg-column>Clipping</clr-dg-column>

            <clr-dg-row>
                <clr-dg-cell>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,
                    dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula non.
                    Etiam ac pulvinar odio.
                </clr-dg-cell>
                <clr-dg-cell>
                    No
                </clr-dg-cell>
            </clr-dg-row>

            <clr-dg-row>
                <clr-dg-cell>
                    <vcd-cliptext>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra sem id mauris condimentum,
                        dapibus pretium neque commodo. Pellentesque rhoncus tincidunt libero, eget tempus leo vehicula
                        non. Etiam ac pulvinar odio.
                    </vcd-cliptext>
                </clr-dg-cell>
                <clr-dg-cell>
                    Yes
                </clr-dg-cell>
            </clr-dg-row>
        </clr-datagrid>
    `,
})
export class CliptextDatagridExampleComponent {}
