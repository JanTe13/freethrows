import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { Serie } from 'app/models/Serie';
import { Participant } from 'app/models/participant';
import { GlobalStateService } from 'app/services/global-state.service';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { Router } from '@angular/router';

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

  constructor(private _ds: DataService, 
    private _gss: GlobalStateService, 
    private _gfs: GlobalFunctionsService, 
    private router: Router) {
    this.loadGeneralListData();
  }

  ngOnInit() {
  }

  showFormatedFreeThrows(participant: Participant, index: number): string {
    if (!participant.seriesTLL[index] || participant.seriesTLL[index].tirats == 0) return "-";
    return participant.getTirsLliuresAnotats(index).toString();
  }

  sortList(field: string, params?: any, paramName?: string): void {
    let auxField: string = params ? params[paramName] : field;
    this._currentSortType = (auxField === this._currentSortField ? !this._currentSortType : true);
    this._gfs.sortArray(this.participants, field, params ? params[paramName]: null, this._currentSortType);
    this._currentSortField = auxField;
  }

  getCurrentSortType(field: string): boolean {
    return this._currentSortField === field ? this._currentSortType : null;
  }

  goToParticipant(participant: Participant) {
    this.router.navigate(['/participant', { codi: participant.codi }]);
  }

  private loadGeneralListData() {
    // Càrrega de participants
    this._ds.getAllParticipantsWithFreeThrows().then(res => this.participants = res)
    .catch(error => console.log(error));
    
    // Càrrega de jornades
    this.jornades = this._gss.jornades;
  }

}
