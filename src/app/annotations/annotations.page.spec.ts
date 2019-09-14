import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationsPage } from './annotations.page';

describe('AnnotationsPage', () => {
  let component: AnnotationsPage;
  let fixture: ComponentFixture<AnnotationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
