import { TestBed, inject } from '@angular/core/testing';

import { ViewexpensesService } from './viewexpenses.service';

describe('ViewexpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewexpensesService]
    });
  });

  it('should be created', inject([ViewexpensesService], (service: ViewexpensesService) => {
    expect(service).toBeTruthy();
  }));
});
