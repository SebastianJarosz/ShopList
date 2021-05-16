import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardListsComponent } from './list-card-lists.component';

describe('ListCardListsComponent', () => {
  let component: ListCardListsComponent;
  let fixture: ComponentFixture<ListCardListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
