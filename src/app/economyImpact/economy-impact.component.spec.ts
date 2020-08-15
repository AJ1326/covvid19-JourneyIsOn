import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomyImpactComponent } from './economy-impact.component';

describe('AboutComponent', () => {
  let component: EconomyImpactComponent;
  let fixture: ComponentFixture<EconomyImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EconomyImpactComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomyImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
