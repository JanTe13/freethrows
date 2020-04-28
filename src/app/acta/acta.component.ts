import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { GlobalStateService } from 'app/services/global-state.service';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { Serie, ShotStatus } from 'app/models/Serie';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit {

  public participants: Participant[] = [];
  public pendents: Participant[] = [];
  public participant: Participant;
  public rebotejadors: Participant[];
  public jornada: number = 3;

  public globalSt: GlobalStateService;

  constructor(private _ds: DataService, private _gss: GlobalStateService) {
    this._ds.getAllParticipants().subscribe(res => {
      res.forEach(p => {
        this.participants.push(p);
        this.pendents.push(p);
      });
      this.refreshTirador();
    });

    this.globalSt = this._gss;
  }

  ngOnInit(): void {
  }

  refreshRebotejadors(index: number = 0, lap: boolean = false): void {
    if (this.rebotejadors.length < this._gss.rebotejadors) {
      if (index < this.pendents.length) {
        this.rebotejadors.push(this.pendents[index]);
        this.refreshRebotejadors(index + 1);
      }
      else {
        if (!lap) index = 0;
        this.rebotejadors.push(this.participants[index]);
        this.refreshRebotejadors(index + 1, true);
      }
    }
  }

  next(): void {
    this._ds.saveSerie(this.participant.getSerieTLL(this.jornada));
    console.log("Sèrie guardada correctament");
    this.refreshTirador();
  }

  private refreshTirador(): void {
    this.participant = this.pendents[0];
    this.pendents.splice(0, 1);
    this.rebotejadors = [];
    this.refreshRebotejadors();
    this.participant.addSerieTirsLliures(
      new Serie(
        this.participant.codi + "_" + this.jornada, 
        this.participant.codi,
        Array(this._gss.tirsLliures).fill(ShotStatus.Neutral),
        this.jornada
      )
    );
  }
}
