import { TestBed } from '@angular/core/testing';

import { ShopListService } from './shop-list.service';

describe('ShopListServiceService', () => {
  let service: ShopListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
