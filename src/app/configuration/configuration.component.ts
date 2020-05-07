import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { GlobalStateService } from 'app/services/global-state.service';

export interface Configuracio {
  rebotejadors: number,
  tirsLL: number,
  jornades: string[]
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public config: Configuracio;
  public fitxerImport: string;

  constructor(private _ds: DataService, private _gss: GlobalStateService) {
    this.fitxerImport = null;
    this.config = {
      rebotejadors: this._gss.rebotejadors != null ? this._gss.rebotejadors : 0,
      tirsLL: this._gss.tirsLliures != null ? this._gss.tirsLliures : 1,
      jornades: ["30/06/2020", "01/07/2020", "02/07/2020", "03/07/2020", "04/07/2020", "05/07/2020"]
    }
  }

  ngOnInit(): void {
  }

  saveConfiguration() {
    this._ds.saveConfiguration(this.config);
    console.log("Configuració guardada");
  }

  importaPartcipants() {}

}
