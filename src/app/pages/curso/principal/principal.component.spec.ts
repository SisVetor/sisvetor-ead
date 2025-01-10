import { APP_BASE_HREF } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Injectable } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { routes } from "src/app/app-routing.module";
import { DialogoSelecaoFormularioComponent } from "src/app/components/dialogo-selecao-formulario/dialogo.component";

import { cursoStoreName } from "src/app/components/ead/curso/config";
import { cursoInitialState } from "src/app/components/ead/curso/ngrx/reducer";
import { LoadIndicatorModule } from "../../components/_shared/loading-indicator/loading-indicator.module";
import { atividade, formulario, registroAtividade, usuarioCurso } from "../../components/_shared/tests/data";
import { AtividadeModule } from "../../components/atividade/listar/listar.module";
import { ImovelModule } from "../../components/imovel/components/listar/listar.module";
import { registroAtividadeOfflineInitialState } from "../../components/registros-atividades/components/offline/ngrx/reducer";
import { RegistroAtividadeOfflineService } from "../../components/registros-atividades/components/offline/service";
import { registroAtividadeOnlineInitialState } from "../../components/registros-atividades/components/online/ngrx/reducer";
import {
    RegistroAtividade,
    registroAtividadeOfflineStoreName,
    registroAtividadeOnlineStoreName,
} from "../../components/registros-atividades/config";
import { ListaCursos } from "./principal.component";

describe("[Lista de Trabalho]", () => {
    let component: ListaCursos;
    let fixture: ComponentFixture<ListaCursos>;
    let helper: DOMTestHelper<ListaCursos>;
    const initialState = {};
    initialState[cursoStoreName] = { ...cursoInitialState, elementos: [usuarioCurso] };
    initialState["autenticacao"] = { usuario: {} };
    initialState[registroAtividadeOnlineStoreName] = registroAtividadeOnlineInitialState;
    initialState[registroAtividadeOfflineStoreName] = registroAtividadeOfflineInitialState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogoSelecaoFormularioComponent],
            imports: [
                NoopAnimationsModule,
                MatIconModule,
                MatProgressSpinnerModule,
                MatToolbarModule,
                AtividadeModule,
                ImovelModule,
                LoadIndicatorModule,
                HttpClientTestingModule,
                MatDialogModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: "/" },
                { provide: RegistroAtividadeOfflineService, useClass: MockRegistroAtividadeService },
                // https://gist.github.com/benjamincharity/3d25cd2c95b6ecffadb18c3d4dbbd80b
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: {
                                id: atividade.id,
                                formularioId: formulario.id,
                            },
                        },
                    },
                },
                provideMockStore({
                    initialState,
                }),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ListaCursos);
        component = fixture.componentInstance;
        helper = new DOMTestHelper(fixture);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    xit("deve selecionar um curso", () => {
        spyOn(TestBed.inject(ActivatedRoute).params, "subscribe").and.returnValue(of({ id: undefined }) as any);

        fixture.detectChanges();

        const selecionarCursoSpy = spyOn(component, "selecionarCurso").and.callThrough();

        expect(component.listandoCursos).toBeTruthy();

        component.selecionarCurso(usuarioCurso);

        expect(selecionarCursoSpy).toHaveBeenCalledTimes(1);
        expect(component.cursoSelecionado).toEqual(usuarioCurso);
    });

});

class DOMTestHelper<T> {
    constructor(private fixture: ComponentFixture<T>) {}

    findByCss(tag: string, text?: string) {
        return this.fixture.debugElement
            .queryAll(By.css(tag))
            .filter((e) => (text ? e.nativeElement.textContent === text : e));
    }
}

@Injectable()
class MockRegistroAtividadeService {
    pesquisarPorAtividadeIdFormularioId(_: number, __: number): Promise<RegistroAtividade[]> {
        return new Promise((resolve, ___) => {
            resolve([registroAtividade]);
        });
    }
}
