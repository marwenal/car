import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateTimeComponent } from './calculate-time.component';

describe('CalculateTimeComponent', () => {
  let component: CalculateTimeComponent;
  let fixture: ComponentFixture<CalculateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculateTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
