import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCompletedComponent } from './appointment-completed.component';

describe('AppointmentCompletedComponent', () => {
  let component: AppointmentCompletedComponent;
  let fixture: ComponentFixture<AppointmentCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
