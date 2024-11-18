import { createFeatureSelector, createSelector } from "@ngrx/store";

import { usuarioCursoStoreName } from "../config";
import * as fromReducer from "./reducer";
import { UsuarioCursoEntityState } from "./reducer";

export const selectState = createFeatureSelector<UsuarioCursoEntityState>(usuarioCursoStoreName);

export const selectAll = createSelector(selectState, fromReducer.selectAll);

export const selectTotalElementos = createSelector(selectState, entityState => entityState.totalElementos);

export const selectCarregando = createSelector(selectState, entityState => entityState.carregando);

export const selectElementos = createSelector(selectState, (entityState) => entityState.elementos);

export const selectById = (id: number) =>
    createSelector(selectState, state => {
        return state.entities[id];
    });
