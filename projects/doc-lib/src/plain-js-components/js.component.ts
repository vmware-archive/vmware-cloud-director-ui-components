/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Basic functionality so plain JS components can be rendered and destroyed in a structured manner
 */
export class JsComponent {
    protected el: HTMLElement = null;

    /**
     * Adds the component into the tree and sets up event handlers
     * @param el Where to render the component
     */
    render(el: HTMLElement): void {
        this.el = el;
        this.onRender();
    }

    /**
     * Override this to add elements to {@link el} which is guaranteed to have been set
     */
    protected onRender(): void {}

    /**
     * Clears any nodes added in render()
     */
    destroy(): void {
        this.onBeforeDestroy();
        this.el.innerHTML = '';
    }

    /**
     * Override this to remove handlers from the DOM before the children of the element are cleared (and the reference to {@link el}
     */
    protected onBeforeDestroy(): void {}

    /**
     * Search the element itself and its ancestors looking for an element that matches the given selector
     * The search stops at the root element.
     *
     * This is useful for finding the target of delegated events
     *
     * @param elem Element to start search from.
     * @param selector Selector that returned element should match
     * @param parent If traversing the parents of the given element reaches this element,
     * the search will stop and null will be returned
     * @return The matching element or null
     */
    findClosestParent(elem: Node, selector: string, parent: Node = this.el): HTMLElement {
        // Get closest match
        while (elem && elem !== parent) {
            if ((elem as HTMLElement).matches(selector)) {
                return elem as HTMLElement;
            }
            elem = elem.parentNode;
        }
        return null;
    }
}
