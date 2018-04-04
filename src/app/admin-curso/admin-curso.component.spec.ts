import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCursoComponent } from './admin-curso.component';

describe('AdminCursoComponent', () => {
  let component: AdminCursoComponent;
  let fixture: ComponentFixture<AdminCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
