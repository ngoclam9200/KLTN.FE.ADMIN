import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryStaffComponent } from './salary-staff.component';

describe('SalaryStaffComponent', () => {
  let component: SalaryStaffComponent;
  let fixture: ComponentFixture<SalaryStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
