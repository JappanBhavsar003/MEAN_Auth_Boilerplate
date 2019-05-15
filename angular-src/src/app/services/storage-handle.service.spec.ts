import { TestBed } from '@angular/core/testing';

import { StorageHandleService } from './storage-handle.service';

describe('StorageHandleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageHandleService = TestBed.get(StorageHandleService);
    expect(service).toBeTruthy();
  });
});
