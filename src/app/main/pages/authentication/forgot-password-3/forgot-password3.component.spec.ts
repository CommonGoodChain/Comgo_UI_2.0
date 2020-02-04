import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassword3Component } from './forgot-password3.component';

describe('ForgotPassword3Component', () => {
  let component: ForgotPassword3Component;
  let fixture: ComponentFixture<ForgotPassword3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassword3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassword3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
