import * as actions from "./notificacao.actions";


export interface NotificacaoState {
    exibir: boolean;
}

export const initialState: NotificacaoState = {
    exibir: false
};

export function reducer(state = initialState, action: actions.NotificacaoActions) {
    switch (action.type) {
        case actions.NotificacaoActionTypes.SNACKBAR_FECHAR:
            return { ...state, exibir: false };
        case actions.NotificacaoActionTypes.SNACKBAR_ABRIR:
            return { ...state, exibir: true };
        default:
            return state;
    }
}
