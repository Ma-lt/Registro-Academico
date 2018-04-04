import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfesorComponent } from './main-profesor.component';

describe('MainProfesorComponent', () => {
  let component: MainProfesorComponent;
  let fixture: ComponentFixture<MainProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
