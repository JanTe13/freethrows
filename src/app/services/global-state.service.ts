import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private _jornades: any[] = [];
  private _tirsLliures: number;
  private _rebotejadors: number;

  constructor() { }

  get jornades(): any {
    return this._jornades;
  }

  set jornades(value: any) {
    this._jornades.splice(0);
    for (let i in value) {
      this._jornades.push(value[i]);
    }
  }

  get tirsLliures(): number {
    return this._tirsLliures;
  }

  set tirsLliures (value: number) {
    this._tirsLliures = value;
  }

  get rebotejadors(): number {
    return this._rebotejadors;
  }

  set rebotejadors(value: number) {
    this._rebotejadors = value;
  }
}
