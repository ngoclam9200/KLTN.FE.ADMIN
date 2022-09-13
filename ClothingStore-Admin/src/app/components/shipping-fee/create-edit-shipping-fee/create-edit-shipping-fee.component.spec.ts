import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditShippingFeeComponent } from './create-edit-shipping-fee.component';

describe('CreateEditShippingFeeComponent', () => {
  let component: CreateEditShippingFeeComponent;
  let fixture: ComponentFixture<CreateEditShippingFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditShippingFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditShippingFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
