import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { Tir } from 'app/models/tir';
import { Participant } from 'app/models/participant';
import { GlobalStateService } from 'app/services/global-state.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public participants: Participant[] = [];
  public jornades: any[];

  constructor(private _ds: DataService, private _gss: GlobalStateService) {
    this.loadGeneralListData();
  }

  ngOnInit() {
  }

  showFormatedFreeThrows(participant: Participant, jornada: number): string {
    if (participant.getSequenciaTirsLliuresJornada(jornada) == null) return "-";
    return participant.getTotalTirsLliuresJornada(jornada) + '-' + participant.getSequenciaTirsLliuresJornada(jornada);
  }

  private addFreeThrowsToParticipants(lliures: Tir[]): void {
    lliures.forEach(ll => {
      let index = this.participants.findIndex(p => p.codi === ll.codiParticipant);
      if (index >= 0) {
        this.participants[index].addSequenciaTirsLliuresJornada(ll);
      }
    });
  }

  private loadGeneralListData() {
    // Càrrega de participants
    this._ds.getAllParticipants().then(res => {
      this.participants = res;
      // Càrrega de tirs lliures
      this._ds.getAllFreeThrows().then(res => {
        this.addFreeThrowsToParticipants(res);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));

    // Càrrega de jornades
    this.jornades = this._gss.jornades;
  }

}
