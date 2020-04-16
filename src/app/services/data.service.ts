import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Participant } from 'app/models/participant';
import { ModelConversorService } from './model-conversor.service';
import { Tir } from 'app/models/tir';

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

  public getAllFreeThrows(): Promise<Tir[]> {
    return new Promise((resolve, reject) => {
      this._db.list('/tirs_lliures').snapshotChanges()
      .subscribe(res => {
        let lliures: Tir[] = [];
        res.forEach(t => lliures.push(this._mc.jsonToFreeThrow(t)));
        resolve(lliures);
      },
      (error) => reject(error));
    });
  }
}
