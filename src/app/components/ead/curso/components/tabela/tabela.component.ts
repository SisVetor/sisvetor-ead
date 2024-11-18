import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortable } from "@angular/material/sort";
import { Store } from "@ngrx/store";
import { Observable, merge } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CrudGenericoDropdownComponent } from './../../../../crud-generico/dropdown/dropdown.component';

import { CursoEntityState } from "../../ngrx/reducer";
import { selectAll, selectCarregando, selectTotalElementos } from "../../ngrx/selectors";
import { UsuarioCursoOnLineService } from "../../online-service";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { UsuarioCursoActions } from "../../ngrx/action-types";

@Component({
    selector: "app-curso-tabela-component",
    templateUrl: "./tabela.component.html",
    styleUrls: ["./tabela.component.scss"],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatMenuModule,
        MatSortModule,
        RouterModule,
        MatPaginatorModule,
        CrudGenericoDropdownComponent,
        CursoTabelaComponent
    ],
    standalone: true
})
export class CursoTabelaComponent implements OnInit {
    dadosTabela$: Observable<any>;
    carregando$: Observable<boolean>;
    totalElementos$: Observable<any>;
    colunasTabela: string[] = ["sigla", "nome", "cargaHoraria", "acoes"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @Output() itemSelecionadoEmitter = new EventEmitter<any>();

    @Input() queryAdicional: Map<string, string>;

    @ViewChild("formPesquisa") formPesquisa;
    formGroupPesquisa;

    query = new Map();

    constructor(
        private store: Store<CursoEntityState>,
        public matSnackBar: MatSnackBar,
        public formBuilder: UntypedFormBuilder,
        private service: UsuarioCursoOnLineService,
        private router: Router
    ) {
        this.formGroupPesquisa = this.formBuilder.group({
            nome: [null]
        });
    }

    ngOnInit() {
        this.configurarObservables();
        this.configurarTabela();
    }

    configurarObservables() {
        this.dadosTabela$ = this.store.select(selectAll);
        this.carregando$ = this.store.select(selectCarregando);
        this.totalElementos$ = this.store.select(selectTotalElementos);
    }

    configurarTabela() {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.sort.sort(<MatSortable>{
            id: "id",
            start: "asc"
        });
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                map(() => {
                    this.pesquisar();
                })
            )
            .subscribe();
    }

    limparFiltro() {
        this.formPesquisa.reset();
    }
    
 
    editarItem(item: any) {
        this.router.navigateByUrl(`/cursos/editar/${item.id}`);
    }

    pesquisar() {
        this.query = new Map();

        if (this.formGroupPesquisa.value["nome"]) {
            this.query.set("nome", this.formGroupPesquisa.value["nome"]);
        }

        return this.store.dispatch(
            UsuarioCursoActions.ListarNuvem({
                query: this.query,
                sort: this.sort.active,
                order: this.sort.direction,
                page: this.paginator.pageIndex,
                size: this.paginator.pageSize,
                limit: undefined
            })
        );
    }
}
