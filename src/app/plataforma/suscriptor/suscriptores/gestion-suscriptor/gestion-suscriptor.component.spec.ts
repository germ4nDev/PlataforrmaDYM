import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSuscriptorComponent } from './gestion-suscriptor.component';

describe('GestionSuscriptorComponent', () => {
  let component: GestionSuscriptorComponent;
  let fixture: ComponentFixture<GestionSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSuscriptorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
