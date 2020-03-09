import { TestBed, inject } from '@angular/core/testing';

import { PendingUsersService } from './pending-users.service';

describe('PendingUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendingUsersService]
    });
  });

  it('should be created', inject([PendingUsersService], (service: PendingUsersService) => {
    expect(service).toBeTruthy();
  }));
});
