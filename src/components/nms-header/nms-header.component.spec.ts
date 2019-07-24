import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmsHeaderPage } from './nms-header.page';

describe('NmsHeaderPage', () => {
  let component: NmsHeaderPage;
  let fixture: ComponentFixture<NmsHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmsHeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmsHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
