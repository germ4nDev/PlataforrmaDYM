import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAplicacionComponent } from './gestion-aplicacion.component';

describe('GestionAplicacionComponent', () => {
  let component: GestionAplicacionComponent;
  let fixture: ComponentFixture<GestionAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAplicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
