import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import * as fromNotificacao from "./notificacao.reducer";
import { EffectsModule } from "@ngrx/effects";
import { NotificacaoEffects } from "./notificacao.effects";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSnackBarModule,
        StoreModule.forFeature("notificacao", fromNotificacao.reducer),
        EffectsModule.forFeature([NotificacaoEffects])
    ]
})
export class NotificacaoModule { }
