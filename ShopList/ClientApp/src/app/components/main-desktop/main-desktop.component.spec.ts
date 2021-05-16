import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDesktopComponent } from './main-desktop.component';

describe('MainDesktopComponent', () => {
  let component: MainDesktopComponent;
  let fixture: ComponentFixture<MainDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
