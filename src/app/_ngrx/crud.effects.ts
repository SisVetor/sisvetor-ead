import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ActionCreator } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { from } from "rxjs";
import { catchError, concatMap, exhaustMap, map, switchMap } from "rxjs/operators";
import { SnackbarAbrir } from "../components/_shared/notificacao/notificacao.actions";
import { ResourceService } from "../components/services/api-generico-v2.service";
import { QueryOptions } from "../components/services/query-options";


interface CrudQuery {
    query: Map<string, string>;
    sort: string;
    order: string;
    page: number;
    size: number;
    limit: number;
}

export class EntityCrudActions {
    Listar: ActionCreator<string, (props: CrudQuery) => CrudQuery & TypedAction<string>>;
    ListadoComSucesso: ActionCreator<
        string,
        (props: {
            entityList: any[];
            totalElements: number;
        }) => { entityList: any[]; totalElements: number } & TypedAction<string>
    >;
    ListadoComErro: ActionCreator<string, (props: { erro: any[] }) => { erro: any } & TypedAction<string>>;
    Cadastrar: ActionCreator<
        string,
        (props: {
            entity: any;
            redirectUrl?: string;
            redirectToEdit?: string;
        }) => { entity: any; redirectUrl?: string; redirectToEdit?: string } & TypedAction<string>
    >;
    CadastradoComSucesso: ActionCreator<string, (props: { entity: any }) => { entity: any } & TypedAction<string>>;
    CadastrarErro: ActionCreator<string, (props: { erro: any[] }) => { erro: any } & TypedAction<string>>;
    Atualizar: ActionCreator<
        string,
        (props: { entity: any; redirectUrl: string }) => { entity: any; redirectUrl: string } & TypedAction<string>
    >;
    AtualizadoComSucesso: ActionCreator<
        string,
        (props: { id: any; changes: any }) => { id: any; changes: any } & TypedAction<string>
    >;
    AtualizarErro: ActionCreator<string, (props: { erro: any[] }) => { erro: any } & TypedAction<string>>;
    Deletar: ActionCreator<
        string,
        (props: { id: any; redirectUrl: string }) => { id: any; redirectUrl: string } & TypedAction<string>
    >;
    DeletadoComSucesso: ActionCreator<string, (props: { id: any }) => { id: any } & TypedAction<string>>;
    DeletarErro: ActionCreator<string, (props: { erro: any[] }) => { erro: any } & TypedAction<string>>;
}

export class CrudEffects {
    public entityActions: EntityCrudActions;

    listarRegistros$;
    cadatrar$;
    atualizar$;
    excluir$;

    constructor(
        public actions$: Actions,
        public baseService: ResourceService<any>,
        public router: Router,
        public sourceActions: EntityCrudActions
    ) {
        this.entityActions = sourceActions;
        this.createEffects();
    }

    createEffects() {
        this.listarRegistros$ = createEffect(() =>
            this.actions$.pipe(
                ofType(this.entityActions.Listar),
                concatMap(action => {
                    const query = new QueryOptions(
                        action.query,
                        action.sort,
                        action.order,
                        action.page,
                        action.size,
                        action.limit
                    );
                    return this.baseService.list(query);
                }),
                map(response =>
                    this.entityActions.ListadoComSucesso({
                        entityList: response.content,
                        totalElements: response.totalElements
                    })
                ),
                catchError(erro => {
                    const actionsList = [
                        this.entityActions.ListadoComErro({ erro }),
                        new SnackbarAbrir({
                            message: `Erro ao listar (componente geral) : ${erro}`,
                            config: { panelClass: "red-snackbar" }
                        })
                    ];
                    return from(actionsList);
                })
            )
        );

        this.cadatrar$ = createEffect(() =>
            this.actions$.pipe(
                ofType(this.entityActions.Cadastrar),
                exhaustMap(action => {
                    return this.baseService.create(action.entity).pipe(
                        switchMap((response: any) => {
                            if (action.redirectUrl) {
                                this.router.navigateByUrl(action.redirectUrl);
                            }
                            if (action.redirectToEdit) {
                                this.router.navigateByUrl(`${action.redirectToEdit}/editar/${response.id}`);
                            }
                            return [
                                this.entityActions.CadastradoComSucesso({
                                    entity: response
                                }),
                                new SnackbarAbrir({
                                    message: "Cadastrado com sucesso",
                                    config: { panelClass: "green-snackbar" }
                                })
                            ];
                        }),
                        catchError(erro => {
                            const actionsList = [
                                this.entityActions.CadastrarErro({ erro }),
                                new SnackbarAbrir({
                                    message: "Erro ao cadastrar: " + erro,
                                    config: { panelClass: "red-snackbar" }
                                })
                            ];
                            return from(actionsList);
                        })
                    );
                })
            )
        );

        this.atualizar$ = createEffect(() =>
            this.actions$.pipe(
                ofType(this.entityActions.Atualizar),
                exhaustMap(action => {
                    return this.baseService.update(action.entity).pipe(
                        switchMap((response: any) => {
                            if (action.redirectUrl) {
                                this.router.navigateByUrl(action.redirectUrl);
                            }
                            return [
                                this.entityActions.AtualizadoComSucesso({
                                    id: response?.id,
                                    changes: response
                                }),
                                new SnackbarAbrir({
                                    message: "Atualizado com sucesso",
                                    config: { panelClass: "green-snackbar" }
                                })
                            ];
                        }),
                        catchError(erro => {
                            const actionsList = [
                                this.entityActions.AtualizarErro({ erro }),
                                new SnackbarAbrir({
                                    message: "Erro ao atualizar: " + erro,
                                    config: { panelClass: "red-snackbar" }
                                })
                            ];
                            return from(actionsList);
                        })
                    );
                })
            )
        );

        this.excluir$ = createEffect(() =>
            this.actions$.pipe(
                ofType(this.entityActions.Deletar),
                exhaustMap(action => {
                    return this.baseService.delete(action.id).pipe(
                        switchMap(response => {
                            if (action.redirectUrl) {
                                this.router.navigateByUrl(action.redirectUrl);
                            }
                            return [
                                this.entityActions.DeletadoComSucesso({ id: action.id }),
                                new SnackbarAbrir({
                                    message: "Deletado com sucesso",
                                    config: { panelClass: "green-snackbar" }
                                })
                            ];
                        }),
                        catchError(erro => {
                            const actionsList = [
                                this.entityActions.DeletarErro({ erro }),
                                new SnackbarAbrir({
                                    message: "Erro ao deletar: " + erro,
                                    config: { panelClass: "red-snackbar" }
                                })
                            ];
                            return from(actionsList);
                        })
                    );
                })
            )
        );
    }
}
