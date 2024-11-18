import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, delay, map } from "rxjs/operators";

import { Required } from "../../_shared/_util/decorators";
import * as actions from "../base.actions";
import { recursos } from "../base.config";
import * as reducer from "../base.reducer";

@Component({
    selector: "app-crud-generico-dropdown",
    templateUrl: "./dropdown.component.html",
    styleUrls: ["./dropdown.component.scss"],
})
export class CrudGenericoDropdownComponent implements OnInit {
    itensFiltrados$: Observable<any>;
    carregando$: Observable<boolean>;
    itemSelecionado: any;

    recursos = recursos;

    @Input() @Required modelo: string;
    @Input() nomePadraoFormControl: string;
    @Input() placeholder: string;
    @Input() required: boolean = false;
    @Input() queryAdicional: Map<string, any>;
    @Input() @Required formGroup: UntypedFormGroup;

    @Output() onSelectEvent = new EventEmitter();
    @Output() onFocusEvent = new EventEmitter();
    private readonly QUANTIDADE_ITENS_PADRAO = 50;

    constructor(private store: Store<reducer.BaseEntityState>) {}

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
        if (this.queryAdicional) {
            this.queryAdicional.forEach((valor: string, chave: string) => {
                query.set(chave, valor);
            });
        }
        query.set(recursos[this.modelo].inputNameForFilter, nome);
        this.store.dispatch(
            new actions.Listar({
                modelo: this.modelo,
                query,
                sort: recursos[this.modelo].inputNameForFilter,
                order: "asc",
                page: undefined,
                size: this.QUANTIDADE_ITENS_PADRAO,
                limit: this.QUANTIDADE_ITENS_PADRAO,
            })
        );
    }

    aoSelecionarItem(event: any) {
        this.itemSelecionado = event.option.value;
        this.onSelectEvent.emit(this.itemSelecionado);
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

    emitirEventoFocus(event) {
        this.onFocusEvent.emit(event);
    }
}
