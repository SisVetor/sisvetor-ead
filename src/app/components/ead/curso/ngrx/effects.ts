import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, State, Store } from "@ngrx/store";
import { catchError, from, map, mergeMap, withLatestFrom } from "rxjs";
import { SnackbarAbrir } from "src/app/components/_shared/notificacao/notificacao.actions";
import { selectorUsuario } from "src/app/components/autenticacao/ngrx/selectors";
import { Page } from "src/app/components/model/Page";
import { QueryOptions } from "src/app/components/services/query-options";
import { UsuarioCurso } from "../config";
import { UsuarioCursoOfflineService } from "../offline-service";
import { UsuarioCursoOnLineService } from "../online-service";
import { UsuarioCursoActions } from "./action-types";
@Injectable()
export class UsuarioCursoEffects {
    constructor(
        private actions$: Actions,
        private store: Store<State<UsuarioCurso>>,
        private usuarioCursoOfflineService: UsuarioCursoOfflineService,
        private usuarioCursoOnLineService: UsuarioCursoOnLineService
    ) {}

    listarLocalmente$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuarioCursoActions.ListarLocalmente),
            mergeMap(async ({ usuario }) => {
                let data: UsuarioCurso[] = await this.usuarioCursoOfflineService.getAll(usuario);
                if(!data){
                    data = [];
                }
                return UsuarioCursoActions.ListadoLocalmenteComSucesso({ entityList: data, totalElements: data?.length ?? 0, usuario: usuario });
            })
        )
    );

    listarNuvem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsuarioCursoActions.ListarNuvem),
            mergeMap(({ query, sort, order, page, size, limit }) => {
                if (!navigator.onLine) {
                    const actionsList = [UsuarioCursoActions.ListarNuvemErro({ erro: "" })];
                    return from(actionsList);
                }

                const query2 = new QueryOptions(
                    query,
                    sort,
                    order,
                    page,
                    size,
                    limit
                );

                return this.usuarioCursoOnLineService.listarCursos(query2).pipe(
                    withLatestFrom(this.store.pipe(select(selectorUsuario))),
                    map(([dados, usuario]: [Page<UsuarioCurso>, any]) => {
                        
                        if (usuario?.id?.pessoaId) {
                            const pessoaId = usuario.id.pessoaId;
                            return UsuarioCursoActions.ListarNuvemSucesso({
                                entityList: dados.content,
                                totalElements: dados.totalElements,
                                usuario: usuario
                            });
                        }
                    }),

                    catchError((erro) => {
                        console.log("Erro ao carregar listagem", erro);
                        const actionsList = [
                            UsuarioCursoActions.ListarNuvemErro({ erro }),
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
                ofType(UsuarioCursoActions.ListarNuvemSucesso),
                map(({ entityList, usuario }) => {
                    //console.log("Adicionando atividades em armazenamento local...", payload.entidades);
                    this.usuarioCursoOfflineService.addAll(entityList, usuario);
                })
            ),
        { dispatch: false }
    );
}