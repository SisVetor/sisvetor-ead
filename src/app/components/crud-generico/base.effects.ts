import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import { SnackbarAbrir } from "../_shared/notificacao/notificacao.actions";
import { Page } from "../model/Page";
import { QueryOptions } from "../services/query-options";
import * as actions from "./base.actions";
import { recursos, urlsPadrao } from "./base.config";
import { EntidadeBase } from "./base.model";
import { CrudGenericoOnlineService } from "./base.service";
import { CrudGenericoOfflineService } from "./offline.service";

@Injectable()
export class BaseEffects {
    constructor(
        private actions$: Actions,
        private crudGenericoOnlineService: CrudGenericoOnlineService,
        private crudGenericoOfflineService: CrudGenericoOfflineService,
        private router: Router
    ) {}

    
    carregarRegistros$ = createEffect(() => this.actions$.pipe(
        ofType<actions.Listar>(actions.actionTypes.LISTAR),
        mergeMap(({ payload }) => {
            const query = new QueryOptions(
                payload.query,
                payload.sort,
                payload.order,
                payload.page,
                payload.size,
                payload.limit
            );
            this.crudGenericoOnlineService.endpoint = recursos[payload.modelo].api;
            if (!navigator.onLine) {
                return this.crudGenericoOfflineService.getAll(payload.modelo).pipe(
                    map((response: EntidadeBase[]) => {
                        return new actions.ListadoComSucesso({
                            modelo: payload.modelo,
                            entidades: response,
                            total: response.length,
                        });
                    }),

                    catchError((erro) => {
                        const actionsList = [
                            new actions.ListadoComErro({ modelo: payload.modelo, erro }),
                            new SnackbarAbrir({
                                message: `Erro ao listar ${payload.modelo}: ${erro}`,
                                config: { panelClass: "red-snackbar" },
                            }),
                        ];
                        return from(actionsList);
                    })
                );
            }
            return this.crudGenericoOnlineService.list(query).pipe(
                map((response: Page<EntidadeBase>) => {
                    this.crudGenericoOfflineService.addAll(payload.modelo, response.content);
                    return new actions.ListadoComSucesso({
                        modelo: payload.modelo,
                        entidades: response.content,
                        total: response.totalElements,
                    });
                }),

                catchError((erro) => {
                    const actionsList = [
                        new actions.ListadoComErro({ modelo: payload.modelo, erro }),
                        new SnackbarAbrir({
                            message: `Erro ao listar ${payload.modelo}: ${erro}`,
                            config: { panelClass: "red-snackbar" },
                        }),
                    ];
                    return from(actionsList);
                })
            );
        })
    ));

    
    cadatrar$ = createEffect(() => this.actions$.pipe(
        ofType<actions.Cadastrar>(actions.actionTypes.CADASTRAR),
        switchMap(({ payload }) => {
            this.crudGenericoOnlineService.endpoint = recursos[payload.modelo].api;
            return this.crudGenericoOnlineService.create(payload.entidade).pipe(
                switchMap((response: EntidadeBase) => {
                    this.router.navigateByUrl(`${urlsPadrao.listar}/${payload.modelo}`);
                    return [
                        new actions.CadastradoComSucesso({ modelo: payload.modelo, entidade: response }),
                        new SnackbarAbrir({
                            message: "Cadastrado com sucesso",
                            config: { panelClass: "green-snackbar" },
                        }),
                    ];
                }),
                catchError((erro) => {
                    const actionsList = [
                        new actions.CadastrarErro({ modelo: payload.modelo, erro }),
                        new SnackbarAbrir({
                            message: "Erro ao cadastrar: " + erro,
                            config: { panelClass: "red-snackbar" },
                        }),
                    ];
                    return from(actionsList);
                })
            );
        })
    ));

    
    atualizar$ = createEffect(() => this.actions$.pipe(
        ofType<actions.Atualizar>(actions.actionTypes.ATUALIZAR),
        switchMap(({ payload }) => {
            this.crudGenericoOnlineService.endpoint = recursos[payload.modelo].api;
            return this.crudGenericoOnlineService.update(payload.entidade).pipe(
                switchMap((response: EntidadeBase) => {
                    this.router.navigateByUrl(`${urlsPadrao.listar}/${payload.modelo}`);
                    // TODO: Verificar para que o backend retorne a entidade alterado
                    return [
                        new SnackbarAbrir({
                            message: "Atualizado com sucesso",
                            config: { panelClass: "green-snackbar" },
                        }),
                        new actions.AtualizadoComSucesso({ modelo: payload.modelo, id: undefined, changes: undefined }),
                    ];
                }),
                catchError((erro) => {
                    const actionsList = [
                        new actions.AtualizarErro({ modelo: payload.modelo, erro }),
                        new SnackbarAbrir({
                            message: "Erro ao atualizar: " + erro,
                            config: { panelClass: "red-snackbar" },
                        }),
                    ];
                    return from(actionsList);
                })
            );
        })
    ));

    
    excluir$ = createEffect(() => this.actions$.pipe(
        ofType<actions.Deletar>(actions.actionTypes.DELETAR),
        switchMap(({ payload }) => {
            this.crudGenericoOnlineService.endpoint = recursos[payload.modelo].api;
            return this.crudGenericoOnlineService.delete(payload.id).pipe(
                switchMap((response) => {
                    this.router.navigateByUrl(`${urlsPadrao.listar}/${payload.modelo}`);
                    // TODO: Verificar para no backend retornar o id que foi deletado
                    return [
                        new actions.DeletadoComSucesso({ modelo: payload.modelo, id: undefined }),
                        new SnackbarAbrir({
                            message: "Deletado com sucesso",
                            config: { panelClass: "green-snackbar" },
                        }),
                    ];
                }),
                catchError((erro) => {
                    const actionsList = [
                        new actions.DeletarErro({ modelo: payload.modelo, erro }),
                        new SnackbarAbrir({
                            message: "Erro ao deletar: " + erro,
                            config: { panelClass: "red-snackbar" },
                        }),
                    ];
                    return from(actionsList);
                })
            );
        })
    ));
}
