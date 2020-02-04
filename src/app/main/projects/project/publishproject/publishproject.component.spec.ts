import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishprojectComponent } from './publishproject.component';

describe('PublishprojectComponent', () => {
  let component: PublishprojectComponent;
  let fixture: ComponentFixture<PublishprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
