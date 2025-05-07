import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosDialogComponent } from './juegos-dialog.component';

describe('JuegosDialogComponent', () => {
  let component: JuegosDialogComponent;
  let fixture: ComponentFixture<JuegosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
