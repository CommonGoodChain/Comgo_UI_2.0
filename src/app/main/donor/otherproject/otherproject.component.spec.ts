import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherprojectComponent } from './otherproject.component';

describe('OtherprojectComponent', () => {
  let component: OtherprojectComponent;
  let fixture: ComponentFixture<OtherprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
