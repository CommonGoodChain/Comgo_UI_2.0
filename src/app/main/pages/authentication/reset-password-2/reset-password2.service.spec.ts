import { TestBed, inject } from '@angular/core/testing';

import { ResetPassword2Service } from './reset-password2.service';

describe('ResetPassword2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPassword2Service]
    });
  });

  it('should be created', inject([ResetPassword2Service], (service: ResetPassword2Service) => {
    expect(service).toBeTruthy();
  }));
});
