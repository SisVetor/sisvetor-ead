import { Unidade } from "../unidade/config";
import Usuario from "./Usuario";

export default interface Vinculo {
    id: {
        pessoaId: number;
        unidadeId: number;
    };
    pessoa: Pessoa;
    unidade: Unidade;
    telefone: string;
    cargo: Cargo;
    email: string;
    ativo: boolean;
    tipoVinculo: TipoVinculo;
    usuario: Usuario;
}

export interface TipoVinculo {
    id: number;
    nome: string;
    ativo: boolean;
}

export interface Cargo {
    id: string;
    nome: string;
    cbo: string;
    sigla: string;
}

export interface Pessoa {
    id: number;
    nome: string;
    cpf: string;
}
