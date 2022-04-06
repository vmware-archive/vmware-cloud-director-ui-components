import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLiveDocsComponent } from './ng-live-docs.component';

describe('NgLiveDocsComponent', () => {
    let component: NgLiveDocsComponent;
    let fixture: ComponentFixture<NgLiveDocsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgLiveDocsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgLiveDocsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
