import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVersionComponent } from './gestion-version.component';

describe('GestionVersionComponent', () => {
  let component: GestionVersionComponent;
  let fixture: ComponentFixture<GestionVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVersionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
