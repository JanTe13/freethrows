import { Serie } from "./Serie";

export class Participant {
    private _codi: string;
    private _nom: string;
    private _sexe: string;
    private _curs: string;
    private _seriesTLL: Serie[] = [];

    constructor(codi?: string, nom?: string, sexe?: string, curs?: string) {
        this.codi = codi;
        this.nom = nom;
        this.sexe = sexe;
        this.curs = curs;
    }

    get codi(): string {
        return this._codi;
    }

    set codi(value: string) {
        this._codi = value;
    }

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get sexe(): string {
        return this._sexe;
    }

    set sexe(value: string) {
        this._sexe = value;
    }

    get curs(): string {
        return this._curs;
    }

    set curs(value: string) {
        this._curs = value;
    }

    get seriesTLL(): Serie[] {
        return this._seriesTLL;
    }

    set seriesTLL(value: Serie[]) {
        this._seriesTLL = value;
    }

    get totalTirsLliures(): number {
        let total: number = 0;
        for (let t of this.seriesTLL) {
            if (t) total += t.anotats;
        }
        return total;
    }

    public getSequenciaTirsLliures(jornada: number): string {
        return this.getSerieTLL(jornada) ? this.getSerieTLL(jornada).sequencia : null;
    }

    public getTirsLliuresAnotats(jornada?: number): number {
        if (jornada != null) return this.getSerieTLL(jornada).anotats;
        return this.totalTirsLliures;
    }

    getTirsLliuresTirats(jornada?: number): number {
        if (jornada != null) return this.getSerieTLL(jornada).tirats;
        let total: number = 0;
        for (let t of this.seriesTLL) {
            if (t) total += t.tirats;
        }
        return total;
    }

    addSerieTirsLliures(serie: Serie): void {
        let index: number = this.seriesTLL.findIndex(s => s.jornada === serie.jornada);
        if (index >= 0) {
            this.seriesTLL[index] = serie;
        }
        else this.seriesTLL.push(serie);
    }

    getSerieTLL(jornada: number): Serie {
        let index =  this.seriesTLL.findIndex(s => s.jornada === jornada);
        if (index >= 0) return this.seriesTLL[index];
        return null;
    }

}
