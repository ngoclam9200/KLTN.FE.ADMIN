import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditVoucherComponent } from './create-edit-voucher.component';

describe('CreateEditVoucherComponent', () => {
  let component: CreateEditVoucherComponent;
  let fixture: ComponentFixture<CreateEditVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
