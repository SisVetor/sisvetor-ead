import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: "app-dialogo-confirmacao",
    templateUrl: "./dialogo-confirmacao.component.html",
})
export class DialogoConfirmacaoComponent {
    corBotaoConfirmar;
    textoBotaoConfirmar;
    textoBotaoCancelar;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.corBotaoConfirmar = data?.corBotaoConfirmar ?? "primary";
        this.textoBotaoConfirmar = data?.textoBotaoConfirmar ?? "Sim";
        this.textoBotaoCancelar = data?.textoBotaoCancelar ?? "Não";
    }
}
