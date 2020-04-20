import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { GlobalStateService } from 'app/services/global-state.service';

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
      this._ds.getParticipantByCodeWithFreeThrows(this.codi_participant).then(res => {
        this.participant = res;
      })
      .catch(error => console.log(error));
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

}
