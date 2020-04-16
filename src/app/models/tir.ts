export class Tir {

    private _codi: string;
    private _codiParticipant: string;
    private _anotats: string;
    private _jornada: number;

    constructor(codi: string, codiParticipant: string, anotats: string, jornada: number) {
        this.codi = codi;
        this.codiParticipant = codiParticipant;
        this.anotats = anotats;
        this.jornada = jornada;
    }

    get codi(): string {
        return this._codi;
    }

    set codi(value: string) {
        this._codi = value;
    }

    get codiParticipant(): string {
        return this._codiParticipant;
    }

    set codiParticipant(value: string) {
        this._codiParticipant = value;
    }

    get anotats(): string {
        return this._anotats;
    }

    set anotats(value: string) {
        this._anotats = value;
    }

    get jornada(): number {
        return this._jornada;
    }

    set jornada(value: number) {
        this._jornada = value;
    }

}
