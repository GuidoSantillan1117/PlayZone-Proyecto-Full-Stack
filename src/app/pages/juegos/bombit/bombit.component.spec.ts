import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombitComponent } from './bombit.component';

describe('BombitComponent', () => {
  let component: BombitComponent;
  let fixture: ComponentFixture<BombitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BombitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BombitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
