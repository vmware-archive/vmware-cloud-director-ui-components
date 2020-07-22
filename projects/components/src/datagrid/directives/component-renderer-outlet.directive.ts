/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import {
    ComponentRenderer,
    ComponentRendererConstructor,
    ComponentRendererSpec,
} from '../interfaces/component-renderer.interface';

/**
 * Component that acts as a host element for dynamic rendering of component constructors.
 * It takes {@link ComponentRendererSpec} and also 'context' as input in case of a {@link ColumnRendererSpec} that serves as argument for
 * {@link ColumnRendererSpec.config} method. Attaches the component to be rendered to the view container of host element
 * and updates it's configuration whenever changed.
 *
 * Example usage:
 * <ng-template
 *      [vcdComponentRendererOutlet]="{ rendererSpec: column.fieldColumnRendererSpec, context: restItem }"
 * ></ng-template>
 *
 */
@Directive({
    selector: '[vcdComponentRendererOutlet]',
})
export class ComponentRendererOutletDirective<R, T> {
    private componentRef: ComponentRef<ComponentRenderer<T>>;
    private componentType: ComponentRendererConstructor<T>;

    constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

    /**
     * Sets the component that this outlet should render. Where rendererSpec is the
     * {@link ComponentRendererSpec} that details how to render the component and context
     * is any information that the component needs to render.
     */
    @Input()
    set vcdComponentRendererOutlet(renderer: { rendererSpec: ComponentRendererSpec<T>; context?: R }) {
        if (this.componentType !== renderer.rendererSpec.type) {
            // Cache the componentType to avoid redundant detaching and attaching of component to this host
            this.componentType = renderer.rendererSpec.type;
            this.componentRef = this.attachRenderer();
        }
        this.assignValue(renderer.rendererSpec.config, renderer.context);
    }

    /**
     * Attaches the passed component type to the view of this directive host
     */
    private attachRenderer(): ComponentRef<ComponentRenderer<T>> {
        if (this.componentRef) {
            this.detachRenderer();
        }
        const componentFactory = this.cfr.resolveComponentFactory(this.componentType);
        return this.viewContainerRef.createComponent(componentFactory);
    }

    /**
     * Updates the configuration of instantiated component
     */
    private assignValue(config: ((r: R) => T) | T, context: R): void {
        if (!this.componentRef || !this.componentRef.instance) {
            return;
        }
        this.componentRef.instance.config = config instanceof Function ? config(context) : config;
    }

    private detachRenderer(): void {
        this.viewContainerRef.remove();
        this.componentRef = null;
    }
}
