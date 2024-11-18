import { createAction, props } from "@ngrx/store";

export function geraActionsCRUD<T>(modelName: string) {
    return {
        Listar: createAction(
            `[${modelName}] Listar do backend`,
            props<{
                query: Map<string, string>;
                sort: string;
                order: string;
                page: number;
                size: number;
                limit: number;
            }>()
        ),
        ListadoComSucesso: createAction(
            `[${modelName}] Listado com Sucesso`,
            props<{ entityList: T[]; totalElements: number }>()
        ),
        ListadoComErro: createAction(`[${modelName}] Listado com Erro`, props<{ erro: any }>()),
        Cadastrar: createAction(`[${modelName}] Cadastrar no backend`, props<{ entity: T; redirectUrl: string }>()),
        CadastradoComSucesso: createAction(`[${modelName}] Cadastrado com Sucesso`, props<{ entity: T }>()),
        CadastrarErro: createAction(`[${modelName}] Houve um problema ao cadastrar`, props<{ erro: any }>()),
        Atualizar: createAction(`[${modelName}] Atualizar no backend`, props<{ entity: T; redirectUrl: string }>()),
        AtualizadoComSucesso: createAction(
            `[${modelName}] Atualizado com Sucesso`,
            props<{ id: number; changes: Partial<T> }>()
        ),
        AtualizarErro: createAction(`[${modelName}] Houve um problema ao atualizar`, props<{ erro: any }>()),
        Deletar: createAction(`[${modelName}] Deletar no backend`, props<{ id: number; redirectUrl: string }>()),
        DeletadoComSucesso: createAction(`[${modelName}] Deletar no backend sucesso`, props<{ id: number }>()),
        DeletarErro: createAction(`[${modelName}] Houve um problema ao deletar`, props<{ erro: any }>())
    };
}
