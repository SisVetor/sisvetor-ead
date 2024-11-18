import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export enum NotificacaoActionTypes {
    SNACKBAR_ABRIR = '[Notificacao] Abrir',
    SNACKBAR_FECHAR = '[Notificacao] Fechar'
}

export class SnackbarAbrir implements Action {
    readonly type = NotificacaoActionTypes.SNACKBAR_ABRIR;
    constructor(public payload: {
        message: string,
        action?: string,
        config?: MatSnackBarConfig
    }) { }
}

export class SnackbarFechar implements Action {
    readonly type = NotificacaoActionTypes.SNACKBAR_FECHAR;
}

export type NotificacaoActions = SnackbarAbrir | SnackbarFechar;
