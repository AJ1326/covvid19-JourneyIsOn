import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19CalculatorComponent } from './covid19-calculator.component';

describe('AboutComponent', () => {
  let component: Covid19CalculatorComponent;
  let fixture: ComponentFixture<Covid19CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Covid19CalculatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
