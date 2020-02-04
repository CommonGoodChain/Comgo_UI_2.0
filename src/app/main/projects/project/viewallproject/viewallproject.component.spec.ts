import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewallprojectComponent } from './viewallproject.component';

describe('viewallprojectComponent', () => {
  let component: viewallprojectComponent;
  let fixture: ComponentFixture<viewallprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewallprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewallprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
