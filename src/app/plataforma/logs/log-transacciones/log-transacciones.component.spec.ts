import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTransaccionesComponent } from './log-transacciones.component';

describe('LogTransaccionesComponent', () => {
  let component: LogTransaccionesComponent;
  let fixture: ComponentFixture<LogTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogTransaccionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
