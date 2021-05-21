import { TestBed } from '@angular/core/testing';

import { ShopListServiceService } from './shop-list-service.service';

describe('ShopListServiceService', () => {
  let service: ShopListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
