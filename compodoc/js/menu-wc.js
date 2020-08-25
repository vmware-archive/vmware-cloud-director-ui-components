'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">vmware-cloud-director-ui-components documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/DropdownModule.html" data-type="entity-link">DropdownModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' : 'data-target="#xs-components-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' :
                                            'id="xs-components-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' }>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' : 'data-target="#xs-directives-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' :
                                        'id="xs-directives-links-module-DropdownModule-713142b2e66c028d47313d78b9ee0fa1"' }>
                                        <li class="link">
                                            <a href="directives/DynamicDropdownPositionDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DynamicDropdownPositionDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PipesModule-1bbae1460338059214584c74735192ef"' : 'data-target="#xs-components-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PipesModule-1bbae1460338059214584c74735192ef"' :
                                            'id="xs-components-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                            <li class="link">
                                                <a href="components/FormCheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberWithUnitFormInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberWithUnitFormInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-PipesModule-1bbae1460338059214584c74735192ef"' : 'data-target="#xs-directives-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-PipesModule-1bbae1460338059214584c74735192ef"' :
                                        'id="xs-directives-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                        <li class="link">
                                            <a href="directives/MinMaxValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinMaxValidator</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-1bbae1460338059214584c74735192ef"' : 'data-target="#xs-pipes-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-1bbae1460338059214584c74735192ef"' :
                                            'id="xs-pipes-links-module-PipesModule-1bbae1460338059214584c74735192ef"' }>
                                            <li class="link">
                                                <a href="pipes/NestedPropertyPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NestedPropertyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShowClippedTextDirectiveModule.html" data-type="entity-link">ShowClippedTextDirectiveModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-ShowClippedTextDirectiveModule-a23688a2c3d2ecc1478cdf58eb36d4ff"' : 'data-target="#xs-directives-links-module-ShowClippedTextDirectiveModule-a23688a2c3d2ecc1478cdf58eb36d4ff"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ShowClippedTextDirectiveModule-a23688a2c3d2ecc1478cdf58eb36d4ff"' :
                                        'id="xs-directives-links-module-ShowClippedTextDirectiveModule-a23688a2c3d2ecc1478cdf58eb36d4ff"' }>
                                        <li class="link">
                                            <a href="directives/ShowClippedTextDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowClippedTextDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpotlightSearchModule.html" data-type="entity-link">SpotlightSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpotlightSearchModule-ff504a8ad7e502a0bff355060fc2f3ff"' : 'data-target="#xs-components-links-module-SpotlightSearchModule-ff504a8ad7e502a0bff355060fc2f3ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpotlightSearchModule-ff504a8ad7e502a0bff355060fc2f3ff"' :
                                            'id="xs-components-links-module-SpotlightSearchModule-ff504a8ad7e502a0bff355060fc2f3ff"' }>
                                            <li class="link">
                                                <a href="components/SpotlightSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotlightSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdActionMenuModule.html" data-type="entity-link">VcdActionMenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdActionMenuModule-7e09de0afa1c146114fb0ee6f8bb1aa6"' : 'data-target="#xs-components-links-module-VcdActionMenuModule-7e09de0afa1c146114fb0ee6f8bb1aa6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdActionMenuModule-7e09de0afa1c146114fb0ee6f8bb1aa6"' :
                                            'id="xs-components-links-module-VcdActionMenuModule-7e09de0afa1c146114fb0ee6f8bb1aa6"' }>
                                            <li class="link">
                                                <a href="components/ActionMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdActivityReporterModule.html" data-type="entity-link">VcdActivityReporterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdActivityReporterModule-638196ee34bdc66eb2ad059f17b04e28"' : 'data-target="#xs-components-links-module-VcdActivityReporterModule-638196ee34bdc66eb2ad059f17b04e28"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdActivityReporterModule-638196ee34bdc66eb2ad059f17b04e28"' :
                                            'id="xs-components-links-module-VcdActivityReporterModule-638196ee34bdc66eb2ad059f17b04e28"' }>
                                            <li class="link">
                                                <a href="components/BannerActivityReporterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BannerActivityReporterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerActivityReporterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerActivityReporterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdComponentsModule.html" data-type="entity-link">VcdComponentsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VcdDataExporterModule.html" data-type="entity-link">VcdDataExporterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdDataExporterModule-550ea6f3cc8825122511483d2bda3e58"' : 'data-target="#xs-components-links-module-VcdDataExporterModule-550ea6f3cc8825122511483d2bda3e58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdDataExporterModule-550ea6f3cc8825122511483d2bda3e58"' :
                                            'id="xs-components-links-module-VcdDataExporterModule-550ea6f3cc8825122511483d2bda3e58"' }>
                                            <li class="link">
                                                <a href="components/DataExporterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataExporterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdDatagridModule.html" data-type="entity-link">VcdDatagridModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' : 'data-target="#xs-components-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' :
                                            'id="xs-components-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                            <li class="link">
                                                <a href="components/BoldTextRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BoldTextRendererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatagridComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatagridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatagridMultiSelectFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatagridMultiSelectFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatagridNumericFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatagridNumericFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatagridSelectFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatagridSelectFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DatagridStringFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatagridStringFilterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' : 'data-target="#xs-directives-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' :
                                        'id="xs-directives-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                        <li class="link">
                                            <a href="directives/ComponentRendererOutletDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComponentRendererOutletDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' : 'data-target="#xs-pipes-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' :
                                            'id="xs-pipes-links-module-VcdDatagridModule-130ccce3d0a78b7079a815230732d64e"' }>
                                            <li class="link">
                                                <a href="pipes/FunctionRendererPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FunctionRendererPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdErrorBannerModule.html" data-type="entity-link">VcdErrorBannerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdErrorBannerModule-321f2dfc878a48b7f1f25fb8d64ce108"' : 'data-target="#xs-components-links-module-VcdErrorBannerModule-321f2dfc878a48b7f1f25fb8d64ce108"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdErrorBannerModule-321f2dfc878a48b7f1f25fb8d64ce108"' :
                                            'id="xs-components-links-module-VcdErrorBannerModule-321f2dfc878a48b7f1f25fb8d64ce108"' }>
                                            <li class="link">
                                                <a href="components/ErrorBannerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorBannerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdFormlyModule.html" data-type="entity-link">VcdFormlyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdFormlyModule-b608568184c802e79bf26296b2f10b11"' : 'data-target="#xs-components-links-module-VcdFormlyModule-b608568184c802e79bf26296b2f10b11"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdFormlyModule-b608568184c802e79bf26296b2f10b11"' :
                                            'id="xs-components-links-module-VcdFormlyModule-b608568184c802e79bf26296b2f10b11"' }>
                                            <li class="link">
                                                <a href="components/FormlyInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormlyInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormlyNumberWithUnitInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormlyNumberWithUnitInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormlySelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormlySelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdFormModule.html" data-type="entity-link">VcdFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' : 'data-target="#xs-components-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' :
                                            'id="xs-components-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                            <li class="link">
                                                <a href="components/FormCheckboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormCheckboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSelectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NumberWithUnitFormInputComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumberWithUnitFormInputComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' : 'data-target="#xs-directives-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' :
                                        'id="xs-directives-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                        <li class="link">
                                            <a href="directives/MinMaxValidator.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinMaxValidator</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' : 'data-target="#xs-injectables-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' :
                                        'id="xs-injectables-links-module-VcdFormModule-91b8fd7b11baae1d39cde2243f6078f3"' }>
                                        <li class="link">
                                            <a href="injectables/UnitFormatter.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UnitFormatter</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VcdLoadingIndicatorModule.html" data-type="entity-link">VcdLoadingIndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VcdLoadingIndicatorModule-43360cdadcb7523e42572a8bb34176f7"' : 'data-target="#xs-components-links-module-VcdLoadingIndicatorModule-43360cdadcb7523e42572a8bb34176f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VcdLoadingIndicatorModule-43360cdadcb7523e42572a8bb34176f7"' :
                                            'id="xs-components-links-module-VcdLoadingIndicatorModule-43360cdadcb7523e42572a8bb34176f7"' }>
                                            <li class="link">
                                                <a href="components/LoadingIndicatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingIndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FilterTestHostComponent.html" data-type="entity-link">FilterTestHostComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShowClippedTextDirectiveTestHostComponent.html" data-type="entity-link">ShowClippedTextDirectiveTestHostComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActionSearchProvider.html" data-type="entity-link">ActionSearchProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityPromiseResolver.html" data-type="entity-link">ActivityPromiseResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityReporter.html" data-type="entity-link">ActivityReporter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AngularWidgetDriver.html" data-type="entity-link">AngularWidgetDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/AngularWidgetFinder.html" data-type="entity-link">AngularWidgetFinder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BannerActivityReporterWidgetObject.html" data-type="entity-link">BannerActivityReporterWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseFormControl.html" data-type="entity-link">BaseFormControl</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseWidgetObject.html" data-type="entity-link">BaseWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/BoldTextRendererWidgetObject.html" data-type="entity-link">BoldTextRendererWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bytes.html" data-type="entity-link">Bytes</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClrDatagridWidgetObject.html" data-type="entity-link">ClrDatagridWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonUtil.html" data-type="entity-link">CommonUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/CypressWidgetDriver.html" data-type="entity-link">CypressWidgetDriver</a>
                            </li>
                            <li class="link">
                                <a href="classes/CypressWidgetFinder.html" data-type="entity-link">CypressWidgetFinder</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataExporterWidgetObject.html" data-type="entity-link">DataExporterWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatagridFilter.html" data-type="entity-link">DatagridFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/DomUtil.html" data-type="entity-link">DomUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterBuilder.html" data-type="entity-link">FilterBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormValidators.html" data-type="entity-link">FormValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hertz.html" data-type="entity-link">Hertz</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdGenerator.html" data-type="entity-link">IdGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberWithUnitFormInputWidgetObject.html" data-type="entity-link">NumberWithUnitFormInputWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Percent.html" data-type="entity-link">Percent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowClippedTextDirectiveTestHelper.html" data-type="entity-link">ShowClippedTextDirectiveTestHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpinnerActivityReporterWidgetObject.html" data-type="entity-link">SpinnerActivityReporterWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubscriptionTracker.html" data-type="entity-link">SubscriptionTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThousandsUnit.html" data-type="entity-link">ThousandsUnit</a>
                            </li>
                            <li class="link">
                                <a href="classes/Unit.html" data-type="entity-link">Unit</a>
                            </li>
                            <li class="link">
                                <a href="classes/VcdDatagridWidgetObject.html" data-type="entity-link">VcdDatagridWidgetObject</a>
                            </li>
                            <li class="link">
                                <a href="classes/WidgetFinder.html" data-type="entity-link">WidgetFinder</a>
                            </li>
                            <li class="link">
                                <a href="classes/WidgetObject.html" data-type="entity-link">WidgetObject</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CsvExporterService.html" data-type="entity-link">CsvExporterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpotlightSearchService.html" data-type="entity-link">SpotlightSearchService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActionDisplayConfig.html" data-type="entity-link">ActionDisplayConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionItem.html" data-type="entity-link">ActionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActivityResponse.html" data-type="entity-link">ActivityResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BoldTextRendererConfig.html" data-type="entity-link">BoldTextRendererConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Button.html" data-type="entity-link">Button</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonConfig.html" data-type="entity-link">ButtonConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CanBeReadOnly.html" data-type="entity-link">CanBeReadOnly</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CliptextConfig.html" data-type="entity-link">CliptextConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnConfigInternal.html" data-type="entity-link">ColumnConfigInternal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnRendererSpec.html" data-type="entity-link">ColumnRendererSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentRenderer.html" data-type="entity-link">ComponentRenderer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentRendererSpec.html" data-type="entity-link">ComponentRendererSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextualButton.html" data-type="entity-link">ContextualButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextualButtonConfig.html" data-type="entity-link">ContextualButtonConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataExportRequestEvent.html" data-type="entity-link">DataExportRequestEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatagridMultiSelectFilterConfig.html" data-type="entity-link">DatagridMultiSelectFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatagridNumericFilterConfig.html" data-type="entity-link">DatagridNumericFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatagridSelectFilterConfig.html" data-type="entity-link">DatagridSelectFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DatagridStringFilterConfig.html" data-type="entity-link">DatagridStringFilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailPane.html" data-type="entity-link">DetailPane</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailPaneConfig.html" data-type="entity-link">DetailPaneConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetailRowConfig.html" data-type="entity-link">DetailRowConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DropdownItem.html" data-type="entity-link">DropdownItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportColumn.html" data-type="entity-link">ExportColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterConfig.html" data-type="entity-link">FilterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterRendererSpec.html" data-type="entity-link">FilterRendererSpec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindableWidget.html" data-type="entity-link">FindableWidget</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindParams.html" data-type="entity-link">FindParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FunctionRenderer.html" data-type="entity-link">FunctionRenderer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalButton.html" data-type="entity-link">GlobalButton</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridColumn.html" data-type="entity-link">GridColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridDataFetchResult.html" data-type="entity-link">GridDataFetchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GridState.html" data-type="entity-link">GridState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasAngularFinder.html" data-type="entity-link">HasAngularFinder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HasFinder.html" data-type="entity-link">HasFinder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InternalRegistrationData.html" data-type="entity-link">InternalRegistrationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISubscriptionTracker.html" data-type="entity-link">ISubscriptionTracker</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MockRecord.html" data-type="entity-link">MockRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultiSelectOption.html" data-type="entity-link">MultiSelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultiSelectOptionInternal.html" data-type="entity-link">MultiSelectOptionInternal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectAndResponse.html" data-type="entity-link">ObjectAndResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationCallback.html" data-type="entity-link">PaginationCallback</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationConfiguration.html" data-type="entity-link">PaginationConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PagionationInformation.html" data-type="entity-link">PagionationInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisteredProviders.html" data-type="entity-link">RegisteredProviders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResultActivatedEvent.html" data-type="entity-link">ResultActivatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchSection.html" data-type="entity-link">SearchSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SelectOption.html" data-type="entity-link">SelectOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortedColumn.html" data-type="entity-link">SortedColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpotlightSearchProvider.html" data-type="entity-link">SpotlightSearchProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpotlightSearchResult.html" data-type="entity-link">SpotlightSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VcdFormlyFieldConfig.html" data-type="entity-link">VcdFormlyFieldConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VcdFormlyTemplateOptions.html" data-type="entity-link">VcdFormlyTemplateOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WidgetDriver.html" data-type="entity-link">WidgetDriver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});