import { Unidade } from "../unidade/config";
import Vinculo from "./Vinculo";

export default interface Usuario {
    id: {
        pessoaId: number;
        unidadeId: number;
    };
    nome: string;
    vinculo: Vinculo;
    perfilUsuarioUnidade: PerfilUsuarioUnidade;
    ativo: boolean;
    superAdmin: boolean;
    unidadeNome: string;
    unidade: Unidade;
}
export function getUsuarioTest(): Usuario{
    return {
        id:{pessoaId: 0, unidadeId: 0},
        nome: "",
        vinculo: undefined,
        perfilUsuarioUnidade: undefined,
        ativo: true,
        superAdmin: false,
        unidadeNome: "",
        unidade: undefined
    }
}
export interface PerfilUsuarioUnidade {
    id: {
        perfilUsuarioId: number;
        unidadeId: number;
    };
    perfilUsuarioNome: string;
    recursosAutoridades: RecursoAutoridade[];
}

export interface RecursoAutoridade {
    nome: string;
    recurso: string;
    autoridade: string;
    recursoObjeto: Recurso;
    autoridadeObjeto: Autoridade;
}

export interface Autoridade {
    id: string;
    nome: string;
}

export interface Recurso {
    id: string;
    nome: string;
    descricao: string;
    autoridades: Autoridade[];
}
