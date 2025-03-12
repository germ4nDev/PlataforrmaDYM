import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInicioComponent } from './gestion-inicio.component';

describe('GestionInicioComponent', () => {
  let component: GestionInicioComponent;
  let fixture: ComponentFixture<GestionInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
