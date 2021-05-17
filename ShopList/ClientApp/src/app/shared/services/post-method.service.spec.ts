import { TestBed } from '@angular/core/testing';

import { PostMethodService } from './post-method.service';

describe('PostMethodService', () => {
  let service: PostMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
