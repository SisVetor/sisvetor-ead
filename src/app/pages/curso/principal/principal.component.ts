import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, Subject, Subscription } from "rxjs";

import { DialogoConfirmacaoComponent } from "src/app/components/dialogo-confirmacao/dialogo-confirmacao.component";
import { StatusUsuarioCurso, urlsPadrao, UsuarioCurso } from "src/app/components/ead/curso/config";
import { ListarCursoComponent } from "src/app/components/ead/curso/listar/listar.component";
import { UsuarioCursoActions } from "src/app/components/ead/curso/ngrx/action-types";
import { selectCarregando, selectElementos } from "src/app/components/ead/curso/ngrx/selectors";
import { State } from "../../../components/reducers";


@Component({
    selector: "app-principal-cursos-component",
    templateUrl: "principal.component.html",
    styleUrls: ["principal.component.scss"],
    animations: [
        trigger("popOverState", [
            state("show", style({ transform: "translateY(300%) scale(1)" })),
            state("hide", style({ transform: "translateY(-100%) scale(1)" })),
            state("zoom-out", style({ transform: "translateY(300%) scale(0)" })),
            transition("zoom-out => hide", [animate(0)]),
            transition("* => *", [animate("200ms ease-in")]),
        ]),
        trigger("animationTriggerPrincipalCursoPage", [
            transition(":enter", [
                style({ transform: "translateX(-100%)" }),
                animate("100ms", style({ transform: "translateX(0)" })),
            ]),
            transition(":leave", [
                style({ transform: "translateX(0)", width: "100%" }),
                animate("150ms", style({ transform: "translateX(-100%)", width: "0" })),
            ]),
        ]),
    ],
})
export class PrincipalCursoPage implements OnInit, OnDestroy, AfterViewInit {
    carregandoCursos = false;
    subscriptionCarregandoCursos: Subscription;
    carregando = true
    cursoSelecionado: UsuarioCurso;

    idCurso: number;
    itemSelecionado = false;
    subscriptionListaCursos: Subscription;

    imoveis$: Observable<any[]>;
    destroyed$ = new Subject<boolean>();

    carregandoCursos$: Observable<boolean>;
    subscriptionUsuario: Subscription;
    @ViewChild("listaCursoComponente")
    listarCursoComponente: ListarCursoComponent;

    constructor(
        private router: Router,
        private store: Store<State>,
        private activatedRoute: ActivatedRoute,
        private matDialog: MatDialog,
        public actions$: Actions
    ) {}

    ngOnInit() {
        this.idCurso = this.activatedRoute.snapshot.params["id"];
        
        
        this.subscriptionListaCursos = this.store
            .select(selectElementos)
            .subscribe((cursos) => {
                if (cursos && this.idCurso && this.itemSelecionado === false) {
                    this.cursoSelecionado = cursos.find((a) => a.id === Number(this.idCurso));
                    this.itemSelecionado = true;
                }
            });
    }


    ngAfterViewInit(): void {
        setTimeout(() => {
            this.subscriptionCarregandoCursos = this.store
                .select(selectCarregando)
                .subscribe((carregandoCursos) => {
                    this.carregandoCursos = carregandoCursos;
                });
        });
    }

    ngOnDestroy(): void {
        this.subscriptionListaCursos?.unsubscribe();
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    inscrever(usuarioCurso: UsuarioCurso) {

        if(usuarioCurso.status.toString(0) == StatusUsuarioCurso[StatusUsuarioCurso.NAO_INICIADO]) {
            console.log("SELECIONADO2!");
            const dialogoConfirmacao = this.matDialog.open(DialogoConfirmacaoComponent, {
                width: "500px",
                data: {
                    titulo: "Atenção!",
                    conteudo:
                        `Você vai iniciar o curso "${usuarioCurso.curso.nome}". Deseja continuar?`,
                    corBotaoConfirmar: "primary",
                    textoBotaoConfirmar: "Me Inscrever",
                    textoBotaoCancelar: "Cancelar",
                },
            });


            dialogoConfirmacao.afterClosed().subscribe((result) => {
                if (result) {
                    if (usuarioCurso.id) {
                        this.store.dispatch(
                            UsuarioCursoActions.Inscrever({
                                usuarioCurso: usuarioCurso
                                })
                        );
                        return;
                    }
                    
                }
            });
        }
    }

    
    continuarCurso(usuarioCurso: UsuarioCurso) {
        if(usuarioCurso.status.toString(0) == StatusUsuarioCurso[StatusUsuarioCurso.EM_ANDAMENTO]) {
            const dialogoConfirmacao = this.matDialog.open(DialogoConfirmacaoComponent, {
                width: "500px",
                data: {
                    titulo: "Atenção!",
                    conteudo:
                        `Você vai continuar o curso "${usuarioCurso.curso.nome}". Deseja continuar?`,
                    corBotaoConfirmar: "primary",
                    textoBotaoConfirmar: "Coninuar",
                    textoBotaoCancelar: "Cancelar",
                },
            });


            dialogoConfirmacao.afterClosed().subscribe((result) => {
                if (result) {
                    if (usuarioCurso.id) {
                        this.store.dispatch(
                            UsuarioCursoActions.ContinuarCurso({
                                usuarioCurso: usuarioCurso
                                })
                        );
                        return;
                    }
                    
                }
            });
        }
    }
    emitirCertificado(item: UsuarioCurso) {
        //this.certificadoEmitter.emit(item);
    }

    voltarParaTopoPagina() {
        window.scroll(0, -100);
    }    
    abrirPaginaRealizaCurso(usuarioCurso: UsuarioCurso) {
        this.router.navigateByUrl(
            `${urlsPadrao.listar}/` + `${usuarioCurso.id}`
        );
    }

    navegarParaRealizarCursos() {
        this.router.navigateByUrl(
            `${urlsPadrao.listar}/` + `${this.cursoSelecionado.id}`
        );
    }


 
}
