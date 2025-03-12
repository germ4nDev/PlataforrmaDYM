import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSuscriptorComponent } from './usuarios-suscriptor.component';

describe('UsuariosSuscriptorComponent', () => {
  let component: UsuariosSuscriptorComponent;
  let fixture: ComponentFixture<UsuariosSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosSuscriptorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
