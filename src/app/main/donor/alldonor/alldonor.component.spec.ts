import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldonorComponent } from './alldonor.component';

describe('AlldonorComponent', () => {
  let component: AlldonorComponent;
  let fixture: ComponentFixture<AlldonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
