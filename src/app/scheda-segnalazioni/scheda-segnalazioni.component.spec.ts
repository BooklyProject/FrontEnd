import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaSegnalazioniComponent } from './scheda-segnalazioni.component';

describe('SchedaSegnalazioniComponent', () => {
  let component: SchedaSegnalazioniComponent;
  let fixture: ComponentFixture<SchedaSegnalazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaSegnalazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaSegnalazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
