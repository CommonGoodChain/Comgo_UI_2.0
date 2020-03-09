import { TestBed, inject } from '@angular/core/testing';

import { MydonationsService } from './mydonations.service';

describe('MydonationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MydonationsService]
    });
  });

  it('should be created', inject([MydonationsService], (service: MydonationsService) => {
    expect(service).toBeTruthy();
  }));
});
