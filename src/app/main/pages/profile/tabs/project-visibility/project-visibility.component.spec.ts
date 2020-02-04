import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVisibilityComponent } from './project-visibility.component';

describe('ProjectVisibilityComponent', () => {
  let component: ProjectVisibilityComponent;
  let fixture: ComponentFixture<ProjectVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
