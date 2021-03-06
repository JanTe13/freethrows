import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Participant } from 'app/models/participant';
import { ModelConversorService } from './model-conversor.service';
import { Serie } from 'app/models/serie';
import { Observable } from 'rxjs';
import { Configuracio } from 'app/configuration/configuration.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _db: AngularFireDatabase, private _mc: ModelConversorService) { }

  public loadConfiguration(): Observable<any> {
    return new Observable(observer => {
      this._db.list('configuracio').snapshotChanges()
      .subscribe(res => {
        observer.next(res)
      });
    })
  }

  public getAllParticipants(): Observable<Participant[]> {
    return new Observable(observer => {
      this._db.list('/participants').snapshotChanges()
      .subscribe(res => {
        let participants: Participant[] = [];
        res.forEach(p => participants.push(this._mc.jsonToParticipant(p)));
        observer.next(participants);
      });
    });
  }

  public getParticipantByCode(codi: string): Observable<Participant> {
    return new Observable(observer => {
      this._db.list('/participants/' + codi).snapshotChanges()
      .subscribe(res => {
        let participant: Participant = new Participant(codi);
        res.forEach(f => {
          let field = f.payload.toJSON();
          participant[f['key']] = field;
        });
        observer.next(participant);
      });
    });
  }

  public getFreeThrows(codi?: string): Observable<Serie[]> {
    return new Observable(observer => {
      this._db.list('/series', codi ? ref => ref.orderByChild('codi_participant').equalTo(codi) : null).snapshotChanges()
      .subscribe(res => {
        let lliures: Serie[] = [];
        res.forEach(t => lliures.push(this._mc.jsonToFreeThrow(t)));
        observer.next(lliures);
      });
    });
  }

  public getAllParticipantsWithFreeThrows(): Observable<Participant[]> {
    return new Observable(observer => {
      this.getAllParticipants().subscribe(res => {
        let participants: Participant[] = res;
        // Càrrega de tirs lliures
        this.getFreeThrows().subscribe(res => {
          res.forEach(ll => {
            let index = participants.findIndex(p => p.codi === ll.codiParticipant);
            if (index >= 0) {
              participants[index].addSerieTirsLliures(ll);
            }
          });
          observer.next(participants);
        });
      });
    })
  }

  public getParticipantByCodeWithFreeThrows(codi: string): Observable<Participant> {
    return new Observable(observer => {
      this.getParticipantByCode(codi).subscribe(res => {
        let participant: Participant = res;
        // Càrrega de tirs lliures
        this.getFreeThrows(participant.codi).subscribe(res => {
          res.forEach(ll => participant.addSerieTirsLliures(ll));
          observer.next(participant);
        })
      });
    });
  }

  public saveSerie(serie: Serie): void {
    let sequencia: any ={};
    serie.sequencia.forEach((tir, i) => {
      sequencia[i] = tir;
    })

    this._db.database.ref('/series/' + serie.codi).set({
      'codi_participant': serie.codiParticipant,
      'jornada': serie.jornada,
      'sequencia': sequencia
    });
  }

  public saveConfiguration(config: Configuracio): void {
    this._db.database.ref('/configuracio').set({
      'jornades': config.jornades,
      'rebotejadors': config.rebotejadors,
      'tirsLliures': config.tirsLL
    });
  }

}
