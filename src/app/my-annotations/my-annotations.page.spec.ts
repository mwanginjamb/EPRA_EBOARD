import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnotationsPage } from './my-annotations.page';

describe('MyAnnotationsPage', () => {
  let component: MyAnnotationsPage;
  let fixture: ComponentFixture<MyAnnotationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAnnotationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnnotationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
