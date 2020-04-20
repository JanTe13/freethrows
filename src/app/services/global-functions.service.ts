import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor(private _decimalPipe: DecimalPipe) { }

  sortArray(array: any[], field: string, param?: any, desc: boolean = true) {
    array.sort((a, b) => {
      if (param == null && a[field] > b[field] || param != null && a[field](param) > b[field](param)) {
        return desc ? 1 : -1;
      }
      if (param == null && a[field] < b[field] || param != null && a[field](param) < b[field](param)) {
        return desc ? -1 : 1;
      }
      return 0;
    });
  }

  decimalRound(value: number, round: string = '1.0-1'): string {
    return this._decimalPipe.transform(value, round);
  }
}
