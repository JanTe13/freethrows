import { Injectable } from '@angular/core';
import { Participant } from 'app/models/participant';
import { Serie } from 'app/models/Serie';

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
    return new Serie(
      value['key'],
      tir['codi_participant'],
      tir['sequencia'],
      tir['jornada']
    );
  }

}
