import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { BaseEffects } from "../base.effects";
import * as reducer from "../base.reducer";
import { CrudGenericoDropdownMultiComponent } from "./dropdown.component";

@NgModule({
    declarations: [CrudGenericoDropdownMultiComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        StoreModule.forFeature("crud-generico", reducer.crudGenericoReducer),
        EffectsModule.forFeature([BaseEffects])
    ],
    exports: [CrudGenericoDropdownMultiComponent],
    providers: []
})
export class CrudGenericoDropdownMultiModule {}
