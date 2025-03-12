import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiopClavesComponent } from './gestiop-claves.component';

describe('GestiopClavesComponent', () => {
  let component: GestiopClavesComponent;
  let fixture: ComponentFixture<GestiopClavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestiopClavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestiopClavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
