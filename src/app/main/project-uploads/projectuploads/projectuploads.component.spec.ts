import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectuploadsComponent } from './projectuploads.component';

describe('ProjectuploadsComponent', () => {
  let component: ProjectuploadsComponent;
  let fixture: ComponentFixture<ProjectuploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectuploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
