/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { DataExportRequestEvent, ExportColumn } from '@vmw/vcd-ui-components';

@Component({
    selector: 'vcd-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    exportColumns: ExportColumn[] = [
        { fieldName: 'name', displayName: 'Name' },
        { fieldName: 'desc', displayName: 'Description' },
    ];

    dataExporterOpen = false;

    onExportRequest(request: DataExportRequestEvent): void {
        let currentProgress = 0;

        const updateProgress = () => {
            currentProgress += 0.01;
            if (currentProgress < 1) {
                request.updateProgress(currentProgress);
                setTimeout(updateProgress, 50);
            } else {
                request.exportData([
                    { name: 'Jack', desc: 'Tis what tis' },
                    { name: 'Jill', desc: 'Still tis what tis' },
                ]);
            }
        };
        updateProgress();
    }
}
