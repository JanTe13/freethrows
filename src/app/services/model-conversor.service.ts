import { Injectable } from '@angular/core';
import { Participant } from 'app/models/participant';
import { Serie, ShotStatus } from 'app/models/Serie';

@Injectable({
  providedIn: 'root'
})
export class ModelConversorService {

  constructor() { }

  public jsonToParticipant(value: any): Participant {
    let participant = value.payload.toJSON();
    return new Participant(
      value['key'],
      participant['nom'],
      participant['sexe'],
      participant['curs']
    );
  }

  public jsonToFreeThrow(value: any): Serie {
    let tir = value.payload.toJSON();
    let sequencia: ShotStatus[] = [];
    for (let i in tir['sequencia']) {
      let status: ShotStatus;
      switch(tir['sequencia'][i]) {
        case 0:
          status = ShotStatus.Missed;
          break;
        case 2:
          status = ShotStatus.Made;
          break;
        default:
          status = ShotStatus.Neutral;
      }
      sequencia.push(status);
    };
    return new Serie(
      value['key'],
      tir['codi_participant'],
      sequencia,
      tir['jornada']
    );
  }

}
