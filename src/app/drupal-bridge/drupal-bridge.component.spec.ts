import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrupalBridgeComponent } from './drupal-bridge.component';

describe('DrupalBridgeComponent', () => {
  let component: DrupalBridgeComponent;
  let fixture: ComponentFixture<DrupalBridgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DrupalBridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrupalBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
