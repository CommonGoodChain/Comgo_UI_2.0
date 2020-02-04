import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindWorkspaceComponent } from './find-workspace.component';

describe('FindWorkspaceComponent', () => {
  let component: FindWorkspaceComponent;
  let fixture: ComponentFixture<FindWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
