import { TestBed, inject } from '@angular/core/testing';

import { Login2Service } from './login2.service';

describe('Login2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Login2Service]
    });
  });

  it('should be created', inject([Login2Service], (service: Login2Service) => {
    expect(service).toBeTruthy();
  }));
});
