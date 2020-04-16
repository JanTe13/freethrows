import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {

  constructor() { }

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
}
