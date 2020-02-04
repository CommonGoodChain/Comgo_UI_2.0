import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrganizationsComponent } from './my-organizations.component';

describe('MyOrganizationsComponent', () => {
  let component: MyOrganizationsComponent;
  let fixture: ComponentFixture<MyOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
