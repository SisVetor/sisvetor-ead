import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";

import { Store, select } from "@ngrx/store";
import { SnackbarAbrir } from "../../_shared/notificacao/notificacao.actions";
import { selectorUsuario } from "../../autenticacao/ngrx/selectors";
import { Page } from "../../model/Page";
import { State } from "../../reducers";
import { QueryOptions } from "../../services/query-options";
import { Unidade } from "../config";
import { UnidadeOfflineService } from "../offline.service";
import { UnidadeOnlineService } from "../online.service";
import * as actions from "./actions";

@Injectable()
export class UnidadeEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State>,
        private etiquetaOfflineService: UnidadeOfflineService,
        private etiquetaOnlineService: UnidadeOnlineService
    ) {}

    listarLocalmente$ = createEffect(() =>
        this.actions$.pipe(
            ofType<actions.ListarPitLocalmente>(actions.actionTypes.LISTAR_PIT_LOCALMENTE),
            mergeMap(async ({ payload }) => {
                const data = await this.etiquetaOfflineService.getAllPits(payload.usuario);
                return new actions.ListarPitLocalmenteSucesso({ entidades: data, total: data?.length ?? 0, usuario: payload.usuario });
            }),
            ofType<actions.ListarLaboratorioLocalmente>(actions.actionTypes.LISTAR_LABORATORIO_LOCALMENTE),
            mergeMap(async ({ payload }) => {
                const data = await this.etiquetaOfflineService.getAllLaboratorios( payload.usuario);
                return new actions.ListarLaboratorioLocalmenteSucesso({ entidades: data, total: data?.length ?? 0, usuario: payload.usuario });
            })
        )
    );

    listarNuvem$ = createEffect(() =>
        this.actions$.pipe(
            ofType<actions.ListarPitNuvem>(actions.actionTypes.LISTAR_PIT_NUVEM),
            mergeMap(({ payload }) => {

                if (!navigator.onLine) {
                    const actionsList = [new actions.ListarPitNuvemErro({ erro: "" })];
                    return from(actionsList);
                }

                const query = new QueryOptions(
                    payload.query,
                    payload.sort,
                    payload.order,
                    payload.page,
                    payload.size,
                    payload.limit
                );

                return this.etiquetaOnlineService.list(query).pipe(
                    withLatestFrom(this.store.pipe(select(selectorUsuario))),
                    map(([dados, usuario]: [Page<Unidade>, any]) => {
                        
                        return new actions.ListarPitNuvemSucesso({
                            entidades: dados.content,
                            total: dados.totalElements,
                             usuario: usuario
                        });
                    }),

                    catchError((erro) => {
                        console.log("Erro ao carregar listagem", erro);
                        const actionsList = [
                            new actions.ListarPitNuvemErro({ erro }),
                            new SnackbarAbrir({
                                message: "Não foi possível listar os registros da nuvem",
                                config: { panelClass: "red-snackbar" },
                            }),
                        ];
                        return from(actionsList);
                    })
                );
            })
        )
    );

    listarNuvemSucesso$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType<actions.ListarPitNuvemSucesso>(actions.actionTypes.LISTAR_PIT_NUVEM_SUCESSO),
                map(({ payload }) => {
                    this.etiquetaOfflineService.addAllPits(payload.entidades, payload.usuario);
                })
            ),
        { dispatch: false }
    );
}
