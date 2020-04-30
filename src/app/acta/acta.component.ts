import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { GlobalStateService } from 'app/services/global-state.service';
import { take } from 'rxjs/operators';
import { Serie, ShotStatus } from 'app/models/Serie';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit {

  public participants: Participant[] = [];
  public participant: Participant;
  public indexTirador: number = 0;
  public rebotejadors: Participant[];
  public serie: Serie;
  public globalSt: GlobalStateService;

  private _jornada: number = 1;

  constructor(private _ds: DataService, private _gss: GlobalStateService) {
    this.loadParticipants();
    this.globalSt = this._gss;
  }

  ngOnInit(): void {
  }

  get jornada() {
    return this._jornada;
  }

  setJornada(value: number) {
    this._jornada = value;
    this.indexTirador = 0;
    this.setTirador(this.participants[this.indexTirador]);
  }

  getRebotejadors(rebotejadors: Participant[] = [], index: number = this.indexTirador + 1): Participant[] {
    if (rebotejadors.length >= this._gss.rebotejadors) return rebotejadors;
    if (index >= this.participants.length) {
      index = 0;
    }
    rebotejadors.push(this.participants[index]);
    return this.getRebotejadors(rebotejadors, index + 1);
  }

  next(nextJornada: boolean = false): void {
    this._ds.saveSerie(this.serie);
    this.participant.addSerieTirsLliures(this.serie);
    if (!nextJornada) {
      this.indexTirador ++;
      this.setTirador(this.participants[this.indexTirador]);
    }
    else this.setJornada(this.jornada === this._gss.jornades.length ? 0 : this.jornada + 1);
  }

  isCurrentTirador(participant: Participant): boolean {
    return participant.codi === this.participant.codi;
  }

  hasSerieTirada(participant: Participant): boolean {
    return participant.getSerieTLL(this.jornada) != null;
  }

  isLastTirador(): boolean {
    return this.indexTirador === this.participants.length - 1;
  }

  setTirador(participant: Participant): void {
    this.indexTirador = this.participants.findIndex(p => p.codi === participant.codi);
    this.participant = participant;
    this.loadDataTirador();
    this.rebotejadors = this.getRebotejadors();
  }

  private loadDataTirador():void {
    if (this.participant.getSerieTLL(this.jornada) == null) {
      this.serie = new Serie(
        this.participant.codi + "_" + this.jornada, 
        this.participant.codi,
        Array(this._gss.tirsLliures).fill(ShotStatus.Neutral),
        this.jornada
      );
    }
    else this.serie = this.participant.getSerieTLL(this.jornada).clone();
  }

  private loadParticipants(): void {
    this._ds.getAllParticipantsWithFreeThrows().pipe(take(1)).subscribe(res => {
      res.forEach(p => {
        this.participants.push(p);
      });
      this.setTirador(this.participants[this.indexTirador]);
    });
  }
}
