import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {

  public codi_participant: string;
  public participant: Participant;
  
  constructor(private _ds: DataService, private route: ActivatedRoute, private _decimalPipe: DecimalPipe) {
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
    let tirats: number = this.participant.getTirsLliuresTirats(index);
    if (tirats && tirats > 0) {
      let div: number = this.participant.getTirsLliuresAnotats(index) / tirats;
      let perc: string = this._decimalPipe.transform(div * 100, "1.0-1");
      return perc + '%';
    }
    return null;
  }

  // getSequenciaPercentages(): number[] {

  // }

}
