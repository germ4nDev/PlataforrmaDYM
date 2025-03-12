import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActualizacionesComponent } from './log-actualizaciones.component';

describe('LogActualizacionesComponent', () => {
  let component: LogActualizacionesComponent;
  let fixture: ComponentFixture<LogActualizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogActualizacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogActualizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
