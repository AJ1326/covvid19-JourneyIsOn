import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialDistancingComponent } from './social-distancing.component';

describe('AboutComponent', () => {
  let component: SocialDistancingComponent;
  let fixture: ComponentFixture<SocialDistancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocialDistancingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialDistancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
