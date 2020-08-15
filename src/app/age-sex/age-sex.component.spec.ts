import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSexComponent } from './age-sex.component';

describe('AboutComponent', () => {
  let component: AgeSexComponent;
  let fixture: ComponentFixture<AgeSexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgeSexComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
