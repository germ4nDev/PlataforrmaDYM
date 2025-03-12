import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModuloComponent } from './gestion-modulo.component';

describe('GestionModuloComponent', () => {
  let component: GestionModuloComponent;
  let fixture: ComponentFixture<GestionModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
