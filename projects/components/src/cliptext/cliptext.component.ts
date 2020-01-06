/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2019 VMware, Inc. All rights reserved.
 */

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ClrIfOpen, ClrTooltipContent } from '@clr/angular';

export enum Position {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
    BEFORE = 'BEFORE',
    AFTER = 'AFTER',
}

/**
 * Use a cliptext component when you need to restrict a displayed text to a certain width but still provide to the user
 * the ability to see the full text if it is clipped along with a hint that clipping has taken place. Accessibility
 * should be taken into account.
 *
 * Example: a datagrid with a cell that contains text that cannot fit in one line. The solution is to wrap the content
 * on multiple lines or show as much text as it can fit in one line, showing ellipses ('...') at the end to denote that
 * there is still more content and on hover over to display the full content.
 *
 * The current implementation is based on clarity tooltip component, where the tooltip is available only
 * if clipping has occurred.
 */
@Component({
    selector: 'vcd-cliptext',
    templateUrl: './cliptext.component.html',
    styleUrls: ['./cliptext.component.scss'],
})
export class CliptextComponent implements AfterViewInit {
    /**
     * Setting the position should be avoided as much as possible and considered ONLY in extremely corner case.
     * Some of the reasons to avoid it are:
     *  - Clarity will introduce smart positioning '[NG] Smart Popover Component #2923'
     *  - Future versions may go with different implementation so position may become irrelevant
     */
    @Input()
    set position(position: Position) {
        switch (position) {
            // Since we use only LTR languages, the mapping is:
            // BEFORE->left, AFTER->right, default->'top-right'
            // If we introduce RTL languages the mapping should be:
            // BEFORE->right, AFTER->left, default->'top-left'
            case Position.TOP:
                this._tooltipPosition = 'top-right';
                break;
            case Position.BOTTOM:
                this._tooltipPosition = 'bottom-right';
                break;
            case Position.BEFORE:
                this._tooltipPosition = 'left';
                break;
            case Position.AFTER:
                this._tooltipPosition = 'right';
                break;
            default:
                this._tooltipPosition = 'top-right';
        }
    }

    /**
     * Same as Clarity tooltip sizes (xs, sm, md, lg) but currently only the default one (md) is used
     */
    get size(): string {
        return this._size;
    }

    private _size = 'md';

    get tooltipPosition(): string {
        return this._tooltipPosition;
    }

    private _tooltipPosition = 'top-right';

    get tooltipText(): string {
        return this._tooltipText;
    }

    private _tooltipText: string;

    @ViewChild('cliptextContainer', { static: true })
    cliptextContainer: ElementRef;

    @ViewChild(ClrIfOpen, { static: true })
    private clrIfOpen: ClrIfOpen;

    @ViewChild(ClrTooltipContent, { static: false })
    set tooltipContent(tooltipContent: ClrTooltipContent) {
        if (!tooltipContent) {
            return;
        }
        if (!this.isOverflowing()) {
            this.clrIfOpen.open = false;
        } else {
            // Check if the tooltip text has changed
            const tooltipText = this.cliptextContainer.nativeElement.textContent;
            if (this._tooltipText !== tooltipText) {
                this._tooltipText = tooltipText;
                // Re-trigger open so that clarity tooltip is positioned correctly
                this.clrIfOpen.open = false;
                this.clrIfOpen.open = true;
                this.changeDetector.detectChanges();
            }
        }
    }

    constructor(private changeDetector: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this._tooltipText = this.cliptextContainer.nativeElement.textContent;
    }

    private isOverflowing(): boolean {
        return isTextOverflowing(this.cliptextContainer.nativeElement);

        // Text overflows when the content element's width is less than its scrollWidth.
        function isTextOverflowing(el: HTMLElement): boolean {
            return Math.ceil(el.getBoundingClientRect().width) < el.scrollWidth;
        }
    }
}
