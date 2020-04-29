import { TestBed } from '@angular/core/testing';

import { FetchcadidatesService } from './fetchcadidates.service';

describe('FetchcadidatesService', () => {
  let service: FetchcadidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchcadidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
