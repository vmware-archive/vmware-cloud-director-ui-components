/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

export enum TooltipPosition {
    tl = 'tooltip-top-left',
    tr = 'tooltip-top-right',
    br = 'tooltip-bottom-right',
    bl = 'tooltip-bottom-left',
}

export enum TooltipSize {
    sm = '100px',
    md = '200px',
    lg = '400px',
}

/**
 * The configuration information for the cliptext within the cells of the datagrid.
 */
export interface CliptextConfig {
    /**
     * The size of the tooltip to be displayed in the cell.
     */
    size?: TooltipSize;
    /**
     * The time delay from mouse off to hide the cliptext.
     */
    mouseoutDelay?: number;
    /**
     * If the cliptext should be disabled.
     */
    disabled?: boolean;
}

/**
 * Singleton tooltip created by directive
 */
const tip = {
    /** A single DOM node structure for the popup is created and shared with all instances (the .tooltip)  */
    container: null as HTMLElement,

    /** The inner node (the .tooltip-content) */
    content: null as HTMLElement,

    /** Timer for setTimeout used when hiding */
    hideTimeout: null as number,

    /** The directive that last caused the tooltip to be displayed */
    currentDirective: null as ShowClippedTextDirective,

    /** Whether the mouse is currently over a host or the tooltip */
    isMouseOver: false,

    /**
     * The host element that last caused the tooltip to be displayed
     */
    get currentHost(): HTMLElement {
        return tip.currentDirective.hostElement;
    },

    /**
     * The tooltip size requested for the last directive that caused the tooltip to be displayed
     */
    get tooltipSize(): TooltipSize {
        return tip.currentDirective.tooltipSize;
    },

    /**
     * How long to wait before hiding the tooltip after a mouseout. This gives the user a chance to hover over the
     * tooltip so they can copy/paste its contents
     */
    get mouseoutDelay(): number {
        return tip.currentDirective.mouseoutDelay;
    },

    create(): void {
        if (tip.container) {
            return;
        }
        tip.container = document.createElement('div');
        tip.container.classList.add('tooltip', 'vcd-show-clipped-text');
        tip.content = document.createElement('div');
        tip.content.classList.add('tooltip-content');
        setStyle(tip.container, {
            position: 'absolute',
            zIndex: '1000',
            opacity: '0',
        });
        tip.container.appendChild(tip.content);
        document.body.appendChild(tip.container);
        watchEvents(tip.container, tip.onMouseEnter, tip.onMouseLeave);
        tip.content.addEventListener('transitionend', tip.onTransitionEnd);
    },

    destroy(): void {
        document.body.removeChild(tip.container);
        unwatchEvents(tip.container, tip.onMouseEnter, tip.onMouseLeave);
        tip.content.removeEventListener('transitionend', this.onTransitionEnd);
        tip.container = null;
        tip.content = null;
    },

    onMouseEnter(): void {
        tip.clearHideTimeout();
    },

    onMouseLeave(): void {
        tip.hideTooltip(tip.mouseoutDelay);
    },

    hideTooltip(delay: number): void {
        tip.clearHideTimeout();
        tip.hideTimeout = window.setTimeout(() => {
            tip.isMouseOver = false;
            tip.container.style.opacity = '0';
            tip.content.style.opacity = '0';
            tip.hideTimeout = null;
            tip.currentDirective = null;
        }, delay);
    },

    clearHideTimeout(): void {
        if (tip.hideTimeout) {
            clearTimeout(tip.hideTimeout);
            tip.hideTimeout = null;
        }
    },

    onTransitionEnd(e: Event): void {
        if (tip.container.style.opacity === '0') {
            tip.container.style.visibility = 'hidden';
            tip.content.style.visibility = 'hidden';
        }
    },

    /**
     * Update the tooltip based on the content/dimensions of {@link tip.currentDirective}
     */
    update(): void {
        const el = tip.currentHost;
        const rect = el.getBoundingClientRect();
        setStyle(tip.container, {
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            opacity: '1',
            wordBreak: 'break-all',
        });
        setStyle(tip.content, {
            visibility: 'visible',
            opacity: '1',
            width: this.tooltipSize,
        });
        const { tl, tr, bl, br } = TooltipPosition;
        tip.content.classList.remove(tl, tr, bl, br);
        tip.content.classList.add(tip.calculatePosition(rect));
        tip.content.innerHTML = el.innerHTML;
    },

    /**
     *  Tooltip direction should be the opposite quadrant of where the center of the clipped element is
     *     TL -> BR        TR -> BL
     *     BL -> TR        BR -> TL
     * @param rect THe dimensions of the clipped element
     */
    calculatePosition(rect: ClientRect): TooltipPosition {
        const { innerWidth, innerHeight } = window;
        const rectCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

        // It's on the right
        if (rectCenter.x > innerWidth / 2) {
            if (rectCenter.y > innerHeight / 2) {
                // Bottom right quad
                return TooltipPosition.tl;
            } else {
                // Top right quad
                return TooltipPosition.bl;
            }
        }

        // It's on the left
        if (rectCenter.y > innerHeight / 2) {
            // Bottom left quad
            return TooltipPosition.tr;
        } else {
            // Top left quad
            return TooltipPosition.br;
        }
    },
};

