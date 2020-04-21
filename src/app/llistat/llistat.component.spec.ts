import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlistatComponent } from './llistat.component';

describe('LlistatComponent', () => {
  let component: LlistatComponent;
  let fixture: ComponentFixture<LlistatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlistatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlistatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
