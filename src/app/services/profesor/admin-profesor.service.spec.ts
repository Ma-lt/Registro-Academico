import { TestBed, inject } from '@angular/core/testing';

import { AdminProfesorService } from './admin-profesor.service';

describe('AdminProfesorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminProfesorService]
    });
  });

  it('should be created', inject([AdminProfesorService], (service: AdminProfesorService) => {
    expect(service).toBeTruthy();
  }));
});
