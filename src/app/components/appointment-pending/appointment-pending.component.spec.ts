import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPendingComponent } from './appointment-pending.component';

describe('AppointmentPendingComponent', () => {
  let component: AppointmentPendingComponent;
  let fixture: ComponentFixture<AppointmentPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
