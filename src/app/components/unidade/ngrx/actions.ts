import { Action } from "@ngrx/store";
import Usuario from "../../model/Usuario";
import { Unidade } from "../config";
export enum actionTypes {
    CHECAR_STATUS = "[Unidade] Cadastrado com Sucesso",
    LISTAR_PIT_LOCALMENTE = "[PIT] Listar local",
    LISTAR_PIT_LOCALMENTE_SUCESSO = "[PIT] Listado com Sucesso",
    LISTAR_PIT_LOCALMENTE_ERRO = "[PIT] Listado com Erro",
    LISTAR_PIT_NUVEM = "[PIT] Listar nuvem",
    LISTAR_PIT_NUVEM_SUCESSO = "[PIT] Listado nuvem com Sucesso",
    LISTAR_PIT_NUVEM_ERRO = "[PIT] Listado nuvem com Erro",

    LISTAR_LABORATORIO_LOCALMENTE = "[Laboratório] Listar local",
    LISTAR_LABORATORIO_LOCALMENTE_SUCESSO = "[Laboratório] Listado com Sucesso",
    LISTAR_LABORATORIO_LOCALMENTE_ERRO = "[Laboratório] Listado com Erro",
    LISTAR_LABORATORIO_NUVEM = "[Laboratório] Listar nuvem",
    LISTAR_LABORATORIO_NUVEM_SUCESSO = "[Laboratório] Listado nuvem com Sucesso",
    LISTAR_LABORATORIO_NUVEM_ERRO = "[Laboratório] Listado nuvem com Erro",
}


export class ListarPitNuvem implements Action {
    readonly type = actionTypes.LISTAR_PIT_NUVEM;
    constructor(
        public payload: {
            query: Map<string, string>;
            sort: string;
            order: string;
            page: number;
            size: number;
            limit: number;
            usuario: Usuario;
        }
    ) {}
}

export class ListarPitNuvemSucesso implements Action {
    readonly type = actionTypes.LISTAR_PIT_NUVEM_SUCESSO;
    constructor(public payload: { entidades: Unidade[]; total: number; usuario: Usuario }) {}
}

export class ListarPitNuvemErro implements Action {
    readonly type = actionTypes.LISTAR_PIT_NUVEM_ERRO;
    constructor(public payload: { erro: any }) {}
}




export class ListarPitLocalmente implements Action {
    readonly type = actionTypes.LISTAR_PIT_LOCALMENTE;
    constructor(
        public payload: {
            query: Map<string, string>;
            sort: string;
            order: string;
            page: number;
            size: number;
            limit: number;
            usuario: Usuario;
        }
    ) {}
}

export class ListarPitLocalmenteSucesso implements Action {
    readonly type = actionTypes.LISTAR_PIT_LOCALMENTE_SUCESSO;
    constructor(public payload: { entidades: Unidade[]; total: number; usuario: Usuario }) {}
}

export class ListarPitLocalmenteErro implements Action {
    readonly type = actionTypes.LISTAR_PIT_LOCALMENTE_ERRO;
    constructor(public payload: { erro: any }) {}
}







export class ListarLaboratorioNuvem implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_NUVEM;
    constructor(
        public payload: {
            query: Map<string, string>;
            sort: string;
            order: string;
            page: number;
            size: number;
            limit: number;
            usuario: Usuario;
        }
    ) {}
}

export class ListarLaboratorioNuvemSucesso implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_NUVEM_SUCESSO;
    constructor(public payload: { entidades: Unidade[]; total: number, usuario: Usuario }) {}
}

export class ListarLaboratorioNuvemErro implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_NUVEM_ERRO;
    constructor(public payload: { erro: any }) {}
}




export class ListarLaboratorioLocalmente implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_LOCALMENTE;
    constructor(
        public payload: {
            query: Map<string, string>;
            sort: string;
            order: string;
            page: number;
            size: number;
            limit: number;
            usuario: Usuario;
        }
    ) {}
}

export class ListarLaboratorioLocalmenteSucesso implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_LOCALMENTE_SUCESSO;
    constructor(public payload: { entidades: Unidade[]; total: number, usuario: Usuario }) {}
}

export class ListarLaboratorioLocalmenteErro implements Action {
    readonly type = actionTypes.LISTAR_LABORATORIO_LOCALMENTE_ERRO;
    constructor(public payload: { erro: any }) {}
}







export type BaseActions =
    | ListarPitLocalmente
    | ListarPitLocalmenteSucesso
    | ListarPitLocalmenteErro
    | ListarPitNuvem
    | ListarPitNuvemSucesso
    | ListarPitNuvemErro
    | ListarLaboratorioLocalmente
    | ListarLaboratorioLocalmenteSucesso
    | ListarLaboratorioLocalmenteErro
    | ListarLaboratorioNuvem
    | ListarLaboratorioNuvemSucesso
    | ListarLaboratorioNuvemErro;