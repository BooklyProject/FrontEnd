import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRaccoltaComponent } from './pagina-raccolta.component';

describe('PaginaRaccoltaComponent', () => {
  let component: PaginaRaccoltaComponent;
  let fixture: ComponentFixture<PaginaRaccoltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaRaccoltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaRaccoltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
