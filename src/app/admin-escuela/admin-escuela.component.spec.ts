import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEscuelaComponent } from './admin-escuela.component';

describe('AdminEscuelaComponent', () => {
  let component: AdminEscuelaComponent;
  let fixture: ComponentFixture<AdminEscuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEscuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
