import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { Participant } from 'app/models/participant';
import { GlobalStateService } from 'app/services/global-state.service';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-llistat',
  templateUrl: './llistat.component.html',
  styleUrls: ['./llistat.component.css']
})
export class LlistatComponent implements OnInit {
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
    this._ds.getAllParticipantsWithFreeThrows().subscribe(res => this.participants = res);
    
    // Càrrega de jornades
    this.jornades = this._gss.jornades;
  }

}
