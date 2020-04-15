import { TestBed } from '@angular/core/testing';

import { ModelConversorService } from './model-conversor.service';

describe('ModelConversorService', () => {
  let service: ModelConversorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelConversorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
