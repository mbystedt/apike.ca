import { TestBed, inject } from '@angular/core/testing';

import { NodeUserService } from './node-user.service';

describe('NodeUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeUserService]
    });
  });

  it('should be created', inject([NodeUserService], (service: NodeUserService) => {
    expect(service).toBeTruthy();
  }));
});
