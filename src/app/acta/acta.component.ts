import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { GlobalStateService } from 'app/services/global-state.service';
import { take } from 'rxjs/operators';
import { Serie, ShotStatus } from 'app/models/serie';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'app/components/dialog/dialog.component';

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

  constructor(private _ds: DataService, private _gss: GlobalStateService, public dialog: MatDialog) {
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

  next(): void {
    if (this.serie.sequencia.find(tir => tir == ShotStatus.Neutral) != null) {
      this.openDialog();
    }
    else {
      this.saveSerie();
    }
  }

  previous(): void {
    this.indexTirador --;
    this.setTirador(this.participants[this.indexTirador]);
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

  isFirstTirador(): boolean {
    return this.indexTirador === 0;
  }

  setTirador(participant: Participant): void {
    this.indexTirador = this.participants.findIndex(p => p.codi === participant.codi);
    this.participant = participant;
    this.loadDataTirador();
    this.rebotejadors = this.getRebotejadors();
  }

  showStats(): boolean {
    return !this.participant || this.participant.seriesTLL == null || this.participant.seriesTLL.length > 0;
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: "Sèrie incompleta",
        text: "Hi ha tirs de la sèrie sense marcar.",
        secText: "Vols continuar i guardar la sèrie incompleta?"
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      console.log('The dialog was closed');
      if (confirm) this.saveSerie();
    });
  }

  private saveSerie(): void {
    this._ds.saveSerie(this.serie);
    this.participant.addSerieTirsLliures(this.serie);
    if (!this.isLastTirador()) {
      this.indexTirador ++;
      this.setTirador(this.participants[this.indexTirador]);
    }
    else this.setJornada(this.jornada === this._gss.jornades.length ? 1 : this.jornada + 1);
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
