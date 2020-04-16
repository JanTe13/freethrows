import { Injectable } from '@angular/core';
import { Participant } from 'app/models/participant';
import { Tir } from 'app/models/tir';

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

  public jsonToFreeThrow(value: any): Tir {
    let tir = value.payload.toJSON();
    return new Tir(
      value['key'],
      tir['codi_participant'],
      tir['anotats'],
      tir['jornada']
    );
  }

}
