import { TestBed, inject } from '@angular/core/testing';

import { Register2Service } from './register2.service';

describe('Register2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Register2Service]
    });
  });

  it('should be created', inject([Register2Service], (service: Register2Service) => {
    expect(service).toBeTruthy();
  }));
});
