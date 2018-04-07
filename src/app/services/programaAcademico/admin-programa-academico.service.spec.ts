import { TestBed, inject } from '@angular/core/testing';

import { AdminProgramaAcademicoService } from './admin-programa-academico.service';

describe('AdminProgramaAcademicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminProgramaAcademicoService]
    });
  });

  it('should be created', inject([AdminProgramaAcademicoService], (service: AdminProgramaAcademicoService) => {
    expect(service).toBeTruthy();
  }));
});
