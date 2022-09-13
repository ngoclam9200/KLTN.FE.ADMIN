import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofVoucherComponent } from './typeof-voucher.component';

describe('TypeofVoucherComponent', () => {
  let component: TypeofVoucherComponent;
  let fixture: ComponentFixture<TypeofVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeofVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
