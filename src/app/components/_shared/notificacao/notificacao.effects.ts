import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap, delay, map } from "rxjs/operators";
import * as notificacaoActions from "./notificacao.actions";

export const tipos = {
    erro: "snackbar-erro",
    sucesso: "snackbar-sucesso",
    atencao: "snackbar-atencao"
};

@Injectable()
export class NotificacaoEffects {

    constructor(private actions$: Actions,
        private matSnackBar: MatSnackBar) { }

    
    fecharSnackbar$ = createEffect(() => this.actions$.pipe(
        ofType<notificacaoActions.SnackbarFechar>(notificacaoActions.NotificacaoActionTypes.SNACKBAR_FECHAR),
        tap(() => this.matSnackBar.dismiss())
    ), {
        dispatch: false
    });

    
    abrirSnackbar$ = createEffect(() => this.actions$.pipe(
        ofType<notificacaoActions.SnackbarAbrir>(notificacaoActions.NotificacaoActionTypes.SNACKBAR_ABRIR),
        map(({ payload }) => {
            this.matSnackBar.open(payload.message, payload.action, payload.config);
        }),
        delay(3000),
        map(() => new notificacaoActions.SnackbarFechar())
    ));
}
