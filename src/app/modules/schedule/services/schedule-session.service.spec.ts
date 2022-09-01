import { TestBed } from '@angular/core/testing';

import { ScheduleSessionService } from './schedule-session.service';

describe('ScheduleSessionService', () => {
  let service: ScheduleSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
