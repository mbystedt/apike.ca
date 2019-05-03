import { TestBed, inject } from '@angular/core/testing';

import { DrupalBridgeService } from './drupal-bridge.service';

describe('DrupalBridgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrupalBridgeService]
    });
  });

  it('should be created', inject([DrupalBridgeService], (service: DrupalBridgeService) => {
    expect(service).toBeTruthy();
  }));
});