type EventHandler = (e: MouseEvent) => void;

function watchEvents(el: HTMLElement, mouseIn: EventHandler, mouseOut: EventHandler): void {
    el.addEventListener('mouseenter', mouseIn);
    el.addEventListener('mouseleave', mouseOut);
}

function unwatchEvents(el: HTMLElement, mouseIn: EventHandler, mouseOut: EventHandler): void {
    el.removeEventListener('mouseenter', mouseIn);
    el.removeEventListener('mouseleave', mouseOut);
}

function setStyle(el: HTMLElement, style: Partial<CSSStyleDeclaration>): void {
    Object.assign(el.style, style);
}

/**
 * Displays a clarity tooltip with the full contents of a host element on hover but only if
 * the elements is clipped.
 */
@Directive({
    selector: '[vcdShowClippedText]',
})
export class ShowClippedTextDirective implements OnDestroy, OnInit {
    /** To destroy the tooltip when no longer needed */
    static instanceCount = 0;

    @Input('vcdShowClippedText')
    set config(config: CliptextConfig) {
        if (config && config.mouseoutDelay) {
            this.mouseoutDelay = config.mouseoutDelay;
        }
        if (config && config.size) {
            this.tooltipSize = config.size;
        }
        const nextDisabled = config !== undefined && config.disabled;
        if (this.disabled === nextDisabled) {
            return;
        }
        this.disabled = nextDisabled;
        if (this.disabled) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    mouseoutDelay = 500;
    tooltipSize = TooltipSize.md;
    disabled = false;

    /**
     * The HTML element receiving the directive
     */
    public hostElement: HTMLElement = this.host.nativeElement;

    /**
     * Be notified whenever the host element changes content or its CSS style
     */
    private mutationObserver = new MutationObserver(() => {
        // Make sure isMouseOver is first. It's an optimization to avoid measuring the DOM
        // Also don't update the tooltip if content changes but the mouse is over a different host
        if (tip.isMouseOver && this.hostElement === tip.currentHost) {
            if (this.isOverflowing()) {
                tip.update();
            } else {
                tip.hideTooltip(this.mouseoutDelay);
            }
        }
    });

    constructor(private host: ElementRef) {}

    ngOnInit(): void {
        if (!this.disabled) {
            this.activate();
        }
    }

    activate(): void {
        ShowClippedTextDirective.instanceCount++;
        tip.create();
        watchEvents(this.hostElement, this.onMouseIn, this.onMouseOut);
        this.mutationObserver.observe(this.hostElement, {
            attributeFilter: ['style'],
            childList: true,
            subtree: true,
            characterData: true,
        });

        // A host must have the following styles to show text ellipsis when overflowing
        setStyle(this.hostElement, {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        });
    }

    ngOnDestroy(): void {
        if (!this.disabled) {
            this.deactivate();
        }
    }

    deactivate(): void {
        ShowClippedTextDirective.instanceCount--;
        unwatchEvents(this.hostElement, this.onMouseIn, this.onMouseOut);
        this.mutationObserver.disconnect();
        if (ShowClippedTextDirective.instanceCount === 0) {
            tip.destroy();
        }
    }

    private onMouseIn = (e: MouseEvent) => {
        tip.clearHideTimeout();
        tip.isMouseOver = true;
        if (this.isOverflowing()) {
            tip.currentDirective = this;
            tip.update();
        } else {
            tip.hideTooltip(this.mouseoutDelay);
        }
    };

    private onMouseOut = () => {
        tip.hideTooltip(this.mouseoutDelay);
    };

    private isOverflowing(): boolean {
        // Text overflows when the content element's width is less than its scrollWidth.
        return Math.ceil(this.hostElement.getBoundingClientRect().width) < this.hostElement.scrollWidth;
    }
}
