import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideMockStore } from "@ngrx/store/testing";

import { crudGenericoStoreName } from "../base.config";
import { crudGenericoInitialState } from "../base.reducer";
import { CrudGenericoDropdownMultiComponent } from "./dropdown.component";

describe("CrudGenericoDropdownMultiComponent", () => {
    let component: CrudGenericoDropdownMultiComponent;
    let fixture: ComponentFixture<CrudGenericoDropdownMultiComponent>;
    const initialState = {};
    initialState[crudGenericoStoreName] = crudGenericoInitialState;
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    BrowserAnimationsModule,
                    MatProgressSpinnerModule,
                    MatInputModule,
                    FormsModule,
                    MatTooltipModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatAutocompleteModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatSelectModule
                ],
                declarations: [CrudGenericoDropdownMultiComponent],
                providers: [
                    { provide: APP_BASE_HREF, useValue: "/" },
                    provideMockStore({
                        initialState
                    })
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CrudGenericoDropdownMultiComponent);
        component = fixture.componentInstance;
        component.modelo = "tipo-vinculo";
        component.nomePadraoFormControl = "tipoVinculo";
        component.formGroup = new UntypedFormBuilder().group({
            tipoVinculo: []
        });
    });

    it("Deve criar componente", () => {
        expect(component).toBeTruthy();
    });

    it("Deve executar #ngOnInit()", () => {
        spyOn(component, "configurarSelect");
        component.ngOnInit();
        expect(component.configurarSelect).toHaveBeenCalled();
    });

    it("Deve executar #configurarSelect()", () => {
        component.store = component.store || ({} as any);
        spyOn(component.store, "select");
        spyOn(component, "listar");
        component.configurarSelect();
        expect(component.store.select).toHaveBeenCalled();
        expect(component.listar).toHaveBeenCalled();
    });

    it("Deve executar #listar()", () => {
        component.store = component.store || ({} as any);
        spyOn(component.store, "dispatch");
        component.listar({} as any);
        expect(component.store.dispatch).toHaveBeenCalled();
    });

    it("Deve executar #aoSelecionarItem()", () => {
        component.aoSelecionarItem({
            option: {
                value: {}
            }
        });
    });

    it("Deve executar #checarItemSelecionado()", () => {
        component.checarItemSelecionado();
    });
});
