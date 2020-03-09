import { TestBed, inject } from '@angular/core/testing';

import { ProjectcommunicationService } from './projectcommunication.service';

describe('ProjectcommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectcommunicationService]
    });
  });

  it('should be created', inject([ProjectcommunicationService], (service: ProjectcommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
