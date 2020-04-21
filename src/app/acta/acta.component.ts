import { Component, OnInit } from '@angular/core';
import { Participant } from 'app/models/participant';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit {

  public participants: Participant[] = [];
  public rebotejadors: Participant[] = [];
  public pendents: Participant[] = [];
  public indexTirador: number = 0;

  constructor(private _ds: DataService) {
    this._ds.getAllParticipants().subscribe(res => {
      res.forEach(participant => this.participants.push(participant));
      res.splice(this.indexTirador, 1);
      this.pendents = res;
    });
  }

  ngOnInit(): void {
  }

  // getRebotejadors(): Participant[] {
  //   if (this.)
  // }
}
