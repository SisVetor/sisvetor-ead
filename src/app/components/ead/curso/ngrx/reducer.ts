import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createReducer, on } from "@ngrx/store";

import { UsuarioCurso, usuarioCursoStoreName } from "../config";
import { UsuarioCursoActions } from "./action-types";

export const entityAdapter = createEntityAdapter<UsuarioCurso>();

export interface UsuarioCursoEntityState extends EntityState<UsuarioCurso> {
    carregando: boolean;
    carregandoLocal: boolean;
    listaCarregada: boolean;
    totalElementos: number;
    elementos: UsuarioCurso[];
}

export const usuarioCursoInitialState: UsuarioCursoEntityState = entityAdapter.getInitialState({
    carregando: false,
    listaCarregada: false,
    carregandoLocal: false,
    elementos: [],
    totalElementos: 0,
});

export function usuarioCursoReducer(baseState, baseAction) {
    return createReducer(
        usuarioCursoInitialState,
        on(UsuarioCursoActions.ListarNuvem, (state, action) => {
                return { ...state, carregando: true };
        }),

        on(UsuarioCursoActions.ListarLocalmente, (state, action) => {
           
            return { ...state, carregandoLocal: true };
        }),

        on(UsuarioCursoActions.ListadoLocalmenteComSucesso, (state, action) => {
            return entityAdapter.setAll(action.entityList, {
                ...state,
                totalElementos: action.totalElements,
                elementos: action.entityList,
                carregandoLocal: false,
                listaCarregada: true
            });
        }),
        on(UsuarioCursoActions.ListarNuvemSucesso, (state, action) => {
            return entityAdapter.setAll(action.entityList, {
                ...state,
                totalElementos: action.totalElements,
                carregando: false,
                listaCarregada: true
            });
        }),

        on(UsuarioCursoActions.ListadoLocalmenteComErro, (state, action) => {
            return { ...state, carregando: false };
        }),
        on(UsuarioCursoActions.ListarNuvemErro, (state, action) => {
            return { ...state, carregando: false };
        }),

    )(baseState, baseAction);
}
export const seletState = createFeatureSelector<UsuarioCursoEntityState>(usuarioCursoStoreName);
export const { selectIds, selectEntities, selectAll, selectTotal } = entityAdapter.getSelectors();
