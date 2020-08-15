import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransRateComponent } from './trans-rate.component';

describe('AboutComponent', () => {
  let component: TransRateComponent;
  let fixture: ComponentFixture<TransRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransRateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
