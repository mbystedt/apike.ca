import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgColorTableComponent } from './svg-color-table.component';

describe('SvgColorTableComponent', () => {
  let component: SvgColorTableComponent;
  let fixture: ComponentFixture<SvgColorTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgColorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgColorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
