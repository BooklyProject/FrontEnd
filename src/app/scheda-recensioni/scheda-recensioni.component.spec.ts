import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaRecensioniComponent } from './scheda-recensioni.component';

describe('SchedaRecensioniComponent', () => {
  let component: SchedaRecensioniComponent;
  let fixture: ComponentFixture<SchedaRecensioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaRecensioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaRecensioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
