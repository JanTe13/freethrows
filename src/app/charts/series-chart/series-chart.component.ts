import { Component, OnInit, Input } from '@angular/core';
import * as Chartist from 'chartist';
import { GlobalStateService } from 'app/services/global-state.service';
import { Serie } from 'app/models/serie';
import { Participant } from 'app/models/participant';

@Component({
  selector: 'app-series-chart',
  templateUrl: './series-chart.component.html',
  styleUrls: ['./series-chart.component.css']
})
export class SeriesChartComponent implements OnInit {

  @Input() set participant(p: Participant) {
    if (p) {
      this._participant = p;
      this.generateCharts();
    }
  }

  private _participant: Participant;

  constructor(private _gss: GlobalStateService) { }

  ngOnInit(): void {
  }

  private generateCharts() {
    const dataFreeThrowsChart: any = {
      labels: [],
      series: []
    };
    let freeThrowsMade: number[] = [];
    let jornada: number = 1;
    while (jornada <= this._gss.jornades.length) {
      dataFreeThrowsChart['labels'].push("J" + jornada);
      let serie: Serie = this._participant.getSerieTLL(jornada);
      freeThrowsMade.push(serie ? serie.anotats : 0);
      ++jornada;
    }
    dataFreeThrowsChart['series'].push(freeThrowsMade);

    const optionsFreeThrowssChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 4,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var freeThrowsChart = new Chartist.Line('#freeThrowsChart', dataFreeThrowsChart, optionsFreeThrowssChart);

    this.startAnimationForLineChart(freeThrowsChart);
  }

  private startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } 
      else if(data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq = 0;
  }

}
