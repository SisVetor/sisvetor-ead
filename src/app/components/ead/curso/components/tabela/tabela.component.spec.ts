import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideMockStore } from "@ngrx/store/testing";
import { MockCrudGenericoDropdownComponent } from "src/app/_shared/tests/mock-components";
import { etiquetaAgentePITStoreName } from "../../config";
import { etiquetaAgentePITInitialState } from "../../ngrx/reducer";
import { EtiquetaAgentePITTabelaComponent } from "./tabela.component";

describe("EtiquetaAgentePITTabelaComponent", () => {
    let component: EtiquetaAgentePITTabelaComponent;
    let fixture: ComponentFixture<EtiquetaAgentePITTabelaComponent>;
    const initialState = { autenticacao: { unidade: { id: 1, nome: "Unidade Atual Mock" } } };
    initialState[etiquetaAgentePITStoreName] = etiquetaAgentePITInitialState;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
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
        MatPaginatorModule,
        HttpClientTestingModule,
        EtiquetaAgentePITTabelaComponent,
        MockCrudGenericoDropdownComponent
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
        fixture = TestBed.createComponent(EtiquetaAgentePITTabelaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Deve criar componente", () => {
        expect(component).toBeTruthy();
    });

    
});
