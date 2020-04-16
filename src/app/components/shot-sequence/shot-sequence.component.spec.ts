import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotSequenceComponent } from './shot-sequence.component';

describe('ShotSequenceComponent', () => {
  let component: ShotSequenceComponent;
  let fixture: ComponentFixture<ShotSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShotSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
