import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { autenticacaoReducer } from "../autenticacao/ngrx/reducer";

export interface State {}

export const reducers: ActionReducerMap<State> = {
    autenticacao: autenticacaoReducer
};

export const metaReducers: MetaReducer<{}>[] = [];
