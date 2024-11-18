import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { defer, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { SnackbarAbrir } from "../../_shared/notificacao/notificacao.actions";
import { AutenticacaoService } from "../service";
import * as actions from "./actions";

@Injectable()
export class AutenticacaoEffects {
    constructor(private actions$: Actions, private router: Router, private service: AutenticacaoService) { }


    login$ = createEffect(() => this.actions$.pipe(
        ofType<actions.LoginAction>(actions.AutenticacaoActionTypes.LOGIN_ACTION),
        switchMap((action) =>
            this.service.login(action.payload.cpf, action.payload.senha, action.payload.unidadeId).pipe(
                map(
                    (data) =>
                        new actions.LogadoAction({
                            usuario: data.usuario,
                            token: data.token,
                            unidade: data.usuario.unidade,
                        })
                ),
                catchError((error) => {
                    return of(new actions.LoginErroAction({ mensagem: error }));
                })
            )
        )
    ));


    logado$ = createEffect(() => this.actions$.pipe(
        ofType<actions.LogadoAction>(actions.AutenticacaoActionTypes.LOGADO_ACTION),
        tap((action) => {            
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
            const unidade = action.payload.unidade;
            localStorage.setItem("unidade", JSON.stringify(unidade));
            this.router.navigateByUrl("/");
        })
    ), { dispatch: false });


    loginRefreshAction$ = createEffect(() => this.actions$.pipe(
        ofType<actions.LoginRefreshAction>(actions.AutenticacaoActionTypes.LOGIN_REFRESH_ACTION),
        switchMap(() => {
            const usuarioLocalStorage = localStorage.getItem("usuario");
            const tokenLocalStorage = localStorage.getItem("token");
            const unidadeLocalStorage = localStorage.getItem("unidade");
            if (usuarioLocalStorage) {
                return of(new actions.LogadoAction({
                    usuario: JSON.parse(usuarioLocalStorage),
                    token: tokenLocalStorage,
                    unidade: JSON.parse(unidadeLocalStorage),
                }));
            }
        })
    ));


    logout$ = createEffect(() => this.actions$.pipe(
        ofType<actions.LogoutAction>(actions.AutenticacaoActionTypes.LOGOUT_ACTION),
        tap(() => {
            this.router.navigateByUrl("/login");
        })
    ), { dispatch: false });


    unidadeTrocar$ = createEffect(() => this.actions$.pipe(
        ofType<actions.UnidadeTrocarAction>(actions.AutenticacaoActionTypes.UNIDADE_TROCAR_ACTION),
        tap((action) => {
            localStorage.setItem("unidade", JSON.stringify(action.payload.unidade));
            this.router.navigate([`/`]);
        })
    ), { dispatch: false });


    solicitarRecuperacaoSenha$ = createEffect(() => this.actions$.pipe(
        ofType<actions.SolicitarRecuperacaoSenhaAction>(
            actions.AutenticacaoActionTypes.SOLICITAR_RECUPERACAO_SENHA_ACTION
        ),
        switchMap((action) =>
            this.service.solicitarRecuperacaoSenha(action.payload.userCpf, action.payload.unidadeId).pipe(
                map((data: any) => {
                    this.router.navigate([`/login`]);
                    return new SnackbarAbrir({
                        message: data.message,
                        config: { panelClass: "green-snackbar" },
                    });
                }),
                catchError((error) => {
                    this.router.navigate([`/login`]);
                    return of(
                        new SnackbarAbrir({
                            message: error,
                            config: { panelClass: "red-snackbar" },
                        })
                    );
                })
            )
        )
    ));


    redefinirSenha$ = createEffect(() => this.actions$.pipe(
        ofType<actions.RedefinirSenhaAction>(actions.AutenticacaoActionTypes.REDEFINIR_SENHA_ACTION),
        switchMap((action) =>
            this.service
                .redefinirSenha(
                    action.payload.password,
                    action.payload.pessoaId,
                    action.payload.unidadeId,
                    action.payload.token
                )
                .pipe(
                    map((data: any) => {
                        this.router.navigate([`/login`]);
                        return new SnackbarAbrir({
                            message: data.message,
                            config: { panelClass: "green-snackbar" },
                        });
                    }),
                    catchError((error) => {
                        this.router.navigate([`/login`]);
                        return of(
                            new SnackbarAbrir({
                                message: error,
                                config: { panelClass: "red-snackbar" },
                            })
                        );
                    })
                )
        )
    ));


    checarValidadeToken$ = createEffect(() => this.actions$.pipe(
        ofType<actions.ChecarTokenAction>(actions.AutenticacaoActionTypes.CHECAR_TOKEN_ACTION),
        switchMap((action) =>
            this.service
                .checarSeTokenValido(action.payload.pessoaId, action.payload.unidadeId, action.payload.token)
                .pipe(
                    map((data: any) => {
                        if (data.error) {
                            this.router.navigate([`/login`]);
                        }
                        return new SnackbarAbrir({
                            message: data.message,
                            config: {
                                panelClass: data.error ? "red-snackbar" : "green-snackbar",
                            },
                        });
                    }),
                    catchError((error) => {
                        console.log("Erro", error);
                        this.router.navigate([`/login`]);
                        return of(
                            new SnackbarAbrir({
                                message: error,
                                config: { panelClass: "red-snackbar" },
                            })
                        );
                    })
                )
        )
    ));


    listarUnidadesPorCPF$ = createEffect(() => this.actions$.pipe(
        ofType<actions.ListarUnidadesPorCPF>(actions.AutenticacaoActionTypes.LISTAR_UNIDADES_POR_CPF_ACTION),
        switchMap((action) =>
            this.service.pesquisarUnidadesPorCPF(action.payload.cpf).pipe(
                map((unidades: any) => new actions.UnidadesListadasComSucesso({ unidades })),
                catchError((error) => {
                    console.log("Erro", error);
                    this.router.navigate([`/login`]);
                    return of(
                        new SnackbarAbrir({
                            message: error,
                            config: { panelClass: "red-snackbar" },
                        })
                    );
                })
            )
        )
    ));


    init$ = createEffect(() => defer(() => {
        const usuarioLocalStorage = localStorage.getItem("usuario");
        const tokenLocalStorage = localStorage.getItem("token");
        const unidadeLocalStorage = localStorage.getItem("unidade");

        if (usuarioLocalStorage) {
            return of(
                new actions.LogadoAction({
                    usuario: JSON.parse(usuarioLocalStorage),
                    token: tokenLocalStorage,
                    unidade: JSON.parse(unidadeLocalStorage),
                })
            );
        }
    }));
}
