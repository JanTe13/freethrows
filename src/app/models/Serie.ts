export enum ShotStatus {
    Missed,
    Neutral,
    Made
}

export class Serie {

    private _codi: string;
    private _codiParticipant: string;
    private _sequencia: any;
    private _jornada: number;

    constructor(codi?: string, codiParticipant?: string, sequencia: ShotStatus[] = [], jornada?: number) {
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

    get sequencia(): any {
        return this._sequencia;
    }

    set sequencia(value: any) {
        this._sequencia = value;
    }

    get jornada(): number {
        return this._jornada;
    }

    set jornada(value: number) {
        this._jornada = value;
    }

    get tirats(): number {
        return this.sequencia.length;
    }

    get anotats(): number {
        let anotats: number = 0;
        this.sequencia.forEach(tir => {
            if (tir === ShotStatus.Made) anotats ++;
        });
        return anotats;
    }

    get percentatge(): number {
        return (this.anotats / this.tirats) * 100;
    }

    public addTir(index: number, resultat: ShotStatus) {
        this.sequencia.splice(index, 1, resultat);
    }

    public clone() {
        let serie = new Serie(this.codi, this.codiParticipant, [], this.jornada);
        this.sequencia.forEach((t, i) => serie.addTir(i, t));

        return serie;
    }

}
