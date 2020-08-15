import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentallyFitComponent } from './mentally-fit.component';

describe('AboutComponent', () => {
  let component: MentallyFitComponent;
  let fixture: ComponentFixture<MentallyFitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MentallyFitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentallyFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
