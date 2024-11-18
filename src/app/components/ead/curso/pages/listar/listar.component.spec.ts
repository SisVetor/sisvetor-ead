import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

import { etiquetaAgentePITStoreName } from "../../config";
import { EtiquetaAgentePITEntityState, etiquetaAgentePITInitialState } from "../../ngrx/reducer";
import { EtiquetaAgentePITPaginaListarComponent } from "./listar.component";

@Component({
    selector: "app-etiqueta-agente-pit-tabela-component",
    template: "<p>EtiquetaAgentePITPaginaListarComponent</p>",
    standalone: true,
    imports: [CommonModule,
        MatProgressSpinnerModule,
        MatToolbarModule]
})
class MockEtiquetaAgentePITTabelaComponent {}

describe("EtiquetaAgentePITPaginaListarComponent", () => {
    let component: EtiquetaAgentePITPaginaListarComponent;
    let fixture: ComponentFixture<EtiquetaAgentePITPaginaListarComponent>;
   const initialState = { autenticacao: { unidade: { id: 1, nome: "Unidade Atual Mock" } } };
    initialState[etiquetaAgentePITStoreName] = etiquetaAgentePITInitialState;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        RouterModule.forRoot([], {}),
        EtiquetaAgentePITPaginaListarComponent, MockEtiquetaAgentePITTabelaComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        provideMockStore({
            initialState
        })
    ]
}).compileComponents();
    }));

    beforeEach(() => {
        const mockStore: MockStore<EtiquetaAgentePITEntityState> = TestBed.get(Store);
        //mockStore.overrideSelector(selectorUnidade, unidade);
        fixture = TestBed.createComponent(EtiquetaAgentePITPaginaListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Deve criar componente", () => {
        expect(component).toBeTruthy();
    });
});
