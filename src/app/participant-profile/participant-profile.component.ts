import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { GlobalStateService } from 'app/services/global-state.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {

  public codi_participant: string;
  public participant: Participant;
  
  constructor(private _ds: DataService, 
    private route: ActivatedRoute, 
    private _gfs: GlobalFunctionsService,
    private _gss: GlobalStateService
    ) {
    this.route.paramMap.subscribe(params => {
      this.codi_participant = params.get("codi");
      this._ds.getParticipantByCodeWithFreeThrows(this.codi_participant).subscribe(res => {
        this.participant = res;
        this.generateCharts();
      });
    });
  }

  ngOnInit(): void {
  }

  getFormatedTirs(index?: number): string {
    return this.participant.getTirsLliuresAnotats(index) + '/' + this.participant.getTirsLliuresTirats(index);
  }

  getPercentage(index?: number): string {
    if (index != null) {
      return this._gfs.decimalRound(this.participant.seriesTLL[index].percentatge) + '%';
    }
    let tirats: number = this.participant.getTirsLliuresTirats(index);
    if (tirats > 0) {
      let value: number = this.participant.getTirsLliuresAnotats(index) / tirats * 100;
      return this._gfs.decimalRound(value) + '%';
    }
    return null;
  }

  getSequenciaPercentages(): number[] {
    let percentages: number[] = [];
    for (let serie of this.participant.seriesTLL) {
      let lliures = this._gss.tirsLliures - 1;
      while(lliures >= 0) {
        if (percentages[lliures] != null) percentages[lliures] += serie.getTir(lliures);
        else percentages[lliures] = serie.getTir(lliures);
        --lliures;
      }
    }
    for (let i in percentages) {
      percentages[i] = parseInt(this._gfs.decimalRound(percentages[i] / this.participant.seriesTLL.length * 100));
    }
    return percentages;
  }

  private generateCharts() {
    const dataFreeThrowsChart: any = {
      labels: [],
      series: []
    };
    let freeThrowsMade: number[] = [];
    let jornada: number = 1;
    while (jornada <= this.participant.seriesTLL.length) {
      dataFreeThrowsChart['labels'].push("J" + jornada);
      freeThrowsMade.push(this.participant.seriesTLL[jornada - 1].anotats);
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
