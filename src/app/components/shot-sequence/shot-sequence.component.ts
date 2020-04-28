import { Component, OnInit, Input } from '@angular/core';
import { ShotStatus } from 'app/models/Serie';

@Component({
  selector: 'app-shot-sequence',
  templateUrl: './shot-sequence.component.html',
  styleUrls: ['./shot-sequence.component.css']
})
export class ShotSequenceComponent implements OnInit {

  @Input() shotSequence: ShotStatus[];
  @Input() shotsPercentage: number[] = [];
  @Input() edition: boolean = false;

  public shotSt: any = ShotStatus;

  constructor() {}

  ngOnInit(): void {
  }

  setActive(index: number, value: ShotStatus) {
    this.shotSequence[index] = value;
    
  }

  isActive(index: number, value: ShotStatus) {
    return this.shotSequence[index] === value;
  }

}