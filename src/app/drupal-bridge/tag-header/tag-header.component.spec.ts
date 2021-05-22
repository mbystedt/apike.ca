import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagHeaderComponent } from './tag-header.component';

describe('TagHeaderComponent', () => {
  let component: TagHeaderComponent;
  let fixture: ComponentFixture<TagHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TagHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
