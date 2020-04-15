import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public participants: any[] = [];
  public jornades: any[] = [];

  constructor(db: AngularFireDatabase) {
    db.list('/participants').snapshotChanges().subscribe(res => {
      res.forEach(p => {
        const part = p.payload.toJSON();
        part['codi'] = p.key;
        this.participants.push(part);
      });

      db.list('/tirs_lliures').snapshotChanges().subscribe(res => {
        res.forEach(t => {
          const tirs = t.payload.toJSON();
          let index = this.participants.findIndex(p => p.codi === tirs['codi_participant']);
          if (index >= 0) {
            if (!this.participants[index]['tirs_lliures']) this.participants[index]['tirs_lliures'] = {};
            this.participants[index]['tirs_lliures'][tirs['jornada']] = tirs['anotats'];
          }
        });
      });
    });

    db.list('/configuracio/jornades').snapshotChanges().subscribe(res => {
      res.forEach(j => {
        const jorn = j.payload.toJSON();
        this.jornades.push(jorn);
      });
    });
  }

  ngOnInit() {
  }

  getFreeThrowsSum(participant: any): number {
    if (!participant['tirs_lliures']) return 0;
    else {
      let total: number = 0;
      for (let i in participant['tirs_lliures']) {
        total += participant['tirs_lliures'][i];
      }
      return total;
    }
  }

}
