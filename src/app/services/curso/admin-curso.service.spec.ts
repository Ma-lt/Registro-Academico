import { TestBed, inject } from '@angular/core/testing';

import { AdminCursoService } from './admin-curso.service';

describe('AdminCursoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCursoService]
    });
  });

  it('should be created', inject([AdminCursoService], (service: AdminCursoService) => {
    expect(service).toBeTruthy();
  }));
});
