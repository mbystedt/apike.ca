import { TestBed, inject } from '@angular/core/testing';

import { TagHelperService } from './tag-helper.service';

describe('TagHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagHelperService]
    });
  });

  it('should be created', inject([TagHelperService], (service: TagHelperService) => {
    expect(service).toBeTruthy();
  }));
});
