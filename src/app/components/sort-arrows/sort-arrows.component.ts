import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sort-arrows',
  templateUrl: './sort-arrows.component.html',
  styleUrls: ['./sort-arrows.component.css']
})
export class SortArrowsComponent implements OnInit {

  @Input() isDesc: boolean = null;

  constructor() { }

  ngOnInit(): void {
  }

}
