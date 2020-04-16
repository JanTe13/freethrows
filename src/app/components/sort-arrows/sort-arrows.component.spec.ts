import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortArrowsComponent } from './sort-arrows.component';

describe('SortArrowsComponent', () => {
  let component: SortArrowsComponent;
  let fixture: ComponentFixture<SortArrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortArrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
