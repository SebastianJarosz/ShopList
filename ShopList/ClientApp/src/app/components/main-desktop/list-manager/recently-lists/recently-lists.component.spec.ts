import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyListsComponent } from './recently-lists.component';

describe('RecentlyListsComponent', () => {
  let component: RecentlyListsComponent;
  let fixture: ComponentFixture<RecentlyListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
