import { TestBed, inject } from '@angular/core/testing';

import { AdminGrupoService } from './admin-grupo.service';

describe('AdminGrupoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGrupoService]
    });
  });

  it('should be created', inject([AdminGrupoService], (service: AdminGrupoService) => {
    expect(service).toBeTruthy();
  }));
});
