import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcommunicationComponent } from './projectcommunication.component';

describe('ProjectcommunicationComponent', () => {
  let component: ProjectcommunicationComponent;
  let fixture: ComponentFixture<ProjectcommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectcommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
