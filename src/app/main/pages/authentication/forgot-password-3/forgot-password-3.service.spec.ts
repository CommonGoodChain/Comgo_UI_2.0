import { TestBed, inject } from '@angular/core/testing';

import { ForgotPassword3Service } from './forgot-password-3.service';

describe('ForgotPassword3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotPassword3Service]
    });
  });

  it('should be created', inject([ForgotPassword3Service], (service: ForgotPassword3Service) => {
    expect(service).toBeTruthy();
  }));
});
