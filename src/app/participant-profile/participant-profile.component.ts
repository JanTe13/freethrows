import { Component, OnInit, OnDestroy } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctionsService } from 'app/services/global-functions.service';
import { GlobalStateService } from 'app/services/global-state.service';
import { ShotStatus } from 'app/models/serie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit, OnDestroy {

  public codi_participant: string;
  public participant: Participant;

  private _subscription: Subscription;
  
  constructor(private _ds: DataService, 
    private route: ActivatedRoute, 
    private router: Router,
    private _gfs: GlobalFunctionsService,
    private _gss: GlobalStateService
    ) {
    this.route.paramMap.subscribe(params => {
      this.codi_participant = params.get("codi");
      this._subscription = this._ds.getParticipantByCodeWithFreeThrows(this.codi_participant).subscribe(res => {
        this.participant = res;
        // this.generateCharts();
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  goToList() {
    this.router.navigate(['/llistats']);
  }

  getFormatedTirs(jornada?: number): string {
    return this.participant.getTirsLliuresAnotats(jornada) + '/' + this.participant.getTirsLliuresTirats(jornada);
  }

  getPercentage(jornada?: number): string {
    if (jornada != null) {
      return this._gfs.decimalRound(this.participant.getSerieTLL(jornada).percentatge) + '%';
    }
    let tirats: number = this.participant.getTirsLliuresTirats(jornada);
    if (tirats > 0) {
      let value: number = this.participant.getTirsLliuresAnotats(jornada) / tirats * 100;
      return this._gfs.decimalRound(value) + '%';
    }
    return null;
  }

  showStats(): boolean {
    return !this.participant || this.participant.seriesTLL == null || this.participant.seriesTLL.length > 0;
  }

}
