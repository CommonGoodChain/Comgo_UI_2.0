import { TestBed, inject } from '@angular/core/testing';

import { AddexpenseService } from './addexpense.service';

describe('AddexpenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddexpenseService]
    });
  });

  it('should be created', inject([AddexpenseService], (service: AddexpenseService) => {
    expect(service).toBeTruthy();
  }));
});
