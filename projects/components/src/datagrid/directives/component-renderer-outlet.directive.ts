/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import {
    ComponentRenderer,
    ComponentRendererConstructor,
    ComponentRendererSpec,
} from '../interfaces/datagrid-column.interface';

/**
 * Type of the Input given to the {@link ComponentRendererOutletDirective.vcdComponentRendererOutlet}
 */
export interface ComponentRendererType<R, T> {
    /**
     * Contains the constructor of component to be rendered and also the method that gets the configuration required for
     * the component API
     */
    rendererSpec: ComponentRendererSpec<R, T>;

    /**
     * serves as argument for {@link ComponentRenderer.configuration} method
     */
    context: R;
}

/**
 * Component that acts as a host element for dynamic rendering of component constructors.
 * It takes {@link ComponentRendererSpec} as input and also 'context' as input that serves as argument for
 * {@link ComponentRenderer.configuration} method. Attaches the component to be rendered to the view container of host element
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
export class ComponentRendererOutletDirective<R, T> implements OnDestroy {
    private componentRef: ComponentRef<ComponentRenderer<T>>;
    private componentType: ComponentRendererConstructor<T>;

    constructor(private viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

    @Input()
    set vcdComponentRendererOutlet(renderer: ComponentRendererType<R, T>) {
        if (this.componentType !== renderer.rendererSpec.type) {
            // Cache the componentType to avoid redundant detaching and attaching of component to this host
            this.componentType = renderer.rendererSpec.type;
            this.componentRef = this.attachRenderer();
        }
        this.assignValue(renderer.rendererSpec.configGetter, renderer.context);
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
    private assignValue(configGetter: (r: R) => T, context: R): void {
        if (!this.componentRef || !this.componentRef.instance) {
            return;
        }
        this.componentRef.instance.configuration = configGetter(context);
    }

    private detachRenderer(): void {
        this.viewContainerRef.remove();
        this.componentRef = null;
    }

    ngOnDestroy(): void {
        this.viewContainerRef = null;
    }
}
