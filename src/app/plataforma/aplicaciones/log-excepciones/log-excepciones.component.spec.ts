import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExcepcionesComponent } from './log-excepciones.component';

describe('LogExcepcionesComponent', () => {
  let component: LogExcepcionesComponent;
  let fixture: ComponentFixture<LogExcepcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogExcepcionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogExcepcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
