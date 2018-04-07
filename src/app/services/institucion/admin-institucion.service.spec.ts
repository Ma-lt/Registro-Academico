import { TestBed, inject } from '@angular/core/testing';

import { AdminInstitucionService } from './admin-institucion.service';

describe('AdminInstitucionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminInstitucionService]
    });
  });

  it('should be created', inject([AdminInstitucionService], (service: AdminInstitucionService) => {
    expect(service).toBeTruthy();
  }));
});
