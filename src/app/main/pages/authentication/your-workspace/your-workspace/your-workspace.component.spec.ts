import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourWorkspaceComponent } from './your-workspace.component';

describe('YourWorkspaceComponent', () => {
  let component: YourWorkspaceComponent;
  let fixture: ComponentFixture<YourWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
