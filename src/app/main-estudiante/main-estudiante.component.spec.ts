import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEstudianteComponent } from './main-estudiante.component';

describe('MainEstudianteComponent', () => {
  let component: MainEstudianteComponent;
  let fixture: ComponentFixture<MainEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
