import { TestBed } from '@angular/core/testing';

import { NgLiveDocsService } from './ng-live-docs.service';

describe('NgLiveDocsService', () => {
    let service: NgLiveDocsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgLiveDocsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
