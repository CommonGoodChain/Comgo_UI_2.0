import { TestBed, inject } from '@angular/core/testing';

import { AlldonorService } from './alldonor.service';

describe('AlldonorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlldonorService]
    });
  });

  it('should be created', inject([AlldonorService], (service: AlldonorService) => {
    expect(service).toBeTruthy();
  }));
});
