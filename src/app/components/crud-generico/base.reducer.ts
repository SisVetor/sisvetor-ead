import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as actions from "./base.actions";
import { recursos } from "./base.config";
import { EntidadeBase } from "./base.model";

const getKeys = (obj): string[] => {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
};

const keys = getKeys(recursos);

export type BaseEntityState = {
    [key: string]: {
        elementos: EntidadeBase[];
        carregando: boolean;
        totalElementos: number;
    };
};

export const crudGenericoInitialState = keys.reduce((acc, k) => {
    acc[k] = {
        elementos: [],
        carregando: false,
        totalElementos: 0,
    };
    return acc;
}, {} as BaseEntityState);

export function crudGenericoReducer(state = crudGenericoInitialState, action: actions.BaseActions): BaseEntityState {
    let newState: BaseEntityState;
    switch (action.type) {
        case actions.actionTypes.CADASTRADO_COM_SUCESSO:
            return state;

        case actions.actionTypes.ATUALIZADO_COM_SUCESSO:
            // TODO: quando o backend retornar o alterado, atualizar a lista do store
            /* return entityAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload.changes,
            }, state); */
            return state;

        case actions.actionTypes.LISTADO_COM_SUCESSO:
            newState = {};
            newState[action.payload.modelo] = {} as any;
            newState[action.payload.modelo].elementos = action.payload.entidades;
            newState[action.payload.modelo].totalElementos = action.payload.total;
            newState[action.payload.modelo].carregando = false;
            let listadoComSucessoState = {
                ...state,
                ...newState,
            };
            return listadoComSucessoState;

        case actions.actionTypes.DELETADO_COM_SUCESSO:
            // TODO: quando o backend retornar o alterado, atualizar a lista do store
            // return entityAdapter.removeOne(action.payload.id, state);
            return state;

        case actions.actionTypes.LISTAR:
            newState = {};
            newState[action.payload.modelo] = {} as any;
            newState[action.payload.modelo].carregando = true;
            let listarState = {
                ...state,
                ...newState,
            };
            return listarState;
        case actions.actionTypes.LISTADO_COM_ERRO:
            newState = {};
            newState[action.payload.modelo] = {} as any;
            newState[action.payload.modelo].carregando = false;
            let listadoComErroState = {
                ...state,
                ...newState,
            };
            return listadoComErroState;

        default:
            return state;
    }
}

// Para extrair valores do state, mesmo nome definido no app.module
export const seletState = createFeatureSelector<BaseEntityState>("crud-generico");

export const selectTotalElementos = (modelo: string) =>
    createSelector(seletState, (entityState) => entityState[modelo].totalElementos);

export const selectCarregando = (modelo: string) =>
    createSelector(seletState, (entityState) => entityState[modelo].carregando);

export const selectElementos = (modelo: string) =>
    createSelector(seletState, (entityState) => entityState[modelo].elementos);

export const selectById = (modelo: string, id: number) =>
    createSelector(selectElementos(modelo), (elementos) => {
        if (elementos) {
            return elementos.find((item) => {
                return item.id === id;
            });
        } else {
            return {};
        }
    });
