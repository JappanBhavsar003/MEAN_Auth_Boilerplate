import { TestBed } from '@angular/core/testing';

import { ShowMsgService } from './show-msg.service';

describe('ShowMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowMsgService = TestBed.get(ShowMsgService);
    expect(service).toBeTruthy();
  });
});
