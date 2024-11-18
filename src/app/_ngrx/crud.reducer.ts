import { EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { EntityCrudActions } from "./crud.effects";

interface AbstractState<T> extends EntityState<T> {
    totalElementos: number;
    carregando: boolean;
}

export function createCrudReducer<T, StateEntityType extends AbstractState<T>>(
    initialState: StateEntityType,
    entityActions: EntityCrudActions,
    adapter: EntityAdapter<T>,
    ...customReducers: any[] //TODO: Tipar esse array
): ActionReducer<StateEntityType, Action> {
    return (baseState, baseAction) => {
        return createReducer(
            initialState,

            on(entityActions.CadastradoComSucesso, (state, action) => {
                return adapter.addOne(action.entity, {
                    ...state,
                    totalElementos: state.totalElementos + 1
                });
            }),

            on(entityActions.Listar, (state, action) => {
                return { ...state, carregando: true };
            }),

            on(entityActions.Cadastrar, (state, action) => {
                return { ...state, carregando: true };
            }),

            on(entityActions.ListadoComSucesso, (state, action) => {
                return adapter.setAll(action.entityList, {
                    ...state,
                    totalElementos: action.totalElements,
                    carregando: false
                });
            }),

            on(entityActions.ListadoComErro, (state, action) => {
                return { ...state, carregando: false };
            }),

            on(entityActions.DeletadoComSucesso, (state, action) => {
                return adapter.removeOne(action.id, state);
            }),

            on(entityActions.AtualizadoComSucesso, (state, action) => {
                return adapter.updateOne(
                    {
                        id: action.id,
                        changes: action.changes
                    },
                    state
                );
            }),

            ...customReducers
        )(baseState, baseAction);
    };
}
