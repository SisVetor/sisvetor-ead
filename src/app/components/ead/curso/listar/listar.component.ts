import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectorUsuario } from "../../../autenticacao/ngrx/selectors";
import Usuario from "../../../model/Usuario";
import { StatusUsuarioCurso, UsuarioCurso } from "../config";
import * as actions from "../ngrx/actions";
import * as reducer from "../ngrx/reducer";
import { selectCarregando, selectElementos, selectTotalElementos } from "../ngrx/selectors";
@Component({
    selector: "app-curso-selecao-listar-component",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"],
})
export class ListarCursoComponent implements OnInit {
    dadosTabelaEmAndamento$: Observable<UsuarioCurso[]>;
    dadosTabelaEmNaoIniciado$: Observable<UsuarioCurso[]>;
    carregando$: Observable<boolean>;
    totalElementos$: Observable<any>;
    usuario$: Observable<Usuario>;
    colunasTabela: string[] = ["nome", "cargaHoraria", "dataInicio"];
    quantidadeCursosListar = 20;

    @Output() inscreverEmitter = new EventEmitter<any>();
    @Output() certificadoEmitter = new EventEmitter<any>();
    @Output() continuarEmitter = new EventEmitter<any>();

    constructor(private store: Store<reducer.UsuarioCursoEntityState>) {}

    ngOnInit() {
        this.carregarTabela();
    }

    carregarTabela() {
        this.atualizarListaCursos();
        this.dadosTabelaEmAndamento$ = this.store.select(selectElementos).pipe(
            map(usuariosCursos => usuariosCursos.filter(usuarioCurso => parseInt(StatusUsuarioCurso[usuarioCurso.status].valueOf()) == StatusUsuarioCurso.EM_ANDAMENTO.valueOf()) )
        );
        this.dadosTabelaEmNaoIniciado$ = this.store.select(selectElementos).pipe(
            map(usuariosCursos => usuariosCursos.filter(usuarioCurso => {
                console.log(usuarioCurso.status.valueOf());
                console.log(StatusUsuarioCurso.NAO_INICIADO.valueOf());
                console.log(StatusUsuarioCurso[usuarioCurso.status]);
                return parseInt(StatusUsuarioCurso[usuarioCurso.status].valueOf()) == StatusUsuarioCurso.NAO_INICIADO.valueOf()
            }) )
        );
        this.carregando$ = this.store.select(selectCarregando);
        this.totalElementos$ = this.store.select(selectTotalElementos);
        this.usuario$ = this.store.pipe(select(selectorUsuario));
        
    }

    atualizarListaCursos() {
        console.log(navigator.onLine);
        if (navigator.onLine) {
            this.listarNuvem();
        } else {
            this.listarLocalmente();
        }
        
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

    inscrever(item: UsuarioCurso) {
        this.inscreverEmitter.emit(item);
    }
    continuarCurso(item: UsuarioCurso) {
        this.continuarEmitter.emit(item);
    }
    emitirCertificado(item: UsuarioCurso) {
        this.certificadoEmitter.emit(item);
    }
    formatarData(data: string) {
        return data ? data.split("-").reverse().join("/") : "";
    }
}
