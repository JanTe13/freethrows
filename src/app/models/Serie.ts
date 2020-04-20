export class Serie {

    private _codi: string;
    private _codiParticipant: string;
    private _sequencia: string;
    private _jornada: number;
    private _anotats: number;
    private _tirats: number;
    private _percentatge: number;

    constructor(codi?: string, codiParticipant?: string, sequencia?: string, jornada?: number) {
        this.codi = codi;
        this.codiParticipant = codiParticipant;
        this.sequencia = sequencia;
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

    get sequencia(): string {
        return this._sequencia;
    }

    set sequencia(value: string) {
        this._sequencia = value;
        this._tirats = value.length;
        this._anotats = value.split('1').length - 1;
        this._percentatge = this.anotats / this.tirats * 100;
    }

    get jornada(): number {
        return this._jornada;
    }

    set jornada(value: number) {
        this._jornada = value;
    }

    get tirats(): number {
        return this._tirats;
    }

    get anotats(): number {
        return this._anotats;
    }

    get percentatge(): number {
        return this._percentatge;
    }

    public getTir(index: number): number {
        return parseInt(this.sequencia.split('')[index]);
    }

}
