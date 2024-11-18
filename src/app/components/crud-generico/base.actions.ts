import { Action } from "@ngrx/store";

import { EntidadeBase } from "./base.model";

export enum actionTypes {
    CADASTRADO_COM_SUCESSO = "[Generico] Cadastrado com Sucesso",
    CADASTAR_ERRO = "[Generico] Houve um problema ao cadastrar",
    ATUALIZAR_ERRO = "[Generico] Houve um problema ao atualizar",
    DELETAR_ERRO = "[Generico] Houve um problema ao deletar",
    ATUALIZADO_COM_SUCESSO = "[Generico] Atualizado com Sucesso",
    DELETADO_COM_SUCESSO = "[Generico] Deletado com Sucesso",
    LISTADO_COM_SUCESSO = "[Generico] Listado com Sucesso",
    LISTADO_COM_ERRO = "[Generico] Listado com Erro",
    CADASTRAR = "[Generico] Cadastrar no backend",
    ATUALIZAR = "[Generico] Atualizar no backend",
    DELETAR = "[Generico] Deletar no backend",
    LISTAR = "[Generico] Listar do backend"
}

export class Cadastrar implements Action {
    readonly type = actionTypes.CADASTRAR;
    constructor(public payload: { modelo: string; entidade: EntidadeBase }) {}
}

export class CadastradoComSucesso implements Action {
    readonly type = actionTypes.CADASTRADO_COM_SUCESSO;
    constructor(public payload: { modelo: string; entidade: EntidadeBase }) {}
}

export class CadastrarErro implements Action {
    readonly type = actionTypes.CADASTAR_ERRO;
    constructor(public payload: { modelo: string; erro: any }) {}
}

export class Atualizar implements Action {
    readonly type = actionTypes.ATUALIZAR;
    constructor(public payload: { modelo: string; entidade: EntidadeBase }) {}
}

export class AtualizadoComSucesso implements Action {
    readonly type = actionTypes.ATUALIZADO_COM_SUCESSO;
    constructor(
        public payload: {
            modelo: string;
            id: number;
            changes: Partial<EntidadeBase>;
        }
    ) {}
}

export class AtualizarErro implements Action {
    readonly type = actionTypes.ATUALIZAR_ERRO;
    constructor(public payload: { modelo: string; erro: any }) {}
}

export class Deletar implements Action {
    readonly type = actionTypes.DELETAR;
    constructor(public payload: { modelo: string; id: number }) {}
}

export class DeletarErro implements Action {
    readonly type = actionTypes.DELETAR_ERRO;
    constructor(public payload: { modelo: string; erro: any }) {}
}

export class Listar implements Action {
    readonly type = actionTypes.LISTAR;
    constructor(
        public payload: {
            modelo: string;
            query: Map<string, string>;
            sort: string;
            order: string;
            page: number;
            size: number;
            limit: number;
        }
    ) {}
}

export class DeletadoComSucesso implements Action {
    readonly type = actionTypes.DELETADO_COM_SUCESSO;
    constructor(public payload: { modelo: string; id: number }) {}
}

export class ListadoComSucesso implements Action {
    readonly type = actionTypes.LISTADO_COM_SUCESSO;
    constructor(public payload: { modelo: string; entidades: EntidadeBase[]; total: number }) {}
}

export class ListadoComErro implements Action {
    readonly type = actionTypes.LISTADO_COM_ERRO;
    constructor(public payload: { modelo: string; erro: any }) {}
}

export type BaseActions =
    | CadastradoComSucesso
    | AtualizadoComSucesso
    | DeletadoComSucesso
    | ListadoComSucesso
    | Cadastrar
    | CadastrarErro
    | Atualizar
    | AtualizarErro
    | Deletar
    | DeletarErro
    | Listar
    | ListadoComErro;
