import { Component, OnInit, Input } from '@angular/core';
import { Serie, ShotStatus } from 'app/models/serie';
import { GlobalStateService } from 'app/services/global-state.service';
import { GlobalFunctionsService } from 'app/services/global-functions.service';

@Component({
  selector: 'app-shot-chart',
  templateUrl: './shot-chart.component.html',
  styleUrls: ['./shot-chart.component.css']
})
export class ShotChartComponent implements OnInit {

  @Input() set series(value: Serie[]) {
    if (value) {
      this.generatePercentages(value);
    }
  }
  @Input() bigChart: boolean = false;

  public percentages: number[];
  public globalFS = this._gfs;

  constructor(private _gss: GlobalStateService, private _gfs: GlobalFunctionsService) { }

  ngOnInit(): void {
  }

  generatePercentages(series: Serie[]): number[] {
    this.percentages = Array(this._gss.tirsLliures).fill(0);
    for (let serie of series) {
      let tir = this._gss.tirsLliures - 1;
      while(tir >= 0) {
        this.percentages[tir] += serie.sequencia[tir] === ShotStatus.Made ? 1 : 0;
        --tir;
      }
    }
    if (series.length > 0) {
      for (let i in this.percentages) {
        this.percentages[i] = parseInt(this._gfs.decimalRound(this.percentages[i] / series.length * 100));
      }
    }

    return this.percentages;
  }

  getColorClass(pTir: number): string {
    if (pTir >= 75 && pTir <= 100) return 'made';
    if (pTir < 75 && pTir >= 50) return 'good';
    if (pTir < 75 && pTir >= 50) return 'regular';
    return 'missed';
  }

}
