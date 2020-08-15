import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWiseModalComponent } from './country-wise-modal.component';

describe('AboutComponent', () => {
  let component: CountryWiseModalComponent;
  let fixture: ComponentFixture<CountryWiseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountryWiseModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryWiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
