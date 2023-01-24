import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEventoComponent } from './pagina-evento.component';

describe('PaginaEventoComponent', () => {
  let component: PaginaEventoComponent;
  let fixture: ComponentFixture<PaginaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
