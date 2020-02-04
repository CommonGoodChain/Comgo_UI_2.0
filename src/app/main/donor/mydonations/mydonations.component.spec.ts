import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydonationsComponent } from './mydonations.component';

describe('MydonationsComponent', () => {
  let component: MydonationsComponent;
  let fixture: ComponentFixture<MydonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
