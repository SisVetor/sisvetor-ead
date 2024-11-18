import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectorUnidade } from "src/app/autenticacao/autenticacao.selectors";
import { Unidade } from "src/app/unidades/base.config";

import { State } from "../../../../reducers";

import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";

import { CursoTabelaComponent } from "../../components/tabela/tabela.component";

@Component({
    selector: "app-curso-page-listar",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"],
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        CursoTabelaComponent,
        RouterLink,
        CursoPaginaListarComponent
    ],
    standalone: true
})
export class CursoPaginaListarComponent {
    unidade$: Observable<Unidade>;

    constructor(private store: Store<State>) {
        this.unidade$ = this.store.pipe(select(selectorUnidade));
    }
}
