import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageProductComponent } from './edit-image-product.component';

describe('EditImageProductComponent', () => {
  let component: EditImageProductComponent;
  let fixture: ComponentFixture<EditImageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImageProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
