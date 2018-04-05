import { TestBed, inject } from '@angular/core/testing';

import { AdminEscuelaService } from './admin-escuela.service';

describe('AdminEscuelaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEscuelaService]
    });
  });

  it('should be created', inject([AdminEscuelaService], (service: AdminEscuelaService) => {
    expect(service).toBeTruthy();
  }));
});
