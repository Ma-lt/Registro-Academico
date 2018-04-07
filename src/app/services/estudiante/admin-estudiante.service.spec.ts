import { TestBed, inject } from '@angular/core/testing';

import { AdminEstudianteService } from './admin-estudiante.service';

describe('AdminEstudianteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEstudianteService]
    });
  });

  it('should be created', inject([AdminEstudianteService], (service: AdminEstudianteService) => {
    expect(service).toBeTruthy();
  }));
});
