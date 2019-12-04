import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLibComponent } from './doc-lib.component';

describe('DocLibComponent', () => {
  let component: DocLibComponent;
  let fixture: ComponentFixture<DocLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
