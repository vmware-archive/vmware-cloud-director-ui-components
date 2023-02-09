/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { IdGenerator } from '../../../utils';
import { AriaActiveDescendantService } from './aria-active-descendant.service';

/**
 * Sets a unique id attribute and marks the element as active descendant with {@link AriaActiveDescendantService}
 */
@Directive({
    selector: '[vcdAriaActiveDescendant]',
})
export class AriaActiveDescendantDirective implements OnInit {
    private readonly uniqueId: string = this.idGenerator.generate();

    @Input('vcdAriaActiveDescendant')
    public set isActive(value: boolean) {
        if (value) {
            this.activedescendantService.selectDescendant(this.uniqueId);
        }
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private activedescendantService: AriaActiveDescendantService,
        private idGenerator: IdGenerator
    ) {}

    ngOnInit() {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'id', this.uniqueId);
    }
}
