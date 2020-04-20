import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Participant } from 'app/models/participant';
import { ModelConversorService } from './model-conversor.service';
import { Serie } from 'app/models/Serie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _db: AngularFireDatabase, private _mc: ModelConversorService) { }

  public loadConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._db.list('configuracio').snapshotChanges()
      .subscribe(res => {
        resolve(res)
      },
      (error) => reject(error));
    })
  }

  public getAllParticipants(): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
      this._db.list('/participants').snapshotChanges()
      .subscribe(res => {
        let participants: Participant[] = [];
        res.forEach(p => participants.push(this._mc.jsonToParticipant(p)));
        resolve(participants);
      },
      (error) => reject(error));
    });
  }

  public getAllParticipantsWithFreeThrows(): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
      this.getAllParticipants().then(res => {
        let participants: Participant[] = res;
        // Càrrega de tirs lliures
        this.getAllFreeThrows().then(res => {
          res.forEach(ll => {
            let index = participants.findIndex(p => p.codi === ll.codiParticipant);
            if (index >= 0) {
              participants[index].addSequenciaTirsLliures(ll);
            }
          });
          resolve(participants);
        })
        .catch(error => reject(error));
      })
      .catch(error => reject(error));
    })
  }

  public getAllFreeThrows(): Promise<Serie[]> {
    return new Promise((resolve, reject) => {
      this._db.list('/series').snapshotChanges()
      .subscribe(res => {
        let lliures: Serie[] = [];
        res.forEach(t => lliures.push(this._mc.jsonToFreeThrow(t)));
        resolve(lliures);
      },
      (error) => reject(error));
    });
  }

  public getParticipantByCode(codi: string): Promise<Participant> {
    return new Promise((resolve, reject) => {
      this._db.list('/participants/' + codi).snapshotChanges()
      .subscribe(res => {
        let participant: Participant = new Participant(codi);
        res.forEach(f => {
          let field = f.payload.toJSON();
          participant[f['key']] = field;
        });
        resolve(participant);
      },
      (error) => reject(error));
    });
  }

  public getParticipantByCodeWithFreeThrows(codi: string): Promise<Participant> {
    return new Promise((resolve, reject) => {
      this.getParticipantByCode(codi).then(res => {
        let participant: Participant = res;
        // Càrrega de tirs lliures
        this.getAllFreeThrows().then(res => {
          res.forEach(ll => {
            if (ll.codiParticipant == codi) {
              participant.addSequenciaTirsLliures(ll);
            }
          });
          resolve(participant);
        })
      })
      .catch(error => reject(error));
    });
  }

}
