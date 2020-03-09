import { TestBed, inject } from '@angular/core/testing';

import { ViewProofService } from './view-proof.service';

describe('ViewProofService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewProofService]
    });
  });

  it('should be created', inject([ViewProofService], (service: ViewProofService) => {
    expect(service).toBeTruthy();
  }));
});
