import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPaqueteComponent } from './gestion-paquete.component';

describe('GestionPaqueteComponent', () => {
  let component: GestionPaqueteComponent;
  let fixture: ComponentFixture<GestionPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPaqueteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
