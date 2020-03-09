import { TestBed, inject } from '@angular/core/testing';

import { OtherprojectService } from './otherproject.service';

describe('OtherprojectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherprojectService]
    });
  });

  it('should be created', inject([OtherprojectService], (service: OtherprojectService) => {
    expect(service).toBeTruthy();
  }));
});
