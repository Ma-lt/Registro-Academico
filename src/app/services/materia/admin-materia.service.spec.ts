import { TestBed, inject } from '@angular/core/testing';

import { AdminMateriaService } from './admin-materia.service';

describe('AdminMateriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminMateriaService]
    });
  });

  it('should be created', inject([AdminMateriaService], (service: AdminMateriaService) => {
    expect(service).toBeTruthy();
  }));
});
