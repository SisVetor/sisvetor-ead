import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { NgForage } from "ngforage";

import { getLocalRepositoryName } from "../../_shared/_util/util";
import Usuario from "../../model/Usuario";
import { UsuarioCurso, usuarioCursoStoreName } from "./config";

@Injectable({
    providedIn: "root",
})
export class UsuarioCursoOfflineService {
    table: Dexie.Table<UsuarioCurso, number>;

    constructor(private ngf: NgForage) {}

    async getAll(usuario: Usuario): Promise<UsuarioCurso[]> {
        return await this.ngf.getItem(getLocalRepositoryName(usuarioCursoStoreName, usuario));
    }

    addAll(data: UsuarioCurso[], usuario: Usuario) {
        return this.ngf.setItem(getLocalRepositoryName(usuarioCursoStoreName, usuario), data);
    }
}
