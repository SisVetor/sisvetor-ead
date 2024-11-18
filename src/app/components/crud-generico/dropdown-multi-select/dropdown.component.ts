import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, delay, map } from "rxjs/operators";

import { Required } from "../../_shared/_util/decorators";
import * as actions from "../base.actions";
import { recursos } from "../base.config";
import { EntidadeBase } from "../base.model";
import * as reducer from "../base.reducer";

@Component({
    selector: "app-crud-generico-dropdown-multi",
    templateUrl: "./dropdown.component.html",
})
export class CrudGenericoDropdownMultiComponent implements OnInit {
    itensFiltrados$: Observable<any>;
    carregando$: Observable<boolean>;
    itemSelecionado: EntidadeBase;

    recursos = recursos;
    @Input() @Required modelo: string;
    @Input() nomePadraoFormControl: string;
    @Input() placeholder: string;
    @Input() @Required formGroup: UntypedFormGroup;
    @Input() funcaoCompara = (val1: any, val2: any) => val1.id === val2.id;

    constructor(public store: Store<reducer.BaseEntityState>) {}

    ngOnInit(): void {
        this.configurarSelect();
    }

    configurarSelect() {
        this.itensFiltrados$ = this.store.select(reducer.selectElementos(this.modelo));
        this.carregando$ = this.store.select(reducer.selectCarregando(this.modelo));

        this.formGroup
            .get(this.nomePadraoFormControl)
            .valueChanges.pipe(
                debounceTime(300),
                delay(0),
                map((value) => {
                    if (typeof value === "string") {
                        this.listar(value);
                    }
                })
            )
            .subscribe();
        this.formGroup
            .get(this.nomePadraoFormControl)
            .setValue(this.formGroup.controls[this.nomePadraoFormControl].value);
        this.listar("");
    }

    listar(nome: string) {
        const query = new Map();
        query.set("nome", nome);
        this.store.dispatch(
            new actions.Listar({
                modelo: this.modelo,
                query,
                sort: "nome",
                order: "asc",
                page: undefined,
                size: undefined,
                limit: 100,
            })
        );
    }

    aoSelecionarItem(event: any) {
        this.itemSelecionado = event.option.value;
    }

    checarItemSelecionado() {
        if (
            !this.itemSelecionado ||
            this.itemSelecionado !== this.formGroup.controls[this.nomePadraoFormControl].value
        ) {
            this.formGroup.controls[this.nomePadraoFormControl].setValue(null);
            this.itemSelecionado = null;
        }
    }
}
