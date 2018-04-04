import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramaComponent } from './admin-programa.component';

describe('AdminProgramaComponent', () => {
  let component: AdminProgramaComponent;
  let fixture: ComponentFixture<AdminProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
