import { TestBed } from '@angular/core/testing';

import { TokenCloudMessageService } from './token-cloud-message.service';

describe('TokenCloudMessageService', () => {
  let service: TokenCloudMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenCloudMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
