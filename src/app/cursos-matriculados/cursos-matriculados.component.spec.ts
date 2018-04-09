import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosMatriculadosComponent } from './cursos-matriculados.component';

describe('CursosMatriculadosComponent', () => {
  let component: CursosMatriculadosComponent;
  let fixture: ComponentFixture<CursosMatriculadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosMatriculadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosMatriculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
