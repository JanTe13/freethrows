import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { Tir } from 'app/models/tir';
import { Participant } from 'app/models/participant';
import { GlobalStateService } from 'app/services/global-state.service';
import { GlobalFunctionsService } from 'app/services/global-functions.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public participants: Participant[] = [];
  public jornades: any[];

  // Ordenació
  private _currentSortField: string;
  private _currentSortType: boolean;

  constructor(private _ds: DataService, private _gss: GlobalStateService, private _gfs: GlobalFunctionsService) {
    this.loadGeneralListData();
  }

  ngOnInit() {
  }

  showFormatedFreeThrows(participant: Participant, jornada: number): string {
    if (participant.getSequenciaTirsLliuresJornada(jornada) == null) return "-";
    return participant.getTotalTirsLliuresJornada(jornada).toString();
  }

  sortList(field: string, params?: any): void {
    let auxField: string = params ? params['jornada'] : field;
    this._currentSortType = (auxField === this._currentSortField ? !this._currentSortType : true);
    this._gfs.sortArray(this.participants, field, params ? params['jornada']: null, this._currentSortType);
    this._currentSortField = auxField;
  }

  getCurrentSortType(field: string): boolean {
    return this._currentSortField === field ? this._currentSortType : null;
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
