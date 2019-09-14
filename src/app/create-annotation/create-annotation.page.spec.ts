import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnotationPage } from './create-annotation.page';

describe('CreateAnnotationPage', () => {
  let component: CreateAnnotationPage;
  let fixture: ComponentFixture<CreateAnnotationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnnotationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnotationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
