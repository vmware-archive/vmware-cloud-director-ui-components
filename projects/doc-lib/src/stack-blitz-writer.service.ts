/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import sdk from '@stackblitz/sdk';
import { ExampleEntry } from './documentation';
import { DocumentationRetrieverService } from './documentation-retriever.service';
import { CompodocComponent, CompodocModule } from './compodoc/compodoc-schema';
import { OpenOptions, Project } from '@stackblitz/sdk/typings/interfaces';
import { Inject, InjectionToken } from '@angular/core';

export interface StackBlitzInfo {
    /** Something like 'vcd-ui-cc-starter-clarity-v8-yhe4yg', then ID of a StackBlitz URL */
    templateId: string;
    /** The name of the project displaying examples */
    projectName: string;

    /**
     * Finds a module for a component
     * If this is null or an empty string is returned, the module is not added to the example
     */
    moduleFinder?(componentName: string): string;
}

export const STACKBLITZ_INFO = new InjectionToken<StackBlitzInfo>('StackBlitz Template information');

const APP_MODULE = 'src/app/app.module.ts';
const APP_COMPONENT_HTML = 'src/app/app.component.html';

/**
 * Map of file names to their content
 */
interface StackBlitzFileSystem {
    [filePath: string]: string;
}

/**
 * Map of package name to version numbers
 */
interface StackBlitzDependencies {
    [packageName: string]: string;
}

/**
 *
 * Given an existing stackblitz containing a few placeholders, it modifies that stackblitz adding a new component
 * to app.component.html and its module to app.module.ts
 *
 * import { NgModule } from "@angular/core";
 * import { BrowserModule } from "@angular/platform-browser";
 * import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
 * import { FormsModule } from "@angular/forms";
 * import { ClarityModule } from "@clr/angular";
 * import { AppComponent } from "./app.component";
 * //__EXAMPLE_MODULE_IMPORT_LINE;
 *
 * @NgModule({
 *   imports: [
 *     BrowserModule,
 *     BrowserAnimationsModule,
 *     ClarityModule,
 *     FormsModule,
 *     //__EXAMPLE_NG_MODULE_IMPORTS_ENTRY
 *   ],
 *   declarations: [AppComponent],
 *   bootstrap: [AppComponent]
 * })
 * export class AppModule {}
 */

export class StackBlitzWriterService {
    constructor(
        @Inject(STACKBLITZ_INFO) private stackBlitzInfo: StackBlitzInfo,
        private docRetriever: DocumentationRetrieverService
    ) {
        this.fetchSbTemplate();
    }

    private template: [StackBlitzFileSystem, StackBlitzDependencies] = null;

    /**
     * @param entry The example to be displayed in StackBlitz
     */
    async openStackBlitz(entry: ExampleEntry): Promise<void> {
        const exampleComponent = this.docRetriever.getComponent(entry.component);
        let exampleModule: CompodocModule;
        if (this.stackBlitzInfo.moduleFinder) {
            const moduleName = this.stackBlitzInfo.moduleFinder(exampleComponent.name);
            exampleModule = this.docRetriever.getModule(moduleName);
        }

        const [templateFiles, dependencies] = await this.fetchSbTemplate();
        const [mergedFiles, openFile] = this.createPatch(templateFiles, exampleComponent, exampleModule);

        const project: Project = {
            title: this.stackBlitzInfo.projectName,
            description: entry.title,
            template: 'angular-cli',
            dependencies,
            files: mergedFiles,
        };
        const openOptions: OpenOptions = {
            openFile,
            newWindow: true,
        };
        return sdk.openProject(project, openOptions);
    }

    private createPatch(
        templateFs: StackBlitzFileSystem,
        exampleComponent: CompodocComponent,
        module?: CompodocModule
    ): [StackBlitzFileSystem, string] {
        const componentTsFile = this.getFileName(exampleComponent.file);
        const changedFiles = {
            [APP_MODULE]: this.mergeAppModule(module, templateFs),
            [APP_COMPONENT_HTML]: this.mergeAppHtml(exampleComponent, templateFs),
            [componentTsFile]: exampleComponent.sourceCode,
            [this.getFileName(module.path)]: module.sourceCode,
        };

        let defaultFile = componentTsFile;

        if (exampleComponent.templateUrl && exampleComponent.templateUrl.length > 0) {
            const fileName = removeLeadingDotSlash(exampleComponent.templateUrl[0]);
            const htmlFile = this.getFileName(fileName);
            changedFiles[htmlFile] = exampleComponent.templateData;
            // If HTML is provided, use that as the default file
            defaultFile = htmlFile;
        }

        if (exampleComponent.styleUrlsData && exampleComponent.styleUrlsData.length > 0) {
            const styleData = exampleComponent.styleUrlsData[0];
            const fileName = removeLeadingDotSlash(styleData.styleUrl);
            changedFiles[this.getFileName(fileName)] = styleData.data;
        }

        const mergedFs = { ...templateFs, ...changedFiles };

        return [mergedFs, defaultFile];

        /**
         * @param fileName a fileName path that may start with ./
         * @return A filename, without ./ in the front
         */
        function removeLeadingDotSlash(fileName: string): string {
            if (fileName.startsWith('./')) {
                fileName = fileName.slice(2);
            }
            return fileName;
        }
    }

    /**
     * Fetches an existing Stackblitz's files and dependencies by embedding it on the page and removing it when finished.
     * The result is cached for future calls.
     */
    private async fetchSbTemplate(): Promise<[StackBlitzFileSystem, StackBlitzDependencies]> {
        if (this.template) {
            return Promise.resolve(this.template);
        }

        // StackBlitz's API replaces the DOM node you give it, so we need an extra node
        // so we can remove the created iFRAME
        const iframeContainer = document.createElement('div');
        const iframeContainerParent = document.createElement('div');
        iframeContainerParent.appendChild(iframeContainer);
        iframeContainerParent.style.visibility = 'hidden';
        iframeContainerParent.style.position = 'absolute';
        document.body.appendChild(iframeContainerParent);
        const vm = await sdk.embedProjectId(iframeContainer, this.stackBlitzInfo.projectName, { view: 'editor' });
        this.template = [await vm.getFsSnapshot(), await vm.getDependencies()];
        document.body.removeChild(iframeContainerParent);
        return Promise.resolve(this.template);
    }

    /**
     * Returns just the filename part of a path prefixed by 'src/app/'
     * @param path Path to be shortened to just its filename and put under src/app
     * @param prefix A new path to be inserted before the filename
     */
    private getFileName(path: string, prefix: string = 'src/app/'): string {
        return prefix + path.slice(path.lastIndexOf('/') + 1);
    }

    private mergeAppModule(module: CompodocModule, fileSystem: StackBlitzFileSystem): string {
        const moduleFileName = this.getFileName(module.path, '').replace(/\.ts$/, '');
        const moduleName = module.name;
        return fileSystem[APP_MODULE].replace(
            '//__EXAMPLE_MODULE_IMPORT_LINE',
            `import {${moduleName}} from "./${moduleFileName}";`
        ).replace('//__EXAMPLE_NG_MODULE_IMPORTS_ENTRY', moduleName);
    }

    private mergeAppHtml(component: CompodocComponent, fileSystem: StackBlitzFileSystem): string {
        const tag = '<x></x>'.replace(/x/g, component.selector);
        return fileSystem[APP_COMPONENT_HTML].replace(/__EXAMPLE_TAG/, tag);
    }
}
