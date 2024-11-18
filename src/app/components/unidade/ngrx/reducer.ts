import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Etiqueta } from "../config";
import * as etiquetaActions from "./actions";

export interface EtiquetaState {
    elementos: Etiqueta[];
    carregando: boolean;
    carregandoLocal: boolean;
    totalElementos: number;
}

export const etiquetaInitialState: EtiquetaState = {
    elementos: [],
    carregando: false,
    carregandoLocal: false,
    totalElementos: 0,
};

export function etiquetaReducer(state = etiquetaInitialState, action: etiquetaActions.BaseActions): EtiquetaState {
    let newState: EtiquetaState;
    switch (action.type) {
        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_NUVEM_SUCESSO:
            newState = {
                ...state,
            };
            if (newState) {
                newState.elementos = action.payload.entidades;
            }
            newState.totalElementos = action.payload.total;
            newState.carregando = false;
            return newState;

        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_NUVEM:
            newState = {
                ...state,
            };
            newState.carregando = true;
            return newState;
        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_NUVEM_ERRO:
            newState = {
                ...state,
            };
            newState.carregando = false;
            return newState;

        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_LOCALMENTE_SUCESSO:
            newState = {
                ...state,
            };
            if (newState) {
                newState.elementos = action.payload.entidades;
            }
            newState.totalElementos = action.payload.total;
            newState.carregandoLocal = false;
            return newState;

        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_LOCALMENTE:
            newState = {
                ...state,
            };
            newState.carregandoLocal = true;
            return newState;
        case etiquetaActions.actionTypes.LISTAR_ETIQUETA_LOCALMENTE_ERRO:
            newState = {
                ...state,
            };
            newState.carregandoLocal = false;
            return newState;

        default:
            return state;
    }
}

// Para extrair valores do state, mesmo nome definido no app.module
export const seletState = createFeatureSelector<EtiquetaState>("etiquetas");

export const selectTotalElementos = createSelector(seletState, (entityState) => entityState.totalElementos);

export const selectCarregando = createSelector(seletState, (entityState) => entityState.carregando);

export const selectElementos = createSelector(seletState, (entityState) => entityState.elementos);

export const selectById = (id: number) =>
    createSelector(selectElementos, (elementos) => {
        if (elementos) {
            return elementos?.find((item: Etiqueta) => {
                return item.id === id;
            });
        }
        return null;
    });
