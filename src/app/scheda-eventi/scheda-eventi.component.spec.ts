import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaEventiComponent } from './scheda-eventi.component';

describe('SchedaEventiComponent', () => {
  let component: SchedaEventiComponent;
  let fixture: ComponentFixture<SchedaEventiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedaEventiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedaEventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
