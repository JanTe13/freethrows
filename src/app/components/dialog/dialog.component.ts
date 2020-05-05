import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from 'protractor';

interface DialogData {
  title: string
  text: string,
  secText?: string,
  textButton?: string
} 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onClick(confirm: boolean = false): void {
    this.dialogRef.close(confirm);
  }

  ngOnInit(): void {
  }

}
