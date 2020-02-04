import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmilestoneComponent } from './addmilestone.component';

describe('AddmilestoneComponent', () => {
  let component: AddmilestoneComponent;
  let fixture: ComponentFixture<AddmilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
