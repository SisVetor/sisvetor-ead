import Usuario from "../../model/Usuario";
import { Unidade } from "../../unidade/config";
import { AutenticacaoActions, AutenticacaoActionTypes } from "./actions";

export interface AutenticacaoState {
    logado: boolean;
    usuario: Usuario;
    token: string;
    unidade: Unidade;
    unidadesUsuario: Unidade[];
    mensagemErro: string;
    logando: boolean;
}

export const autenticacaoInitialState: AutenticacaoState = {
    logado: false,
    usuario: undefined,
    token: undefined,
    unidade: undefined,
    unidadesUsuario: [],
    mensagemErro: undefined,
    logando: false,
};

export function autenticacaoReducer(state = autenticacaoInitialState, action: AutenticacaoActions): AutenticacaoState {
    switch (action.type) {
        case AutenticacaoActionTypes.LOGADO_ACTION:
            return {
                ...state,
                logado: true,
                usuario: action.payload.usuario,
                token: action.payload.token,
                unidade: action.payload.unidade,
                mensagemErro: undefined,
                logando: false,
            };

        case AutenticacaoActionTypes.LOGOUT_ACTION:
            return {
                ...state,
                logado: false,
                usuario: undefined,
                token: undefined,
                unidade: undefined,
                mensagemErro: undefined,
                logando: false,
            };
        case AutenticacaoActionTypes.LOGIN_ERRO_ACTION:
            return {
                ...state,
                logado: false,
                usuario: undefined,
                token: undefined,
                unidade: undefined,
                logando: false,
                mensagemErro: action.payload.mensagem,
            };
        case AutenticacaoActionTypes.LOGIN_ACTION:
            return {
                ...state,
                logando: false,
            };
        case AutenticacaoActionTypes.UNIDADE_TROCAR_ACTION:
            return {
                ...state,
                unidade: action.payload.unidade,
            };
        case AutenticacaoActionTypes.UNIDADES_LISTADAS_COM_SUCESSO_ACTION:
            return {
                ...state,
                unidadesUsuario: action.payload.unidades,
            };
        default:
            return state;
    }
}
