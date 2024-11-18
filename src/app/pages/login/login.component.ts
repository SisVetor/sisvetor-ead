import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { fromEvent, mapTo, merge, Observable, of } from "rxjs";
import { State } from "src/app/components/reducers";

import { Unidade } from "src/app/components/unidade/config";
import { ListarUnidadesPorCPF, LoginAction, LoginRefreshAction } from "../../components/autenticacao/ngrx/actions";
import {
    selectorLogando,
    selectorMensagemErro,
    selectorUnidadesUsuario,
    selectorUsuario,
} from "../../components/autenticacao/ngrx/selectors";

@Component({
    selector: "app-login-2",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    public cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
    cpfValido = false;
    loginForm: UntypedFormGroup;
    mensagemErro$: Observable<string>;
    logando$: Observable<boolean>;
    submitted = false;
    returnUrl: string;

    unidades$: Observable<Unidade[]>;
    usuario$: Observable<any>;
    isLoadingUnidade = false;
    unidadeSelecionado: Unidade;

    online$: Observable<boolean>;
    hidePassword = true; // Controla a visibilidade da senha

    constructor(private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private store: Store<State>,
        public router: Router) { }

    ngOnInit() {
        this.online$ = merge(
            of(navigator.onLine),
            fromEvent(window, "online").pipe(mapTo(true)),
            fromEvent(window, "offline").pipe(mapTo(false))
        ); 
        this.mensagemErro$ = this.store.pipe(select(selectorMensagemErro));
        this.logando$ = this.store.pipe(select(selectorLogando));
        this.unidades$ = this.store.pipe(select(selectorUnidadesUsuario));
        this.usuario$ = this.store.pipe(select(selectorUsuario));

        this.loginForm = this.formBuilder.group({
            cpf: new UntypedFormControl("", {
                updateOn: "blur",
                validators: [Validators.required, Validators.pattern(/^\d{3}.\d{3}.\d{3}-\d{2}$/)],
            }),
            password: ["", Validators.required],
            unidade: ["", [Validators.required]],
        });

        this.carregarDropDownUnidade();
        // get return url from route parameters or default to "/"
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.store.dispatch(
            new LoginAction({
                cpf: this.f.cpf.value,
                senha: this.f.password.value,
                unidadeId: this.f.unidade.value.id,
            })
        );
    }

    aoDigitarCpf() {
        this.cpfValido = false;
        if (this.loginForm.controls["cpf"].valid) {
            this.cpfValido = true;
            this.loginForm.get("unidade").setValue(this.loginForm.value.unidade);
        }
    }

    carregarDropDownUnidade() {
        this.loginForm.get("cpf").valueChanges.subscribe((cpf) => {
            this.store.dispatch(
                new ListarUnidadesPorCPF({
                    cpf,
                })
            );
        });
    }

    selecionarUnidade(event: any) {
        this.unidadeSelecionado = event.option.value;
    }

    checarSelecaoUnidade() {
        if (!this.unidadeSelecionado || this.unidadeSelecionado !== this.loginForm.controls["unidade"].value) {
            this.loginForm.controls["unidade"].setValue(null);
            this.unidadeSelecionado = null;
        }
    }

    displayFnUnidade(unidade: Unidade) {
        if (unidade) {
            return unidade.nome;
        }
    }

    loginOffline() {       
        this.store.dispatch(
            new LoginRefreshAction()
        );
        this.router.navigateByUrl("lista-cursoss");
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }
}
