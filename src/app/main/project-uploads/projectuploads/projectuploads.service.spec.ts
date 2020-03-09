import { TestBed, inject } from '@angular/core/testing';

import { ProjectuploadsService } from './projectuploads.service';

describe('ProjectuploadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectuploadsService]
    });
  });

  it('should be created', inject([ProjectuploadsService], (service: ProjectuploadsService) => {
    expect(service).toBeTruthy();
  }));
});
