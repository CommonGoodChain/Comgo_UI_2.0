import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAboutComponent } from './web-about.component';

describe('WebAboutComponent', () => {
  let component: WebAboutComponent;
  let fixture: ComponentFixture<WebAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
