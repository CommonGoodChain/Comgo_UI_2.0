import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmilestoneComponent } from './viewmilestone.component';

describe('ViewmilestoneComponent', () => {
  let component: ViewmilestoneComponent;
  let fixture: ComponentFixture<ViewmilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
