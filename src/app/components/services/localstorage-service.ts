import { Injectable } from "@angular/core";
import Usuario from "../model/Usuario";

@Injectable({
    providedIn: "root",
})
export class CustomLocalStorageService {
    constructor() {}

    set(key: string, data: any, usuario: Usuario): void {
        try {
            localStorage.setItem(usuario.id.pessoaId+"|"+usuario.id.unidadeId+"|"+key, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    get(key: string, usuario: Usuario) {
        try {
            return JSON.parse(localStorage.getItem(usuario.id.pessoaId+"|"+usuario.id.unidadeId+"|"+key));
        } catch (e) {
            console.error("Error getting data from localStorage", e);
            return null;
        }
    }
}
