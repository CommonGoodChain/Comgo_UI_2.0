import { TestBed, inject } from '@angular/core/testing';

import { MyprojectService } from './myproject.service';

describe('MyprojectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyprojectService]
    });
  });

  it('should be created', inject([MyprojectService], (service: MyprojectService) => {
    expect(service).toBeTruthy();
  }));
});
