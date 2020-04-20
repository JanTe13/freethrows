import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shot-sequence',
  templateUrl: './shot-sequence.component.html',
  styleUrls: ['./shot-sequence.component.css']
})
export class ShotSequenceComponent implements OnInit {

  public shots: number[];
  @Input() set shotSequence(value: string) {
    this.shots = value ? this.convertToArray(value): [];
  };
  @Input() shotsPercentage: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  private convertToArray(sequence: string): number[] {
    let res: number[] = [];
    for (let shot of sequence) {
      res.push(parseInt(shot));
    }
    return res;
  }

}
