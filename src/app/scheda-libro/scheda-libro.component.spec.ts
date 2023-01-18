import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaLibroComponent } from './scheda-libro.component';

describe('SchedaLibroComponent', () => {
  let component: SchedaLibroComponent;
  let fixture: ComponentFixture<SchedaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
