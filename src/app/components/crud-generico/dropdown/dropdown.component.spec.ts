import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideMockStore } from "@ngrx/store/testing";

import { crudGenericoStoreName } from "../base.config";
import { crudGenericoInitialState } from "../base.reducer";
import { CrudGenericoDropdownComponent } from "./dropdown.component";

describe("CrudGenericoDropdownComponent", () => {
    let component: CrudGenericoDropdownComponent;
    let fixture: ComponentFixture<CrudGenericoDropdownComponent>;
    const initialState = { "tipo-vinculo": { elementos: [] } };
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
                ],
                declarations: [],
                providers: [
                    { provide: APP_BASE_HREF, useValue: "/" },
                    provideMockStore({
                        initialState,
                    }),
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CrudGenericoDropdownComponent);
        component = fixture.componentInstance;
    });

    it("Deve criar componente", () => {
        component.modelo = "tipo-vinculo";
        component.nomePadraoFormControl = "tipoVinculo";
        component.formGroup = new UntypedFormBuilder().group({
            tipoVinculo: [],
        });
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
