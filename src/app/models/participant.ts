import { Tir } from "./tir";

export class Participant {
    private _codi: string;
    private _nom: string;
    private _sexe: string;
    private _curs: string;
    private _tirsLliures: any = {};

    constructor(codi: string, nom: string, sexe: string, curs: string) {
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

    get tirsLliures(): any {
        return this._tirsLliures;
    }

    set tirsLliures(value: any) {
        this._tirsLliures = value;
    }

    public getSequenciaTirsLliuresJornada(jornada: number): string {
        return this._tirsLliures[jornada];
    }

    public getTotalTirsLliuresJornada(jornada: number): number {
        let seq: string = this._tirsLliures[jornada];
        let total: number = 0;
        if (seq) {
            for (let tir of seq) {
                total += parseInt(tir);
            }
        }

        return total;
    }

    get totalTirsLliures(): number {
        let total: number = 0;
        for (let jornada in this._tirsLliures) {
            total += this.getTotalTirsLliuresJornada(parseInt(jornada));
        }
        return total;
    }

    addSequenciaTirsLliuresJornada(lliures: Tir): void {
        this._tirsLliures[lliures.jornada] = lliures.anotats;
    }

}
