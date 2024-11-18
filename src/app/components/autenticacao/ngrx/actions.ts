import { Action } from "@ngrx/store";

import Usuario from "../../model/Usuario";
import { Unidade } from "../../unidade/config";

export enum AutenticacaoActionTypes {
    LOGIN_ACTION = "[Login Action] Efetuar login",
    LOGADO_ACTION = "[Logado Action] Registrar Logado",
    LOGIN_REFRESH_ACTION = "[LoginRefresh Action] Atualizar token",
    LOGOUT_ACTION = "[Logout Action] Efetuar logout",
    LOGIN_ERRO_ACTION = "[LoginErro Action] Erro ao efetuar logout",
    UNIDADE_TROCAR_ACTION = "[UnidadeTrocar Action] Atualizar Unidade",
    SOLICITAR_RECUPERACAO_SENHA_ACTION = "[SolicitarRecuperacaoSenhaAction] Solicitar Recuperacao Senha",
    REDEFINIR_SENHA_ACTION = "[RedefinirSenhaAction] Redefinir Senha",
    CHECAR_TOKEN_ACTION = "[ChecarTokenAction] Checar validade token",
    LISTAR_UNIDADES_POR_CPF_ACTION = "[ListarUnidadesPorCPF] Listar Unidades por CPF",
    UNIDADES_LISTADAS_COM_SUCESSO_ACTION = "[UNIDADES_LISTADAS_COM_SUCESSO] Unidades listadas com Sucesso",
}

export class LoginAction implements Action {
    readonly type = AutenticacaoActionTypes.LOGIN_ACTION;
    constructor(public payload: { cpf: string; senha: string; unidadeId: number }) {}
}

export class LogadoAction implements Action {
    readonly type = AutenticacaoActionTypes.LOGADO_ACTION;
    constructor(public payload: { usuario: Usuario; token: string; unidade: Unidade }) {}
}

export class LoginRefreshAction implements Action {
    readonly type = AutenticacaoActionTypes.LOGIN_REFRESH_ACTION;
}

export class LoginErroAction implements Action {
    readonly type = AutenticacaoActionTypes.LOGIN_ERRO_ACTION;
    constructor(public payload: { mensagem: string }) {}
}

export class LogoutAction implements Action {
    readonly type = AutenticacaoActionTypes.LOGOUT_ACTION;
}

export class UnidadeTrocarAction implements Action {
    readonly type = AutenticacaoActionTypes.UNIDADE_TROCAR_ACTION;
    constructor(public payload: { unidade: Unidade }) {}
}

export class SolicitarRecuperacaoSenhaAction implements Action {
    readonly type = AutenticacaoActionTypes.SOLICITAR_RECUPERACAO_SENHA_ACTION;
    constructor(public payload: { userCpf: string; unidadeId: number }) {}
}

export class RedefinirSenhaAction implements Action {
    readonly type = AutenticacaoActionTypes.REDEFINIR_SENHA_ACTION;
    constructor(public payload: { password: string; pessoaId: number; unidadeId: number; token: string }) {}
}

export class ChecarTokenAction implements Action {
    readonly type = AutenticacaoActionTypes.CHECAR_TOKEN_ACTION;
    constructor(public payload: { pessoaId: number; unidadeId: number; token: string }) {}
}

export class ListarUnidadesPorCPF implements Action {
    readonly type = AutenticacaoActionTypes.LISTAR_UNIDADES_POR_CPF_ACTION;
    constructor(public payload: { cpf: string }) {}
}

export class UnidadesListadasComSucesso implements Action {
    readonly type = AutenticacaoActionTypes.UNIDADES_LISTADAS_COM_SUCESSO_ACTION;
    constructor(public payload: { unidades: Unidade[] }) {}
}

export type AutenticacaoActions =
    | LoginAction
    | LogoutAction
    | LogadoAction
    | LoginRefreshAction
    | LoginErroAction
    | UnidadeTrocarAction
    | SolicitarRecuperacaoSenhaAction
    | RedefinirSenhaAction
    | ChecarTokenAction
    | ListarUnidadesPorCPF
    | UnidadesListadasComSucesso;
