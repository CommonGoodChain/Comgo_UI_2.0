import { TestBed, inject } from '@angular/core/testing';

import { AddProofService } from './add-proof.service';

describe('AddProofService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProofService]
    });
  });

  it('should be created', inject([AddProofService], (service: AddProofService) => {
    expect(service).toBeTruthy();
  }));
});
