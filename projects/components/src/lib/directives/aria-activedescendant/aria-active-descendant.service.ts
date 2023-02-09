/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Communication service between {@link AriaActiveDescendantDirective} and observer of activeDescendantObservable
 */
@Injectable()
export class AriaActiveDescendantService {
    private activeDescendantSubject: Subject<string> = new BehaviorSubject<string>('');

    /**
     * Observed by element which owns the section with possible active descendants
     */
    public activeDescendantObservable: Observable<string> = this.activeDescendantSubject.asObservable();

    /**
     * Marks element as active descendant
     * @param id attribute of active descendant element
     */
    public selectDescendant(id: string): void {
        this.activeDescendantSubject.next(id);
    }
}
