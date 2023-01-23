import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaRaccolteComponent } from './scheda-raccolte.component';

describe('SchedaRaccolteComponent', () => {
  let component: SchedaRaccolteComponent;
  let fixture: ComponentFixture<SchedaRaccolteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaRaccolteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaRaccolteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
