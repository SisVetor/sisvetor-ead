

import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { NgForage } from "ngforage";
import { getLocalRepositoryName } from '../_shared/_util/util';
import Usuario from "../model/Usuario";
import { laboratorioStoreName, pitStoreName, Unidade } from "./config";


@Injectable({
    providedIn: "root",
})
export class UnidadeOfflineService {
    table: Dexie.Table<Unidade, number>;

    constructor(private ngf: NgForage) {}

    getAllPits(usuario: Usuario): Promise<Unidade[]> {
        return this.ngf.getItem(getLocalRepositoryName(pitStoreName, usuario));
    }

    addAllPits(data: Unidade[], usuario: Usuario) {
        return this.ngf.setItem(getLocalRepositoryName(pitStoreName, usuario), data);
    }

    getAllLaboratorios(usuario: Usuario): Promise<Unidade[]> {
        return this.ngf.getItem(getLocalRepositoryName(laboratorioStoreName, usuario));
    }

    addAllLaboratorios(data: Unidade[], usuario: Usuario) {
        return this.ngf.setItem(getLocalRepositoryName(laboratorioStoreName, usuario), data);
    }
}