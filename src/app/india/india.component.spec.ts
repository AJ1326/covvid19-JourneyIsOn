import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaComponent } from './india.component';

describe('AboutComponent', () => {
  let component: IndiaComponent;
  let fixture: ComponentFixture<IndiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndiaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
