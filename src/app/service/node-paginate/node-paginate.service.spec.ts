import { TestBed, inject } from '@angular/core/testing';

import { NodePaginateService } from './node-paginate.service';

describe('NodePaginateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodePaginateService]
    });
  });

  it('should be created', inject([NodePaginateService], (service: NodePaginateService) => {
    expect(service).toBeTruthy();
  }));
});
