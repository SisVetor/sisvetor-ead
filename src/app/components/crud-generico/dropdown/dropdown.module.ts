import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { crudGenericoStoreName } from "../base.config";
import { BaseEffects } from "../base.effects";
import { crudGenericoReducer } from "../base.reducer";
import { CrudGenericoDropdownComponent } from "./dropdown.component";

@NgModule({
    declarations: [CrudGenericoDropdownComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        FormsModule,
        MatTooltipModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatButtonModule,
        FlexLayoutModule,
        StoreModule.forFeature(crudGenericoStoreName, crudGenericoReducer),
        EffectsModule.forFeature([BaseEffects])
    ],
    exports: [CrudGenericoDropdownComponent],
    providers: []
})
export class CrudGenericoDropdownModule {}
