import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectorUsuario } from "../../../autenticacao/ngrx/selectors";
import Usuario from "../../../model/Usuario";
import { UsuarioCurso } from "../config";
import * as actions from "../ngrx/actions";
import * as reducer from "../ngrx/reducer";
import { selectCarregando, selectElementos, selectTotalElementos } from "../ngrx/selectors";
@Component({
    selector: "app-curso-selecao-listar-component",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"],
})
export class ListarCursoComponent implements OnInit {
    dadosTabela$: Observable<UsuarioCurso[]>;
    carregando$: Observable<boolean>;
    totalElementos$: Observable<any>;
    usuario$: Observable<Usuario>;
    colunasTabela: string[] = ["nome", "cargaHoraria", "dataInicio"];
    quantidadeCursosListar = 20;

    @Output() itemSelecionadoEmitter = new EventEmitter<any>();

    constructor(private store: Store<reducer.UsuarioCursoEntityState>) {}

    ngOnInit() {
        this.carregarTabela();
    }

    carregarTabela() {
        this.dadosTabela$ = this.store.select(selectElementos);
        this.carregando$ = this.store.select(selectCarregando);
        this.totalElementos$ = this.store.select(selectTotalElementos);
        this.usuario$ = this.store.pipe(select(selectorUsuario));
        this.listarLocalmente();
    }

    atualizarListaCursos() {
        if (navigator.onLine) {
            this.listarNuvem();
        }
        this.listarLocalmente();
    }


    listarNuvem() {
        if (navigator.onLine) {
            const query = new Map();
            query.set("liberada_para_edicao", true);
            query.set("cacheable", true);
            return this.store.dispatch(
                actions.ListarNuvem({
                    query,
                    sort: "id",
                    order: "desc",
                    page: 0,
                    size: this.quantidadeCursosListar,
                    limit: undefined,
                })
            ); 
        }
    }

    listarLocalmente() {
        const query = new Map();
        this.usuario$.subscribe((x: Usuario)=>{
                if(x){
                    this.store.dispatch(
                        actions.ListarLocalmente({
                            usuario: x,
                            query,
                            sort: null,
                            order: null,
                            page: 0,
                            size: this.quantidadeCursosListar,
                            limit: undefined,
                        })
                    );
                }                
            }
        );
        
    }

    selecionarItem(item: UsuarioCurso) {
        this.itemSelecionadoEmitter.emit(item);
    }

    formatarData(data: string) {
        return data ? data.split("-").reverse().join("/") : "";
    }
}
