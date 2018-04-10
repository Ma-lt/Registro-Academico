import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricularCursosComponent } from './matricular-cursos.component';

describe('MatricularCursosComponent', () => {
  let component: MatricularCursosComponent;
  let fixture: ComponentFixture<MatricularCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatricularCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricularCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
