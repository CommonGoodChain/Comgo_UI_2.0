import { TestBed, inject } from '@angular/core/testing';

import { ForgotPassword2Service } from './forgot-password2.service';

describe('ForgotPassword2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotPassword2Service]
    });
  });

  it('should be created', inject([ForgotPassword2Service], (service: ForgotPassword2Service) => {
    expect(service).toBeTruthy();
  }));
});
