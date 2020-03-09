import { TestBed, inject } from '@angular/core/testing';

import { DonorFormService } from './donor-form.service';

describe('DonorFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonorFormService]
    });
  });

  it('should be created', inject([DonorFormService], (service: DonorFormService) => {
    expect(service).toBeTruthy();
  }));
});
