import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMateriaComponent } from './admin-materia.component';

describe('AdminMateriaComponent', () => {
  let component: AdminMateriaComponent;
  let fixture: ComponentFixture<AdminMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
