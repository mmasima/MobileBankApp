import { TestBed } from '@angular/core/testing';

import { OverallServiceService } from './overall-service.service';

describe('OverallServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverallServiceService = TestBed.get(OverallServiceService);
    expect(service).toBeTruthy();
  });
});
