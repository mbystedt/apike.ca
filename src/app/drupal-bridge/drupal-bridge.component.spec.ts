import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrupalBridgeComponent } from './drupal-bridge.component';

describe('DrupalBridgeComponent', () => {
  let component: DrupalBridgeComponent;
  let fixture: ComponentFixture<DrupalBridgeComponent>;

  beforeEach(async(() => {
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
