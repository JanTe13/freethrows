import { Component} from '@angular/core';
import { DataService } from './services/data.service';
import { GlobalStateService } from './services/global-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _ds: DataService, private _gss: GlobalStateService) {
    // Càrrega de la configuració
    this._ds.loadConfiguration().then(res => {
      res.forEach(c => {
        let config = c.payload.toJSON();
        this._gss[c['key']] = config;
      })
    })
    .catch(error => console.log(error));
  }

}
