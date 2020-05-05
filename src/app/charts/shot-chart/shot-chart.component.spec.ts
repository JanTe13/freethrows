import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotChartComponent } from './shot-chart.component';

describe('ShotChartComponent', () => {
  let component: ShotChartComponent;
  let fixture: ComponentFixture<ShotChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShotChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
