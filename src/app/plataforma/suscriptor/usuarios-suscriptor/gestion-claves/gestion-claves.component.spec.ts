import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClavesComponent } from './gestion-claves.component';

describe('GestionClavesComponent', () => {
  let component: GestionClavesComponent;
  let fixture: ComponentFixture<GestionClavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
