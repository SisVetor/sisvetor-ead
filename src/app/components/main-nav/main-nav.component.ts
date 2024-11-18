import { animate, state, style, transition, trigger } from "@angular/animations";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { NgForage } from "ngforage";
import { fromEvent, merge, Observable, of } from "rxjs";
import { map, mapTo } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { getLocalRepositoryName } from "../_shared/_util/util";
import { LogoutAction } from "../autenticacao/ngrx/actions";
import { selectorUnidade, selectorUsuario } from "../autenticacao/ngrx/selectors";
import { DialogoConfirmacaoComponent } from "../dialogo-confirmacao/dialogo-confirmacao.component";
import { usuarioCursoStoreName } from "../ead/curso/config";
import Usuario from "../model/Usuario";
import { State } from "../reducers";
import { Unidade } from "../unidade/config";

@Component({
    selector: "app-main-nav",
    templateUrl: "./main-nav.component.html",
    styleUrls: ["./main-nav.component.css"],
    animations: [
        trigger("popOverState", [
            state("show", style({ transform: "translateY(-100%)" })),
            state("hide", style({ transform: "translateY(0%)" })),
            transition("show => hide", [animate("300ms ease-in")]),
            transition("hide => show", [animate("300ms ease-in")]),
        ]),
    ],
})
export class MainNavComponent implements OnInit {
    @Input() tituloToolBar = "SisVetor";
    SMALL_WIDTH_BREAKPOINT = 720;

    environment = environment;
    usuario$: Observable<Usuario>;
    unidade$: Observable<Unidade>;

    show = false;

    @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map((result) => result.matches));

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private store: Store<State>,
        private matDialog: MatDialog,
        private ngf: NgForage
    ) {
        this.router.events.subscribe(() => {
            if (this.isScreenSmall()) {
                if (this.sidenav) {
                    this.sidenav.opened = false;
                }
            }
        });
    }

    online$: Observable<boolean>;

    ngOnInit(): void {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, "online").pipe(mapTo(true)),
            fromEvent(window, "offline").pipe(mapTo(false))
        );
        this.usuario$ = this.store.pipe(select(selectorUsuario));
        this.unidade$ = this.store.pipe(select(selectorUnidade));
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`).matches;
    }

    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = true;
    showSubSubMenu: boolean = false;
    isExpandedSeguranca = true;
    showSubmenuSeguranca: boolean = false;
    isShowingSeguranca = true;
    showSubSubMenuSeguranca: boolean = false;

    mouseenter() {
        if (!this.isExpanded) {
            this.isShowing = true;
        }
        if (!this.isExpandedSeguranca) {
            this.isShowingSeguranca = true;
        }
    }

    mouseleave() {
        if (!this.isExpanded) {
            this.isShowing = false;
        }
        if (!this.isExpandedSeguranca) {
            this.isShowingSeguranca = false;
        }
    }

    get isAdmin(): Observable<boolean> {
        return this.usuario$.pipe(
            map((usuario) => {
                return (
                    usuario.perfilUsuarioUnidade.recursosAutoridades.filter((e) => {
                        return e.recurso === "ADMIN";
                    }).length > 0
                );
            })
        );
    }

    logout() {
        this.store.dispatch(new LogoutAction());
    }

    limparRegistros() {
        const dialogoConfirmacao = this.matDialog.open(DialogoConfirmacaoComponent, {
            width: "500px",
            data: {
                titulo: "Atenção!",
                conteudo:
                    "Esta ação deletará todos os registros armazenados localmente no seu dispositivo. Deve ser utilizada somente em caso de limpeza. Deseja continuar?",
                corBotaoConfirmar: "warn",
                textoBotaoConfirmar: "Deletar",
                textoBotaoCancelar: "Cancelar",
            },
        });
        dialogoConfirmacao.afterClosed().subscribe((result) => {
            if (result) {
                this.limparLocalStorage();
            }
        });
    }
    limparLocalStorage() {
        this.usuario$.subscribe((u:Usuario)=>{
              this.ngf?.removeItem(getLocalRepositoryName(usuarioCursoStoreName, u)).then(()=>{
                alert("Registros apagados com sucesso!")
            }).catch(()=>{
                alert("Erro ao apagar registros!");
            });
        });
    }
}
